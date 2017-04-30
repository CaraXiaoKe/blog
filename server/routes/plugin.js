var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/checklogin.js');
var PluginController = require('../controllers/PluginController.js');

/* GET users listing. */
router.get('/', PluginController.getLists);
router.get('/:id', PluginController.getOnePlugin);
router.get('/pagination/fetch', PluginController.getPagination);

router.post('/add',checkLogin, PluginController.addOne);
router.post('/edit/:id',checkLogin,PluginController.editOne);
router.post('/times', PluginController.readOne);
module.exports = router;
