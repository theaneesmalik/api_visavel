const Agent = require('../model/Agent.js')
const User = require('../model/User.js')
const Job = require('../model/Job.js')

async function getDashboardStats(req, res) {
  try {
    const today = new Date().setHours(0, 0, 0, 0)

    const newAgentsToday = await Agent.countDocuments({
      createdAt: { $gte: today },
    })

    const totalAgents = await Agent.countDocuments()

    const newUsersToday = await User.countDocuments({
      createdAt: { $gte: today },
    })

    const totalUsers = await User.countDocuments()

    const newJobsToday = await Job.countDocuments({
      createdAt: { $gte: today },
    })

    const totalJobs = await Job.countDocuments()

    res.json({
      newAgentsToday,
      totalAgents,
      newUsersToday,
      totalUsers,
      newJobsToday,
      totalJobs,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = { getDashboardStats }
