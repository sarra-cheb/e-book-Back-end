const mongoose = require('mongoose');
const schema = mongoose.Schema;
const BookSchema = new schema({
  title: {
    type: String,
    required: true
  },
  autor: {
    type: String,
    required: true
  },
  category: [{
    type: String,
    required: true
  }],
  description: {
    type: String,
    required: true
  },
  contenue: [{
    type: Buffer
  }],
  contenueUrl: {
    type: String
  },
  download: {
    type: String
  }
}
  , {
    timestamps: true,
    versionkey: false
  })
module.exports = mongoose.model('Book', BookSchema)