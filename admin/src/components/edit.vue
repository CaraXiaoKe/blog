<template>
    <div>
        <h1 class="m-title">
            编辑该文章
        </h1>
        <div class="m-post-form">
            <el-form ref="form" :model="newPostForm" label-width="100px">
                <el-form-item label="文章名字">
                    <el-col :xs="24" :sm="18" :lg="12">
                        <el-input v-model="newPostForm.post_title"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="编辑文章">
                    <el-quill :quill-content="newPostForm.post_content" ref="editor"></el-quill>
                </el-form-item>
                <el-form-item label="文章分类">
                    <el-select class="f-mt-0" v-model="newPostForm.post_classify_sup" placeholder="请选择分类">
                        <el-option v-for="field in fieldTree" :label="field.field_name" :value="field.field_id"></el-option>
                    </el-select>
                    <el-select v-model.number="newPostForm.post_classify_sub" placeholder="请选择文章二级分类">

                        <el-option v-for="item in subTree" :label="item.field_member_name" :value="item.field_member_id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上传缩略图">
                    <el-upload
                        action="/api/upload"
                        type="drag"
                        :thumbnail-mode="true"
                        :on-remove="removeImage"
                        :on-success="successUpload"
                        :default-file-list="fileList">
                            <i class="el-icon-upload"></i>
                            <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="editPost">确认修改</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import ElQuill from './common/quill.vue'
import {classify_data} from '../api'

export default {
    components:{ElQuill},
    name: 'index',
    data () {
        let hash = {};
        classify_data.forEach((item)=>{
            hash[item.field_id] = item.field_members;
        });
        return {
            newPostForm: {
                post_title: '',
                post_classify_sup:'',
                post_classify_sub:'',
                post_content:null,
                post_thumbnail:{}
            },
            article_id:this.$route.params.id,
            fieldTree:Object.freeze(classify_data),
            subTree:[],
            fieldHash:Object.freeze(hash),
            fileList: []
        }
    },
    mounted(){

        this.$http.get('/api/article/'+this.article_id).then((res)=>{
            if(res.data.status == 1){
                let sub_id = res.data.info.post_classify_sub;
                this.newPostForm = res.data.info;
                this.fileList =  [this.newPostForm.post_thumbnail];
                this.$nextTick(()=>{
                    this.newPostForm.post_classify_sub = sub_id;
                })
            }else{
                this.$message({
                    message: '获取列表失败',
                    type: 'warning',
                    duration:1500
                });
            };
        })
    },
    watch:{
        'newPostForm.post_classify_sup'(val){
            this.subTree = this.fieldHash[val+''];
            this.newPostForm.post_classify_sub = '';
        }
    },
    methods:{
        editPost(){
            if(this.validateForm()){
                this.newPostForm.post_content = this.$refs.editor.quill.getContents().ops;
                this.$http.post('/api/article/edit/'+this.$route.params.id,this.newPostForm).then((res)=>{
                    if(res.data.status == 1){
                        this.$message({
                            message: '修改成功',
                            type: 'success',
                            duration:1500
                        });
                    }else{
                        this.$message({
                            message: '编辑失败',
                            type: 'warning',
                            duration:1500
                        });
                    };
                })
            }
        },
        successUpload(res){
            this.fileList = [{
                name:res.key,
                url:res.url
            }];
            this.newPostForm.post_thumbnail = {
                name:res.key,
                url:res.url
            };
        },
        removeImage(){
            this.newPostForm.post_thumbnail = null;
            this.fileList = [];
        },
        validateForm(){
            let title = this.newPostForm.post_title.replace(/^\s+|\s+$/,'')
            if(title == ''){
                this.$message({
                    message: '文章名字不能为空！',
                    type: 'warning',
                    duration:1500
                });
                return false;
            };
            if(title.length > 40){
                this.$message({
                    message: '文章名字不能太长！',
                    type: 'warning',
                    duration:1500
                });
                return false;
            };
            if(this.$refs.editor.quill.getLength() == 1){
                this.$message({
                    message: '文章内容不能为空！',
                    type: 'warning',
                    duration:1500
                });
                return false;
            };
            if(this.newPostForm.post_classify_sub == ''){
                this.$message({
                    message: '请选择分类！',
                    type: 'warning',
                    duration:1500
                });
                return false;
            };  
            if(this.newPostForm.post_thumbnail == null){
                this.$message({
                    message: '请上传图片！',
                    type: 'warning',
                    duration:1500
                });
                return false;
            };  
            return true;
        }
    }
}
</script>

<style>
</style>
