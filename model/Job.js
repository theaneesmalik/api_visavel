const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jobSchema = new Schema(
  {
    // about job
    title: { type: String, required: true },
    currency: { type: String, required: true },
    minSalary: { type: Number, required: true },
    maxSalary: { type: Number, required: true },
    minAge: { type: Number, required: true },
    maxAge: { type: Number, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    company: { type: String, required: true },
    noOfJobs: { type: Number, required: true },
    deadline: { type: Date, required: true },
    //benifits
    accommodation: { type: Boolean, required: true },
    food: { type: Boolean, required: true },
    ticket: { type: Boolean, required: true },
    medical: { type: Boolean, required: true },
    insurance: { type: Boolean, required: true },
    transpotation: { type: Boolean, required: true },
    //auto
    agentId: { type: String, required: true },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Job', jobSchema)
