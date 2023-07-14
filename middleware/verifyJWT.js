const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization
  if (!authHeader?.startsWith('Bearer '))
    return res.status(401).json({ message: 'Auth Token must start with Bearer', token: authHeader })
  const token = authHeader.split(' ')[1]
  if (token === process.env.JWT_TOKEN_SECRET) next()
  else
    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Invalid / Expired token' }) //invalid token
      req.user = decoded.id
      next()
    })
}

module.exports = verifyJWT
