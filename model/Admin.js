const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isCemplete: { type: Boolean, default: false },
    status: { type: Boolean, default: false },
    addedBy: { type: String, required: true },
    profile: { type: String },
    country: { type: String },
    province: { type: String },
    city: { type: String },
    postal: { type: Number },
    address: { type: String },
    isSuper: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Admin', adminSchema)
