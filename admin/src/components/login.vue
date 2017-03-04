<template>
	<div class="login-bg">
		<div class="m-login">
			<el-form>
				<el-row>
					<el-col :xs="{span:20,offset:2}" :sm="{span:8,offset:8}" :lg="{span:6,offset:9}">
						<el-input v-model="form.admin" type="text" placeholder="请输入账号" size="large" icon="message"></el-input>
					</el-col>
					<el-col :xs="{span:20,offset:2}" :sm="{span:8,offset:8}" :lg="{span:6,offset:9}">
						<el-input v-model="form.password" type="password" placeholder="请输入密码" size="large" icon="information"></el-input>
					</el-col>
					
				</el-row>
				<el-row>
					<el-button type="primary" size="large" @click="submit">登录</el-button>
				</el-row>
			</el-form>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				form:{
					admin:'',
					password:''
				}
			}
		},
		methods:{
			submit(){
				this.$http.post('/api/admin/login',this.form,{headers:{token:store.get('token')}}).then((res)=>{
					if(res.data.status == 0){
						this.$message({
		                    message: res.data.info,
		                    type: 'warning',
		                    duration:1500
		                });
					}else{
						this.$message({
		                    message: "登录成功！",
		                    type: 'success',
		                    duration:1500
		                });
		                store.set("token",res.data.token);
		                store.set("user",res.data.admin);
		                if(this.$route.query.redirect){
		                	this.$router.push(this.$route.query.redirect);
		                }else{
		                	this.$router.push('/');
		                }
		                
					}
				})
			}
		}
	}
</script>
<style>
	.login-bg {
		width:100%;
		height:100%;
		background: url(https://dn-youplus-static.qbox.me/back.png) no-repeat center center;
    	background-size: cover;
	}

	.m-login{
		position: relative;
		top:50%;
		transform:translateY(-50%);
		text-align: center;
	}
	.m-login .el-col {
		margin-bottom: 20px;
	}
</style>