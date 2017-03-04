module.exports = function(app){
	//所有数据接口挂载至/api下
	function use(url, other){
		app.use('/api/'+url, other);
	};
	use('article',require('./article'));
	use('upload',require('../qiniu'));
	use('admin',require('./admin'));
	use('comment',require('./comment'));

	app.use('/',require('./link'));

	
}
