const express = require('express')
const router = express.Router()
const { getDashboardStats } = require('../../controllers/dashbordController')
// const single = require('../../middleware/molter')

router.route('/').get(getDashboardStats)

module.exports = router
