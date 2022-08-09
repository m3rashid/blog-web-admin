const { verifyJWT } = require('../modules/auth/helpers')

// Global error checker
const makeSafe = (check) => (req, res, next) => {
  Promise.resolve(check(req, res, next)).catch(next)
}

const checkAuth = (req, res, next) => {
  const token = req.headers['authorization']
  if (!token) {
    return res.status(401).json('Unauthorized')
  }
  const { expired, payload } = verifyJWT(token)
  if (expired) {
    return res.status(401).json('Unauthorized')
  }
  req.username = payload?.username
  next()
}

// </endpoint> <rateLimit> <validator> <auth> <controller>

module.exports = {
  makeSafe,
  checkAuth,
}
