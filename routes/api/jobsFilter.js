const express = require('express')
const router = express.Router()
const { filterJobs } = require('../../controllers/jobsController')
// const single = require('../../middleware/molter')

router.route('/filter').get(filterJobs)

module.exports = router
