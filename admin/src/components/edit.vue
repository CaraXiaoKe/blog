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
                <el-form-item label="文章概要">
                    <el-col :xs="24" :sm="18" :lg="12">
                        <el-input type="textarea" :autosize="{minRows: 3, maxRows: 6}" v-model.trim="newPostForm.post_abstract"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="编辑文章">
                    <el-quill  ref="editor"></el-quill>
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
                        action="/api/upload/"
                        list-type="picture-card"
                        :headers="headers"
                        :on-remove="removeImage"
                        :on-success="successUpload"
                        :file-list="fileList">
                            <i class="el-icon-plus"></i>
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

export default {
    components:{ElQuill},
    name: 'index',
    beforeRouteEnter(to,form,next){
        next()
    },
    data () {
        return {
            newPostForm: {
                post_title: '',
                post_classify_sup:'',
                post_classify_sub:'',
                post_sup_name:'',
                post_sub_name:'',
                post_thumbnail:{},
                post_abstract:'',
                post_html:'',
                post_user:store.get('user')
            },
            article_id:this.$route.params.id,
            fieldTree:[],
            subTree:[],
            fieldHash:{},
            fileList: [],
            headers:{
                token:store.get('token')
            }
        }
    },
    mounted(){
        Promise.all([this.$http.get('/api/article/types/all'),this.$http.get('/api/article/'+this.article_id)]).then(([typesRes,articleRes])=>{
            this.fieldTree = Object.freeze(typesRes.data.info);
            let hash = {};
            typesRes.data.info.forEach((item)=>{
                hash[item.field_id] = item.field_members;
            });
            this.fieldHash = Object.freeze(hash);
            this.$refs.editor.setHtml(articleRes.data.info.post_html);
            if(articleRes.data.status == 1){
                let sub_id = articleRes.data.info.post_classify_sub;
                this.newPostForm = articleRes.data.info;
                this.fileList =  this.newPostForm.post_thumbnail ? [this.newPostForm.post_thumbnail]:[];
                this.$nextTick(()=>{
                    this.newPostForm.post_classify_sub = sub_id;
                })
            }else{
                this.$message({
                    message: '获取信息失败',
                    type: 'warning',
                    duration:1500
                });
            };
        });
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
                this.$confirm('确认添加该文章?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warnin'
                        }).then(() => {
                            this.newPostForm.post_html = document.getElementById('edit-wrap').innerHTML;
                            this.$http.post('/api/article/edit/'+this.$route.params.id,this.newPostForm,{headers:{token:store.get('token')}}).then((res)=>{
                                if(res.data.status == 1){
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success',
                                        duration:1500
                                    });
                                }else if(res.data.status==401){
                                        this.$message({
                                            message: '账号过期，请重新登录',
                                            type: 'warning',
                                            duration:1500
                                        });
                                        this.$router.push('/login');
                                    
                                } else {
                                    this.$message({
                                        message: '编辑失败，请稍后重试',
                                        type: 'warning',
                                        duration:1500
                                    });
                                    this.$router.push('/login');
                                }
                            })
                        }).catch(() => {
                              this.$message({
                                type: 'info',
                                message: '已取消编辑'
                              });          
                        });
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
            let title = this.newPostForm.post_title.replace(/^\s+|\s+$/,'');
            let abstract = this.newPostForm.post_abstract.replace(/^\s+|\s+$/,'');
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
            if(abstract == ''){
                this.$message({
                    message: '文章概要不能为空！',
                    type: 'warning',
                    duration:1500
                });
                return false;
            };
            console.log(abstract.length);
            if(abstract.length >= 150){
                this.$message({
                    message: '文章概要内容过长！',
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
            // if(this.newPostForm.post_thumbnail == null){
            //     this.$message({
            //         message: '请上传图片！',
            //         type: 'warning',
            //         duration:1500
            //     });
            //     return false;
            // };  
            return true;
        }
    }
}
</script>

<style>
</style>
