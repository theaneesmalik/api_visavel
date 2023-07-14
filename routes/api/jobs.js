const express = require('express')
const router = express.Router()
const {
  getAllJobs,
  createNewJob,
  updateJob,
  deleteJob,
  getJob,
  filterJobs,
} = require('../../controllers/jobsController')
// const single = require('../../middleware/molter')

router.route('/').get(getAllJobs).post(createNewJob).put(updateJob).delete(deleteJob)
router.route('/filter').get(filterJobs)

router.route('/:id').get(getJob)

module.exports = router
