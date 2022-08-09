const router = require('express').Router()

const { login, getUser } = require('./auth/controllers')
const {
  createCategory,
  deleteCategory,
  editCategory,
  getAllCategories,
} = require('./category/controllers')
const {
  getPostsByCategory,
  getPostsForCard,
  createPost,
  deletepost,
  getpostDetail,
  editPost,
  getPostsForAuthor,
} = require('./post/controllers')
const { createComment } = require('./comment/controllers')
const { authLimit, regularLimit } = require('../utils/ratelimit')
const { makeSafe, checkAuth } = require('../utils/router')

// auth
router.post('/login', authLimit, makeSafe(login))
router.post('/user', authLimit, checkAuth, makeSafe(getUser))

// post
router.post('/post/create', authLimit, checkAuth, makeSafe(createPost))
router.post('/post/delete', authLimit, checkAuth, makeSafe(deletepost))
router.post('/post/author', authLimit, checkAuth, makeSafe(getPostsForAuthor))

router.post('/post/details', regularLimit, makeSafe(getpostDetail))
router.post('/post/card', regularLimit, makeSafe(getPostsForCard))
router.post('/post/edit', authLimit, checkAuth, makeSafe(editPost))
router.post('/post/category', regularLimit, makeSafe(getPostsByCategory))

// category
router.post('/category/create', authLimit, checkAuth, makeSafe(createCategory))
router.post('/category/delete', authLimit, checkAuth, makeSafe(deleteCategory))
router.post('/category/edit', authLimit, checkAuth, makeSafe(editCategory))
router.post('/category/all', regularLimit, makeSafe(getAllCategories))

// comment
router.post('/comment/create', authLimit, makeSafe(createComment))

module.exports = router
