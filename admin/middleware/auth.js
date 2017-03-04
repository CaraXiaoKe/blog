/**
* 用于验证用户是否登录
*/

function Auth() {

}
Auth.prototype.loggedIn = function(){
	if(!store.get('token')){
		 return false;
	};
	return true;
}

export default Auth; 
