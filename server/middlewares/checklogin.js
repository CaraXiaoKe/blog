module.exports = function(req,res,next){
	if(req.headers.token!==req.session.id){
		res.json({
			info:"账号过期，请重新登录！",
			code:401
		});
	}else{
		next();
	}
	
}