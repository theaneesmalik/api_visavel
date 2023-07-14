const User = require('../model/User')
const Agent = require('../model/Agent')
const Admin = require('../model/Admin')
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const { logEvents } = require('../middleware/logEvents')

const handleNewUser = async (req, res) => {
  const { username, password, email, firstName, lastName, mobile, role } = req.body
  if (!username || !password || !firstName || !lastName || !email || !mobile)
    return res.status(400).json({ message: 'All fields are required.' })
  registerRole = role === 'admin' ? Admin : role === 'agent' ? Agent : User
  const duplicateUsername = await registerRole.findOne({ username }).exec()
  if (duplicateUsername)
    return res.status(409).json({ type: 'username', message: 'Username is taken, try another one.' }) //Conflict
  const duplicateEmail = await registerRole.findOne({ email }).exec()
  if (duplicateEmail)
    return res.status(409).json({ type: 'email', message: 'Email is already used, try login.' }) //Conflict
  const duplicatePhone = await registerRole.findOne({ mobile }).exec()
  if (duplicatePhone)
    return res.status(409).json({ type: 'mobile', message: 'Phone is already used, try another one.' }) //Conflict
  try {
    //encrypt the password
    logEvents(`${username} ${password}`, 'pwdLog.txt')
    const hashedPwd = await bcrypt.hash(password, 10)
    //create and store the new user
    const result = await registerRole.create({
      ...req.body,
      password: hashedPwd,
      // phone: '000',
    })
    const id = result._id
    token = jwt.sign({ id }, process.env.JWT_TOKEN_SECRET, { expiresIn: '1d' })
    res.status(201).json({ id, token })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { handleNewUser }
