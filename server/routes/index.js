module.exports = function(app){
	//所有数据接口挂载至/api下
	function use(url, other){
		app.use('/api/'+url, other);
	};
	use('article',require('./article'));


	//路由跳转
	app.get('/', function(req, res, next) {
	  	res.render('index', 
	  		{ 
	  			title: 'Express' 
	  		}
	  	);
	});
}
