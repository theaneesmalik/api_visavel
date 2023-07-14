

const genToken = (user) => {
  let token
  try {
    const tokenUser = {
      id: user._id,
    }
    token = jwt.sign({ user._id }, process.env.JWT_TOKEN_SECRET, {expiresIn: '1d'})
    return token
  } catch (err) {
    throw err
  }
}

module.exports = { genToken }
