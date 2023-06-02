const Category = require('../Models/CategoryModel');

exports.addCategory = async (req, res) => {
  try {
    await Category.create(req.body)
    res.send({ message: 'Category added' })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}
exports.getbyidCategory = async (req, res) => {
  try {
    const Categorys = await Category.findById(req.params.id).populate('listofbooks');
    res.send({ message: 'Category wanted:', Categorys })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}
exports.getCategory = async (req, res) => {
  try {
    const Categorys = await Category.find().populate('listofbooks')
    res.send({ message: 'list of Categorys', Categorys })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}
exports.editCategory = async (req, res) => {
  try {
    await Category.findByIdAndUpdate(req.params.id, req.body)
    res.send({ message: 'Category updated' })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}
exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id)
    res.send({ message: 'Category deleted' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'error server' })
  }
}