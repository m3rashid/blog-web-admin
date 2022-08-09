const ratelimit = require('express-rate-limit')

const authLimit = ratelimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 20, // Limit each IP to 20 requests per `window`
  standardHeaders: true,
})

const regularLimit = ratelimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // Limit each IP to 100 requests per `window`
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
})

module.exports = {
  authLimit,
  regularLimit,
}
