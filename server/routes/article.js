var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/checklogin.js');
var articleController = require('../controllers/ArticleController.js');

/* GET users listing. */
router.get('/', articleController.getLists);
router.get('/:id', articleController.getOneArticle);
router.get('/types/all', articleController.getArticleTypes);
router.get('/pagination/fetch', articleController.getPagination);

router.post('/add',checkLogin, articleController.addOne);
router.post('/edit/:id',checkLogin, articleController.editOne);
router.post('/times', articleController.readOne);
module.exports = router;
