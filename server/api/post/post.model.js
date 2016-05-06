'use strict';

import mongoose from 'mongoose';

var PostSchema = new mongoose.Schema({
  title: String,
  link: String,
  upvotes: {type: Number, default: 0},
  comments: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Comment'
  }]
});

export default mongoose.model('Post', PostSchema);
