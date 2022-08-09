const { issueJWT } = require('./helpers')

const login = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) throw new Error('Missing username or password')

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json('Invalid username or password')
  }

  const token = issueJWT(username)
  return res.status(200).json({ token })
}

const getUser = async (req, res) => {
  if (req.username !== process.env.ADMIN_USERNAME) {
    return res.status(401).json('Unauthorized')
  }
  const token = issueJWT(req.username)
  return res.status(200).json({ token })
}

module.exports = {
  login,
  getUser,
}
