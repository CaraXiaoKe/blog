<template>
	<div class="register-box">
		<el-form>
			<el-row>
				<el-col :xs="{span:20,offset:2}" :sm="{span:8,offset:8}" :lg="{span:6,offset:9}">
					<el-input v-model="form.admin" type="text" placeholder="请输入账号" size="large" icon="message"></el-input>
				</el-col>
				<el-col class="mt10" :xs="{span:20,offset:2}" :sm="{span:8,offset:8}" :lg="{span:6,offset:9}">
					<el-input v-model="form.password" type="password" placeholder="请输入密码" size="large" icon="information"></el-input>
				</el-col>
				
			</el-row>
			<el-row class="mt10">
				<el-button type="primary" size="large" @click="submit(0)">重置密码</el-button>
				<el-button type="primary" size="large" @click="submit(1)">注册</el-button>
			</el-row>
		</el-form>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				form:{
					admin:'',
					password:'',
					isnew:true
				}
			}
		},
		methods:{
			submit(n){
				this.form.isnew = n===1;
				this.$http.post('/api/admin/register',this.form).then((res)=>{
					if(res.data.status == 0){
						this.$message({
		                    message: res.data.info,
		                    type: 'warning',
		                    duration:1500
		                });
					}else{
						this.$message({
		                    message: "注册成功！",
		                    type: 'success',
		                    duration:1500
		                });		                
					}
				})
			}
		}
	}
</script>
<style>
	.register-box {
		text-align: center;
	}
	.mt10 {
		margin-top: 10px;
	}
</style>