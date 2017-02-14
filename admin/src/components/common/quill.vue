<template>
	<div class="m-quill">
		<div id="toolbar">
			<button class="ql-bold" type="button">Bold</button>
			<button class="ql-italic" type="button">Italic</button>
			<select class="ql-font">
				<option selected=""></option>
				<option value="serif"></option>
				<option value="monospace"></option>
			</select>
			<select class="ql-size">
			    <option value="small"></option>
			    <!-- Note a missing, thus falsy value, is used to reset to default -->
			    <option selected></option>
			    <option value="large"></option>
			    <option value="huge"></option>
  			</select>
			<button class="ql-code-block" type="button">CodeBlock</button>
			<button class="ql-underline" type="button">Underline</button>
			<button class="ql-strike" type="button">Strike</button>
			<select class="ql-background">
				<option value="#000000"></option><option value="#e60000"></option><option value="#ff9900"></option><option value="#ffff00"></option><option value="#008a00"></option><option value="#0066cc"></option><option value="#9933ff"></option><option selected="selected"></option><option value="#facccc"></option><option value="#ffebcc"></option><option value="#ffffcc"></option><option value="#cce8cc"></option><option value="#cce0f5"></option><option value="#ebd6ff"></option><option value="#bbbbbb"></option><option value="#f06666"></option><option value="#ffc266"></option><option value="#ffff66"></option><option value="#66b966"></option><option value="#66a3e0"></option><option value="#c285ff"></option><option value="#888888"></option><option value="#a10000"></option><option value="#b26b00"></option><option value="#b2b200"></option><option value="#006100"></option><option value="#0047b2"></option><option value="#6b24b2"></option><option value="#444444"></option><option value="#5c0000"></option><option value="#663d00"></option><option value="#666600"></option><option value="#003700"></option><option value="#002966"></option><option value="#3d1466"></option>
			</select>
			<button class="ql-blockquote" type="button">Blockquote</button>
			<button class="ql-list" value="ordered" type="button">List</button>
			<button class="ql-list" value="bullet" type="button">List</button>
			<button class="ql-indent" value="-1" type="button">Indent</button>
			<button class="ql-indent" value="+1" type="button">Indent</button>
			<button class="ql-direction" value="rtl" type="button">Direction</button>
			<select class="ql-align">
				<option selected=""></option>
				<option value="center"></option>
				<option value="right"></option>
				<option value="justify"></option>
			</select>
			<button class="ql-link" type="button">Link</button>
			<button class="ql-img-upload" type="button" @click="triggerFile">
				<svg viewBox="0 0 18 18"> <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect> <circle class="ql-fill" cx="6" cy="7" r="1"></circle> <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> </svg>
			</button>
			<input v-loading.fullscreen.lock="fullscreenLoading" ref="quillimg" type="file" class="quill-upload" @change="selectFile($event)"/>
		</div>
		<div id="editor">
		  	
		</div>
	</div>
</template>
<script>
	import Quill from 'quill'

	export default {
		props:['quillContent'],
		data(){
			return {
				quill:null,
				num:this.quillContent,
				fullscreenLoading:false
			}
		},
		watch:{
        	'quillContent'(){
        		this.quill.setContents(this.quillContent);
        	}
    	},
		mounted(){
			this.quill = new Quill('#editor', {
			    modules: { 
			    	syntax: true,
			    	toolbar: '#toolbar'
			    },
			    theme: 'snow',
			    placeholder: 'Compose an epic...',
	  		});
		},
		methods:{
			selectFile(e){
				this.fullscreenLoading = true;
				let that = this;
				let index =  this.quill.getSelection() ? this.quill.getSelection().index : 0;
				let file = this.$refs.quillimg.files[0];
				let submitData = new FormData();
			   	submitData.append("file", file);
			   	let xhr = new XMLHttpRequest();  
		        xhr.open('POST','/api/upload',true);  
		        xhr.onload = function(event) {
					if (xhr.status === 200) {
						that.fullscreenLoading = false;
						that.quill.insertEmbed(index, 'image', JSON.parse(this.response).url);
					} else {
						this.$message({
                            message: '上传失败',
                            type: 'warning',
                            duration:1500
                        });
					}
				};
		        xhr.send(submitData);  
			},
			//解决火狐问题
			triggerFile(){
				this.$refs.quillimg.click();
			}
		}
	}
</script>
<style>
	.m-quill {
		line-height:normal;
	}
	.ql-img-upload:focus {
		    outline: none;
	}
	#editor {
		min-height:200px;
	}
	.ql-img-upload {
		position: relative;
	}
	.quill-upload {
		display: none;
		width:20px;
		height:20px;
		position: absolute;
		top:3px;
		left:3px;
		opacity: 0;
	}
</style>