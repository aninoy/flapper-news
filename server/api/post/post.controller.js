'use strict';

import _ from 'lodash';
import Post from './post.model';
import Comment from '../comment/comment.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
    return res;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

export function index(req, res) {
  return Post.find().populate('comments').exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function create(req, res) {
  return Post.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

export function show(req, res) {
  return Post.findById(req.params.id).populate('comments', 'author').exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function upvote(req, res) {
  return Post.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(function (res) {
      res.upvotes += 1;
      return res;
    })
    .then(saveUpdates(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function comment (req, res) {
	var newComment = new Comment(req.body);
	newComment.post = req.params.id;
	return Comment.create(newComment)
	.then(function (res) {
		var commentRes = res;
		Post.findById(req.params.id).exec()
		.then(function (res) {
			res.comments.push(commentRes._id);
			return res;
		})
		.then(saveUpdates(res));
		return commentRes;
	})
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}
