const mongoose = require('mongoose');
const schema = mongoose.Schema;
const UserSchema = new schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    Enumerator: ['admin', 'client'],
    default: "client",
  },
  typeofclient: {
    type: String,
    enum: ['normal', 'abonné'],
  },
}
  , {
    timestamps: true,
    versionkey: false
  })
module.exports = mongoose.model('User', UserSchema)