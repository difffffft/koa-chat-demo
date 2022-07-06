const AppConfig = require('@/config/app.config')
const Jwt = require('jsonwebtoken')

class TokenUtil {
  static parse(token) {
    let obj = {}
    try {
      obj = Jwt.verify(token, AppConfig.JWT_SECRET_KEY)
    } catch (error) {
      console.log(error)
    }
    return obj
  }
}

module.exports = TokenUtil
