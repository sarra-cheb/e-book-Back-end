const mongoose = require('mongoose');
const schema = mongoose.Schema;

const CategorySchema = new schema({
  name: {
    type: String,
    required: true
  },
  listofbooks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }]
}
  , {
    timestamps: true,
    versionkey: false
  })
module.exports = mongoose.model('Category', CategorySchema)