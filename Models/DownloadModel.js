const mongoose = require('mongoose');

const downloadSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  month: { type: Number, required: true },
  year: { type: Number }
}
  , {
    timestamps: true,
    versionkey: false
  })
module.exports = mongoose.model('Download', downloadSchema);