<template>
    <div>
        <h1 class="m-title">
            添加文章
        </h1>
        <div class="m-post-form">
	        <el-form ref="form" :model="newPostForm" label-width="100px">
				<el-form-item label="文章名字">
					<el-col :xs="24" :sm="18" :lg="12">
				    	<el-input v-model="newPostForm.post_title"></el-input>
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
					  	action="//jsonplaceholder.typicode.com/posts/"
					  	type="drag"
					  	:thumbnail-mode="true"
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
		        post_content:null
	        },
	        fieldTree:Object.freeze(classify_data),
	        subTree:[],
	        fieldHash:Object.freeze(hash),
	        fileList: [
	         	
	        ]
     
      	}
    },
    watch:{
    	'newPostForm.post_classify_sup'(val){
    		this.subTree = this.fieldHash[val+''];
    		this.newPostForm.post_classify_sub = '';
    	}
    },
    mounted(){
    	
    },
    methods:{
        addPost(){
        	this.newPostForm.post_content = this.$refs.editor.quill.getContents().ops;
        	this.$http.post('/api/article/add',this.newPostForm).then((res)=>{
            	if(res.data.status == 1){
            		alert("发送成功");
            	}else{
					alert("上传失败");
            	};
        	})
        }
    }
}
</script>

<style>
</style>
