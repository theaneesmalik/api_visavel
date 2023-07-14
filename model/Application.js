const mongoose = require('mongoose')
const Schema = mongoose.Schema

const applicationSchema = new Schema(
  {
    agentId: { type: String, required: true },
    jobId: { type: String, required: true },
    userId: { type: String, required: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Application', applicationSchema)
