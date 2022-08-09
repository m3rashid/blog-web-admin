const { Category } = require('./model')
const { bannedWordsForSlug } = require('../../utils/bannedWordsForSlug')

const getAllCategories = async (req, res) => {
  const categories = await Category.aggregate([
    { $project: { createdAt: 0, updatedAt: 0, __v: 0 } },
  ])
  return res.status(200).json(categories)
}

const createCategory = async (req, res) => {
  const { name, slug } = req.body
  if (!name || !slug) throw new Error('Invalid request')

  if (bannedWordsForSlug.includes(slug)) throw new Error('Invalid slug')
  if (slug.split(' ')[0] !== slug) throw new Error('Invalid slug')

  const category = new Category({ name, slug })

  const saved = await category.save()
  return res.status(200).json(saved)
}

const editCategory = async (req, res) => {
  const { categoryId, slug, name } = req.body
  if (!categoryId || !slug || !name) throw new Error('Invalid request')
  const category = await Category.findById(categoryId)
  if (!category) throw new Error('Category not found')

  if (bannedWordsForSlug.includes(slug)) throw new Error('Invalid Slug')
  if (slug.split(' ')[0] !== slug) throw new Error('Invalid slug')

  const newCategory = await Category.updateOne(
    { _id: categoryId },
    { $set: { name, slug } }
  )
  return res.status(200).json(newCategory)
}

const deleteCategory = async (req, res) => {
  const { categoryId } = req.body
  if (!categoryId) throw new Error('Invalid request')
  const deleted = await Category.deleteOne({ _id: categoryId })
  if (!deleted) throw new Error('Category not found')

  return res.status(200).json('Category Deleted')
}

module.exports = {
  getAllCategories,
  createCategory,
  editCategory,
  deleteCategory,
}
