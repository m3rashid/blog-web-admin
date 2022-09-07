const { isValidObjectId } = require('mongoose')

const { Category } = require('../category/model')
const { bannedWordsForSlug } = require('../../utils/bannedWordsForSlug')

const { Post } = require('./model')

const getPostsByCategory = async (req, res) => {
  const { slug } = req.body
  if (!slug) throw new Error('Invalid Request')

  const posts = await Category.aggregate([
    { $match: { slug: slug } },
    {
      $lookup: {
        from: 'posts',
        localField: '_id',
        foreignField: 'categories',
        as: 'posts',
      },
    },
    { $project: { name: 0, slug: 0, createdAt: 0, updatedAt: 0, __v: 0 } },
    { $unwind: { path: '$posts', preserveNullAndEmptyArrays: false } },
    {
      $project: {
        title: '$posts.title',
        slug: '$posts.slug',
        bannerImageUrl: '$posts.bannerImageUrl',
        categories: '$posts.categories',
        createdAt: '$posts.createdAt',
      },
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'categories',
        foreignField: '_id',
        as: 'categories',
      },
    },
    { $project: { categories: { createdAt: 0, updatedAt: 0, __v: 0 } } },
    { $sort: { createdAt: -1 } },
  ])

  if (!posts || posts.length === 0) return res.status(200).json([])

  return res.status(200).json(posts)
}

const getPostsForCard = async (req, res) => {
  let posts = await Post.aggregate([
    { $sort: { createdAt: -1 } },
    { $limit: 6 },
    {
      $lookup: {
        from: 'categories',
        localField: 'categories',
        foreignField: '_id',
        as: 'categories',
      },
    },
    {
      $project: {
        title: 1,
        slug: 1,
        bannerImageUrl: 1,
        categories: { name: 1, slug: 1, _id: 1 },
      },
    },
  ])

  posts = posts.filter((p) => {
    let i = 0
    for (i = 0; i < p.categories.length; i++) {
      if (p.categories[i].slug === 'off-topic') return false
    }
    return true
  })

  return res.status(200).json(posts)
}

const createPost = async (req, res) => {
  const { title, slug, data, bannerImageUrl, keywords, categories, published } =
    req.body
  if (
    !title ||
    !slug ||
    !data ||
    !bannerImageUrl ||
    !keywords ||
    !categories ||
    !published
  ) {
    throw new Error('Invalid request')
  }

  if (bannedWordsForSlug.includes(slug)) throw new Error('Invalid Slug')
  if (slug.split(' ')[0] !== slug) throw new Error('Invalid slug')

  const post = new Post({
    title,
    slug,
    data,
    keywords,
    bannerImageUrl,
    categories,
    published,
  })
  const saved = await post.save()
  return res.status(200).json(saved)
}

const deletepost = async (req, res) => {
  const { slug } = req.body
  if (!slug) throw new Error('Invalid request')
  const post = await Post.findOneAndUpdate({ slug }, { deleted: true })
  if (!post) throw new Error('Post not found')

  return res.status(200).json('Post deleted')
}

const getpostDetail = async (req, res) => {
  const { slug } = req.body
  if (!slug) throw new Error('Invalid Request')

  const posts = await Post.aggregate([
    { $match: { slug: slug } },
    {
      $lookup: {
        from: 'categories',
        localField: 'categories',
        foreignField: '_id',
        as: 'categories',
      },
    },
    {
      $lookup: {
        from: 'comments',
        localField: 'comments',
        foreignField: '_id',
        as: 'comments',
      },
    },
    {
      $project: {
        title: 1,
        slug: 1,
        data: 1,
        bannerImageUrl: 1,
        comments: 1,
        categories: { name: 1, slug: 1 },
        createdAt: 1,
        updatedAt: 1,
        published: 1,
      },
    },
  ])

  const relatedPosts = await Post.aggregate([
    { $match: { slug: slug, published: true } },
    {
      $lookup: {
        from: 'categories',
        localField: 'categories',
        foreignField: '_id',
        as: 'category',
      },
    },
    { $project: { _id: 0, category: { name: 1, slug: 1, _id: 1 } } },
    { $unwind: { path: '$category', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: 'posts',
        localField: 'category._id',
        foreignField: 'categories',
        as: 'posts',
      },
    },
    {
      $project: {
        posts: {
          _id: 1,
          title: 1,
          slug: 1,
          bannerImageUrl: 1,
          createdAt: 1,
        },
      },
    },
    { $unwind: { path: '$posts', preserveNullAndEmptyArrays: true } },
    { $match: { 'posts.slug': { $ne: slug } } },
    {
      $project: {
        _id: '$posts._id',
        title: '$posts.title',
        slug: '$posts.slug',
        bannerImageUrl: '$posts.bannerImageUrl',
        createdAt: '$posts.createdAt',
      },
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          slug: '$slug',
          title: '$title',
          bannerImageUrl: '$bannerImageUrl',
          createdAt: '$createdAt',
        },
      },
    },
    { $limit: 5 },
    {
      $project: {
        _id: '$_id._id',
        title: '$_id.title',
        slug: '$_id.slug',
        bannerImageUrl: '$_id.bannerImageUrl',
        createdAt: '$_id.createdAt',
      },
    },
  ])

  return res.status(200).json({
    postDetail: posts[0],
    relatedPosts: relatedPosts,
  })
}

const editPost = async (req, res) => {
  const {
    title,
    data,
    bannerImageUrl,
    keywords,
    categories,
    published,
    postId,
  } = req.body
  if (!postId) throw new Error('Invalid request')

  if (!isValidObjectId(postId)) throw new Error('Invalid postId')

  const post = await Post.findById(postId)
  if (!post) throw new Error('Post not found')

  const updates = {
    title,
    data,
    keywords,
    bannerImageUrl,
    categories,
    published,
  }

  const updated = await post.updateOne({ ...updates })
  return res.status(200).json(updated)
}

const getPostsForAuthor = async (req, res) => {
  const posts = await Post.aggregate([
    {
      $lookup: {
        from: 'categories',
        localField: 'categories',
        foreignField: '_id',
        as: 'categories',
      },
    },
    {
      $project: {
        title: 1,
        slug: 1,
        bannerImageUrl: 1,
        published: 1,
        categories: { name: 1, slug: 1, _id: 1 },
      },
    },
  ])

  return res.status(200).json(posts)
}

module.exports = {
  getPostsByCategory,
  getPostsForCard,
  createPost,
  deletepost,
  getpostDetail,
  editPost,
  getPostsForAuthor,
}
