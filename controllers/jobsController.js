const Job = require('../model/Job')

const getAllJobs = async (req, res) => {
  const jobs = await Job.find(req.query)
  if (!jobs) return res.status(204).json({ message: 'No jobs found.' })
  res.json(jobs)
}

const createNewJob = async (req, res) => {
  if (!req?.body?.title) {
    return res.status(400).json({ message: 'Title is required' })
  }

  try {
    const result = await Job.create({ ...req.body })

    res.status(201).json(result)
  } catch (err) {
    console.error(err)
  }
}

const updateJob = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: 'ID parameter is required.' })
  }
  const job = await Job.findOne({ _id: req.body.id }).exec()
  if (!job) {
    return res.status(204).json({ message: `No job matches ID ${req.body.id}.` })
  }
  var newObj = { ...job.toObject(), ...req.body.data }
  Object.assign(job, newObj)
  const result = await job.save()
  res.json(result)
}

const deleteJob = async (req, res) => {
  if (!req?.body?.id) return res.status(400).json({ message: 'Job ID required.' })

  const job = await Job.findOne({ _id: req.body.id }).exec()
  if (!job) {
    return res.status(204).json({ message: `No job matches ID ${req.body.id}.` })
  }
  const result = await job.deleteOne() //{ _id: req.body.id }
  res.json(result)
}

const getJob = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ message: 'Job ID required.' })

  const job = await Job.findOne({ _id: req.params.id }).exec()
  if (!job) {
    return res.status(204).json({ message: `No job matches ID ${req.params.id}.` })
  }
  res.json(job)
}
async function filterJobs(req, res) {
  try {
    const { search, minAge, maxAge, minSalary, maxSalary, country, page } = req.query
    const pageSize = 5
    const pageNumber = parseInt(page) || 1

    const query = {}

    if (search) {
      query.title = { $regex: search, $options: 'i' }
    }

    if (minAge && maxAge) {
      query.minAge = { $gte: parseInt(minAge) }
      query.maxAge = { $lte: parseInt(maxAge) }
    } else if (minAge) {
      query.minAge = { $gte: parseInt(minAge) }
    } else if (maxAge) {
      query.maxAge = { $lte: parseInt(maxAge) }
    }

    if (minSalary && maxSalary) {
      query.minSalary = { $gte: parseInt(minSalary) }
      query.maxSalary = { $lte: parseInt(maxSalary) }
    } else if (minSalary) {
      query.minSalary = { $gte: parseInt(minSalary) }
    } else if (maxSalary) {
      query.maxSalary = { $lte: parseInt(maxSalary) }
    }

    if (country) {
      query.country = { $regex: country, $options: 'i' }
    }

    const totalJobs = await Job.countDocuments(query)
    const totalPages = Math.ceil(totalJobs / pageSize)

    const jobs = await Job.find({ ...query, status: true })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .exec()

    res.json({
      jobs,
      currentPage: pageNumber,
      totalPages,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
module.exports = {
  getAllJobs,
  createNewJob,
  updateJob,
  deleteJob,
  getJob,
  filterJobs,
}
