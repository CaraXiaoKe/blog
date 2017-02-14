module.exports={
	mongodb:{
		database:"blog",//数据库名称
		host:"localhost",//数据库地址
		port:'27017', //数据库端口号
		username:"",//数据库账号
		password:""//数据库密码
	},
	mysql:{
		database:"",//数据库名称
		host:"localhost",//数据库地址
		port:'3306', //数据库端口号
		username:"root",//数据库账号
		password:"123456"//数据库密码
	},
	ACCESS_KEY:'',
	SECRET_KEY:'',
	BUCKET:'dpdtest',
	ROOTPATH:'//ohclaoi0z.bkt.clouddn.com/',
	//邮件发送系统配置
	EMAIL_ADMIN_USER:"1367030806@qq.com",//管理员邮箱，需要开启QQ邮箱SMTP服务，开启后会生成授权码
	EMAIL_ADMIN_PASS:"",//如果是qq的话，为授权码
	EMAIL_ADMIN_HOST:"smtp.qq.com",//此处为qq邮箱服务器
	EMAIL_ADMIN_PORT:465 //默认端口号为465
};
