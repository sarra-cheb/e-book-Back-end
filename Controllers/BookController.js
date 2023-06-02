
const Book = require('../Models/BookModel');
const Category = require('../Models/CategoryModel');
const User = require('../Models/UserModel');

exports.addBook = async (req, res) => {
  try {
    const categoryIds = [];
    const { category } = req.body;

    if (Array.isArray(category)) {
      await Promise.all(category.map(async (e) => {
        const idCategory = await Category.findOne({ name: e });
        if (!idCategory) {
          throw new Error(`Category ${e} is not found, please verify the category of the book`);
        }
        categoryIds.push(idCategory._id);
      }));
    } else {
      const idCategory = await Category.findOne({ name: category });
      if (!idCategory) {
        throw new Error(`Category ${category} is not found, please verify the category of the book`);
      }
      categoryIds.push(idCategory._id);
    }

    const newBook = await Book.create({ ...req.body, category: category, contenueUrl: 'http://localhost:4000/Books/' + req.file.filename, download: 'Books/' + req.file.filename });
    categoryIds.map((e) => {
      return Category.findByIdAndUpdate(e, { $push: { listofbooks: newBook._id } });
    });
    res.send({ message: 'book added succefully' });
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'error server' })
  }
}


exports.getbyidBook = async (req, res) => {
  try {
    const Books = await Book.findById(req.params.id)
    res.send({ message: 'book wanted:', Books })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}
exports.getBook = async (req, res) => {
  try {
    const Books = await Book.find()
    res.send({ message: 'list of books', Books })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}
exports.editBook = async (req, res) => {
  try {
    console.log(req.body)
    const categoryIds = [];
    const { category } = req.body;


    if (Array.isArray(category)) {
      await Promise.all(category.map(async (e) => {
        const idCategory = await Category.findOne({ name: e });
        if (!idCategory) {
          throw new Error(`Category ${e} is not found, please verify the category of the book`);
        }
        categoryIds.push(idCategory._id);
      }));
    } else {
      const idCategory = await Category.findOne({ name: category });
      if (!idCategory) {
        throw new Error(`Category ${category} is not found, please verify the category of the book`);
      }
      categoryIds.push(idCategory._id);
    }
    await Book.findByIdAndUpdate(req.params.id, req.body)
    categoryIds.map((e) => {
      return Category.findByIdAndUpdate(e, { $push: { listofbooks: newBook._id } });
    });
    res.send({ message: 'Book updated' })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
    console.log(error)
  }
}
exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id)
    res.send({ message: 'Book deleted' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'error server' })
  }
}

