const mongoose = require('mongoose')

const POST_DATA_TYPE = {
  CODE: 'code',
  TEXT: 'text',
}

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    keywords: {
      type: String,
      required: true,
    },
    data: [
      {
        id: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
          enum: Object.values(POST_DATA_TYPE),
        },
      },
    ],
    bannerImageUrl: {
      type: String,
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    published: {
      type: Boolean,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

const Post = mongoose.model('Post', postSchema)

module.exports = {
  Post,
  POST_DATA_TYPE,
}
