const mongoose = require('mongoose')
const Schema = mongoose.Schema

const agentSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    isCemplete: { type: Boolean, default: false },
    status: { type: Boolean, default: true },
    company: { type: String },
    licence: { type: String },
    licenceExpir: { type: String },
    country: { type: String },
    province: { type: String },
    city: { type: String },
    postal: { type: Number },
    phone: { type: String },
    address: { type: String },
    profile: { type: String },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Agent', agentSchema)
