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
                <el-form-item label="标签">
					<el-tag
					  :key="tag"
					  v-for="tag in newPostForm.post_tag"
					  :closable="true"
					  :close-transition="false"
					  @close="handleClose(tag)"
					>
					{{tag}}
					</el-tag>
					<el-input
					  class="input-new-tag"
					  v-if="inputVisible"
					  v-model="inputValue"
					  ref="saveTagInput"
					  size="mini"
					  @keyup.enter.native="handleInputConfirm"
					  @blur="handleInputConfirm"
					>
					</el-input>
					<el-button v-else class="button-new-tag" size="small" @click="showInput">
						+ New Tag
					</el-button>
				</el-form-item>
                <el-form-item label="编辑文章">
                    <el-quill  ref="editor"></el-quill>
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
                post_tag:[],
                post_thumbnail:{},
                post_abstract:'',
                post_html:'',
                post_user:store.get('user')
            },
            fileList:[],
            article_id:this.$route.params.id,
            headers:{
                token:store.get('token')
            },
            inputVisible: false,
	        inputValue: ''
        }
    },
    mounted(){
        this.$http.get('/api/plugin/'+this.article_id).then((res)=>{
            this.$refs.editor.setHtml(res.data.info.post_html);
            if(res.data.status == 1){
                let sub_id = res.data.info.post_classify_sub;
                this.newPostForm = res.data.info;
                this.fileList =  this.newPostForm.post_thumbnail ? [this.newPostForm.post_thumbnail]:[];
            }else{
                this.$message({
                    message: '获取信息失败',
                    type: 'warning',
                    duration:1500
                });
            };
        });
    },
    methods:{
    	handleClose(tag) {
	        this.newPostForm.post_tag.splice(this.newPostForm.post_tag.indexOf(tag), 1);
	    },
	    showInput() {
	        this.inputVisible = true;
	        this.$nextTick(_ => {
	          this.$refs.saveTagInput.$refs.input.focus();
	        });
	    },
	    handleInputConfirm() {
	        let inputValue = this.inputValue;
	        if (inputValue) {
	          this.newPostForm.post_tag.push(inputValue);
	        }
	        this.inputVisible = false;
	        this.inputValue = '';
	    },
        editPost(){
            if(this.validateForm()){
                this.$confirm('确认添加该文章?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warnin'
                        }).then(() => {
                            this.newPostForm.post_html = document.getElementById('edit-wrap').innerHTML;
                            this.$http.post('/api/plugin/edit/'+this.$route.params.id,this.newPostForm,{headers:{token:store.get('token')}}).then((res)=>{
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
            let tag = this.newPostForm.post_tag;
            if(title == ''){
                this.$message({
                    message: '插件名字不能为空！',
                    type: 'warning',
                    duration:1500
                });
                return false;
            };
            if(title.length > 40){
                this.$message({
                    message: '插件名字不能太长！',
                    type: 'warning',
                    duration:1500
                });
                return false;
            };
            if(abstract == ''){
                this.$message({
                    message: '插件概要不能为空！',
                    type: 'warning',
                    duration:1500
                });
                return false;
            };
            if(abstract.length >= 150){
                this.$message({
                    message: '插件概要内容过长！',
                    type: 'warning',
                    duration:1500
                });
                return false;
            };
            if(tag.length === 0){
                this.$message({
                    message: '请填写插件标签',
                    type: 'warning',
                    duration:1500
                });
                return false;
            };
            if(this.$refs.editor.quill.getLength() == 1){
                this.$message({
                    message: '插件内容不能为空！',
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
<style scoped>
	.el-button--small {
		background: #fff;
	}
	.input-new-tag {
		width:100px;
	}
	.el-tag {
		margin-right:10px;
	}
</style>
