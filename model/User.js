const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    isCemplete: { type: Boolean, default: true },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
