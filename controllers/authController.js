const User = require('../model/User')
const Agent = require('../model/Agent')
const Admin = require('../model/Admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const handleLogin = async (req, res) => {
  const { user, password, isEmail: verifyEmail, role } = req.body
  const isEmail = verifyEmail === 'true'
  if (!user || !password) return res.status(400).json({ message: 'Username and password are required.' })
  const query = isEmail ? { email: user } : { username: user }
  const authRole = role === 'admin' ? Admin : role === 'agent' ? Agent : User
  const found = await authRole.findOne(query).exec()
  if (!found) return res.status(401).json({ message: 'User does not exist!' }) //Unauthorized
  if (!found.status)
    return res.status(401).json({ message: 'Account is deactivated. Please contact support@visavel.com' })
  const match = await bcrypt.compare(password, found.password)
  if (match) {
    const id = found._id
    token = jwt.sign({ id }, process.env.JWT_TOKEN_SECRET, { expiresIn: '1d' })
    res.status(200).json({ id, token })
  } else {
    res.status(401).json({ type: 'password', message: 'Incorrect password.' })
  }
}

module.exports = { handleLogin }
