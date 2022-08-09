const { isValidObjectId } = require('mongoose')

const { Comment } = require('./model')

const createComment = async (req, res) => {
  const { postId, name, comment } = req.body

  if (!name || !comment) throw new Error('Invalid request')
  if (!postId || !isValidObjectId(postId)) throw new Error('Invalid postId')
  const newComment = new Comment({ name, comment })
  const saved = await newComment.save()

  await Post.findOneAndUpdate(
    { _id: postId },
    { $push: { comments: saved._id } }
  )
  return res.status(200).json(saved)
}

module.exports = {
  createComment,
}
