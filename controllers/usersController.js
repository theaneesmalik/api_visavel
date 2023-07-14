const User = require('../model/User')
const Agent = require('../model/Agent')
const Admin = require('../model/Admin')

const getAllUsers = async (req, res) => {
  let role = req?.query?.role
  role = role === 'admin' ? Admin : role === 'agent' ? Agent : User
  const users = await role.find()
  if (!users) return res.status(204).json({ message: 'No users found' })
  res.json(users)
}

const deleteUser = async (req, res) => {
  if (!req?.body?.id) return res.status(400).json({ message: 'User ID required' })
  let role = req?.body?.role
  role = role === 'admin' ? Admin : role === 'agent' ? Agent : User
  const user = await role.findOne({ _id: req.body.id }).exec()
  if (!user) {
    return res.status(204).json({ message: `User ID ${req.body.id} not found` })
  }
  if (req?.body?.role === 'admin' && user.isSuper)
    return res.status(401).json({ message: 'Super admin profile cannot be deleted' })
  const result = await user.deleteOne({ _id: req.body.id })
  res.json(result)
}

const getUser = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ message: 'User ID required' })
  let role = req?.query?.role
  role = role === 'admin' ? Admin : role === 'agent' ? Agent : User
  const user = await role.findOne({ _id: req.params.id }).exec()
  if (!user) {
    return res.status(204).json({ message: `User ID ${req.params.id} not found` })
  }
  res.json(user)
}

const updateUser = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: 'ID parameter is required.' })
  }
  let role = req?.body?.role
  role = role === 'admin' ? Admin : role === 'agent' ? Agent : User
  let user = await role.findOne({ _id: req.body.id }).exec()
  if (!user) {
    return res.status(204).json({ message: `No user matches ID ${req.body.id}.` })
  }
  var newObj = { ...user.toObject(), ...req.body, isCemplete: true }
  if (req.file?.fieldname === 'profile') {
    newObj = { ...newObj, profile: req.file.filename }
  }
  Object.assign(user, newObj)
  const result = await user.save()
  res.json(result)
}

const simpleUpdate = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: 'ID parameter is required.' })
  }
  let role = req?.body?.role
  role = role === 'admin' ? Admin : role === 'agent' ? Agent : User

  if (req?.body?.role === 'admin') {
    const checkUser = await role.findOne({ _id: req.body.id }).exec()
    if (checkUser.isSuper && req.body.data.status === false)
      return res.status(401).json({ message: 'Super admin profile cannot be deleted or deactivated' })
  }

  const user = await role
    .findOneAndUpdate({ _id: req.body.id }, { $set: { ...req.body.data } }, { new: true })
    .exec()
  if (!user) {
    return res.status(204).json({ message: `No user matches ID ${req.body.id}.` })
  }
  res.json(user)
}
module.exports = {
  getAllUsers,
  deleteUser,
  getUser,
  updateUser,
  simpleUpdate,
}
