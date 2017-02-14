var express = require('express');
var router = express.Router();
var articleController = require('../controllers/ArticleController.js');
/* GET users listing. */
router.get('/', articleController.getLists);
router.get('/:id', articleController.getOneArticle);
router.post('/add', articleController.addOne);

module.exports = router;
