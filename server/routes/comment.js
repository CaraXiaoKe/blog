var express = require('express');
var router = express.Router();
var commentController = require('../controllers/CommentController.js');

/* GET users listing. */
router.get('/', commentController.getLists);

router.post('/', commentController.addComment);

module.exports = router;
