const R = require('@/common/R');
const CryptoJS = require('crypto-js');
const AppConfig = require('@/config/app.config');
const Jwt = require('jsonwebtoken');

class CommonMw {
  //全局异常捕获
  static async globalError(ctx, next) {
    try {
      await next();
    } catch (error) {
      ctx.body = R.error(error.message);
    }
  }

  //给用户颁发token,用于API接口登录校验
  static async createToken(ctx, next) {
    let { id } = ctx.request.body;
    ctx.request.body.token = Jwt.sign(
      {
        id,
        time: new Date().getTime(),
      },
      AppConfig.JWT_SECRET_KEY,
      {
        expiresIn: '1d',
      }
    );
    await next();
  }

  //使用AES对用户密码进行加密
  static async encryptPwd(ctx, next) {
    let { password } = ctx.request.body;
    password = CryptoJS.AES.encrypt(
      password,
      AppConfig.USER_PASSWORD_SECRET_KEY
    ).toString();
    ctx.request.body.password = password;
    await next();
  }
}

module.exports = CommonMw;
