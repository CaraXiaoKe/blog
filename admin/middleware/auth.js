/**
* 用于验证用户是否登录
*/
module.exports = class AuthClient {
    constructor() {
        
    }
    loggedIn() {
    	if(!store.get('token')){
    		 return false;
    	};
    	return true;
    }
}
