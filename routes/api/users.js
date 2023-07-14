const express = require('express')
const router = express.Router()
const {
  getAllUsers,
  updateUser,
  deleteUser,
  getUser,
  simpleUpdate,
} = require('../../controllers/usersController')
const single = require('../../middleware/molter')

router.route('/').get(getAllUsers).post(single, updateUser).put(simpleUpdate).delete(deleteUser)

router.route('/:id').get(getUser)

module.exports = router
