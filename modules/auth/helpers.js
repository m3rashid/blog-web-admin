const fs = require('fs')
const path = require('path')
const JWT = require('jsonwebtoken')

const privateKey = fs.readFileSync(
  path.join(__dirname, './keys/private.pem'),
  'utf8'
)
const publicKey = fs.readFileSync(
  path.join(__dirname, './keys/public.pem'),
  'utf8'
)

const issueJWT = (username) => {
  const signedToken = JWT.sign({ username }, privateKey, {
    algorithm: 'RS256',
    expiresIn: '1d',
  })
  return 'Bearer ' + signedToken
}

const verifyJWT = (token) => {
  try {
    const extractedToken = token.split(' ')[1]
    const payload = JWT.verify(extractedToken, publicKey)
    return { expired: false, payload }
  } catch (err) {
    console.error({ 'Verify JWT error': err })
    return {
      expired: err.message.includes('jwt expired'),
      payload: null,
    }
  }
}

module.exports = {
  issueJWT,
  verifyJWT,
}
