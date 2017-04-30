<template>
    <div>
        <h1 class="m-title">
            添加插件
        </h1>
        <div class="m-post-form">
	        <el-form ref="form" :model="newPostForm" label-width="100px">
				<el-form-item label="插件名字">
					<el-col :xs="24" :sm="18" :lg="12">
				    	<el-input v-model.trim="newPostForm.post_title"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="插件简述">
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
				<el-form-item label="插件内容">
					<el-quill ref="editor"></el-quill>
				</el-form-item>
  				<!-- <el-form-item label="上传缩略图">
				    <el-upload
					  	action="/api/upload/"
					  	list-type="picture-card"
					  	:on-remove="removeImage"
					  	:headers="headers"
					  	:on-success="successUpload"
					  	:file-list="fileList">
					  		<i class="el-icon-plus"></i>
					</el-upload>
				</el-form-item> -->
				<el-form-item label="上传缩略图">
				   	<img class="pre-img" :src="newPostForm.post_thumbnail.url" alt="">
				   	<vue-core-image-upload :class="['pure-button','pure-button-primary','js-btn-crop']"
                       :crop="true"
                       cropRatio="31:20"
                       text="上传图片"
                       url="/api/upload-crop"
                       inputOfFile='file'
                       :headers="headers"
                       extensions="png,gif,jpeg,jpg"
                       @imageuploaded="imageuploaded"
                       @errorhandle="handleError"></vue-core-image-upload>
				</el-form-item>
				<el-form-item>
				    <el-button type="primary" @click="addPost">立即添加</el-button>
				</el-form-item>
			</el-form>
		</div>
    </div>
</template>

<script>
import ElQuill from './common/quill.vue'
import VueCoreImageUpload  from 'vue-core-image-upload';
export default {
	components:{
		ElQuill,
		VueCoreImageUpload
	},
    name: 'index',
    data () {
    	
        return {
	        newPostForm: {
		        post_title: '',
		        post_thumbnail:{
		        	name:'',
		        	url:''
		        },
		        post_abstract:'',
		        post_html:'',
		        post_user:store.get('user'),
		        post_tag:[]
	        },
	        fileList: [
	        ],
	        headers:{
	        	token:store.get('token')
	        },
	        inputVisible: false,
	        inputValue: ''
      	}
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
	    imageuploaded(res){
	    	this.newPostForm.post_thumbnail = {
	    		name:res.key,
	    		url:res.url
	    	}
	    },
	    handleError(){
	    	this.$notify.error({
                title: '上传失败',
                message: '图片上传接口上传失败，可更改为自己的服务器接口'
            });
	    },
        addPost(){
        	if(this.validateForm()){
        		this.$confirm('确认添加该插件?', '提示', {
				          	confirmButtonText: '确定',
				          	cancelButtonText: '取消',
				          	type: 'warning'
				        }).then(() => {
			        		this.newPostForm.post_html = document.getElementById('edit-wrap').innerHTML;
			        		this.$http.post('/api/plugin/add',this.newPostForm,{headers:{token:store.get('token')}}).then((res)=>{
				            	if(res.data.status == 1){
				            		this.$message({
							          	message: '上传成功！',
							          	type: 'success',
							          	duration:1500
							        });
				            		this.newPostForm = {
								        post_title: '',
								        post_thumbnail:null,
								        post_abstract:'',
								        post_html:'',
								        post_user:store.get('user'),
								        post_tag:[]
							        };
				            		this.fileList = [
				        			];
				        			this.$refs.editor.quill.setContents([{ insert: '' }]);
				            	}else if(res.data.status==401){
                                    this.$message({
                                        message: '账号过期，请重新登录',
                                        type: 'warning',
                                        duration:1500
                                    });
                                    this.$router.push('/login');
				            	} else {
									this.$message({
							          	message: '上传失败！',
							          	type: 'warning',
							          	duration:1500
							        });
				            	};
			        		})
        		 	}).catch(() => {
                          this.$message({
                            type: 'info',
                            message: '已取消操作'
                          });          
                    });
        	}
        	
        },
        successUpload(res){
        	this.fileList = [
        		{
        			name:res.key,
        			url:res.url
        		}
        	];
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
		          	message: '插件概述不能为空！',
		          	type: 'warning',
		          	duration:1500
		        });
		        return false;
        	};
        	if(abstract.length >= 150){
        		this.$message({
		          	message: '插件概述过长！',
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
	.pure-button {
		background: #20a0ff;
		width: 130px;
	    height: 35px;
	    line-height: 35px;
	    text-align: center;
	    color: #fff;
	    border-radius: 3px;
	    cursor: pointer;
	}
	.pre-img {
		max-width:250px;
	}
</style>
