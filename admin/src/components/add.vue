<template>
    <div>
        <h1 class="m-title">
            添加文章
        </h1>
        <div class="m-post-form">
	        <el-form ref="form" :model="newPostForm" label-width="100px">
				<el-form-item label="文章名字">
					<el-col :xs="24" :sm="18" :lg="12">
				    	<el-input v-model.trim="newPostForm.post_title"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="文章概要">
					<el-col :xs="24" :sm="18" :lg="12">
				    	<el-input type="textarea" :autosize="{minRows: 3, maxRows: 6}" v-model.trim="newPostForm.post_abstract"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="编辑文章">
					<el-quill ref="editor"></el-quill>
				</el-form-item>
				<el-form-item label="文章分类">
				    <el-select class="f-mt-0" v-model="newPostForm.post_classify_sup" placeholder="请选择分类">
				      	<el-option v-for="field in fieldTree" :label="field.field_name" :value="field.field_id"></el-option>
				    </el-select>
				    <el-select v-model="newPostForm.post_classify_sub" placeholder="请选择文章二级分类">
				      	<el-option v-for="item in subTree" :label="item.field_member_name" :value="item.field_member_id"></el-option>
				    </el-select>
  				</el-form-item>
  				<el-form-item label="上传缩略图">
				    <el-upload
					  	action="/api/upload"
					  	type="drag"
					  	:thumbnail-mode="true"
					  	:on-remove="removeImage"
					  	:headers="headers"
					  	:on-success="successUpload"
					  	:default-file-list="fileList">
					  		<i class="el-icon-upload"></i>
					  		<div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
					  		<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
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
export default {
	components:{ElQuill},
    name: 'index',
    data () {
    	
        return {
	        newPostForm: {
		        post_title: '',
		        post_classify_sup:'',
		        post_classify_sub:'',
		        post_thumbnail:null,
		        post_abstract:'',
		        post_html:'',
		        post_user:store.get('user')
	        },
	        fieldTree:[],
	        subTree:[],
	        fieldHash:{},
	        fileList: [
	        ],
	        headers:{
	        	token:store.get('token')
	        }
      	}
    },
    watch:{
    	'newPostForm.post_classify_sup'(val){
    		this.subTree = this.fieldHash[val+''];
    		this.newPostForm.post_classify_sub = '';
    	}
    },
    mounted(){
    	this.$http.get('/api/article/types/all').then((res)=>{
    		this.fieldTree = Object.freeze(res.data.info);
    		let hash = {};
	    	res.data.info.forEach((item)=>{
	    		hash[item.field_id] = item.field_members;
	    	});
	    	this.fieldHash = Object.freeze(hash);
    	})
    },
    methods:{
        addPost(){
        	if(this.validateForm()){
        		this.$confirm('确认添加该文章?', '提示', {
				          	confirmButtonText: '确定',
				          	cancelButtonText: '取消',
				          	type: 'warning'
				        }).then(() => {
			        		this.newPostForm.post_html = document.getElementById('edit-wrap').innerHTML;
			        		this.$http.post('/api/article/add',this.newPostForm,{headers:{token:store.get('token')}}).then((res)=>{
				            	if(res.data.status == 1){
				            		this.$message({
							          	message: '上传成功！',
							          	type: 'success',
							          	duration:1500
							        });
				            		this.newPostForm = {
								        post_title: '',
								        post_classify_sup:'',
								        post_classify_sub:'',
								        post_thumbnail:null,
								        post_html:''
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
        	// 	this.$message({
		       //    	message: '请上传图片！',
		       //    	type: 'warning',
		       //    	duration:1500
		       //  });
		       //  return false;
        	// };	
        	return true;
        }
    }
}
</script>

<style>
</style>
