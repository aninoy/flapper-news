'use strict';

// var mongoose = require('mongoose');
// var Post = mongoose.model('Post');

var express = require('express');
var controller = require('./post.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.get('/:id', controller.show);
router.put('/:id/upvote', controller.upvote);
router.post('/:id/comment', controller.comment);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

module.exports = router;
