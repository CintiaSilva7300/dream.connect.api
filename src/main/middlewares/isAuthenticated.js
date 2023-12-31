const jwt = require('jsonwebtoken')

module.exports = function isAuthenticated(req, res, next) {
  const bearerToken = req.headers?.authorization
  if (bearerToken) {
    const token = bearerToken.split(' ')[1]
    const decodeToken = jwt.decode(token)
    req.email = decodeToken.email
    req.userCode = decodeToken.code
    req.name = decodeToken.name
    next()
  } else {
    return res.status(401).json({ message: 'Usuario não autorizado' })
  }
}
