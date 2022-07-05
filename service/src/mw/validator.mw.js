const R = require('@/common/R');

class ValidatorMw {
  //校验用户密码的格式
  static async passwordValidator(ctx, next) {
    let { password } = ctx.request.body;
    const reg = /^(?=.*[0-9].*)(?=.*[a-zA-Z].*).{6,20}$/;
    if (!reg.test(password)) {
      ctx.body = R.error('密码格式不符,应包含英文和数字');
      return;
    }
    await next();
  }
}

module.exports = ValidatorMw;
