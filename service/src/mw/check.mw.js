const R = require('@/common/R');
const userService = require('@/service/user.service');
const AppConfig = require('@/config/app.config');
const Jwt = require('jsonwebtoken');

/**
 * 接口token白名单
 */
const NO_TOKEN_API_LIST = ['/api/user/register', '/api/user/login', '/static'];
const NO_SIGN_API_LIST = ['/static'];

class CheckMw {
    //检查用户是否存在
    static async checkUserExist(ctx, next) {
        let {username, password} = ctx.request.body;
        let res = await userService.findOne(username, password);
        if (!res) {
            ctx.body = R.error('用户不存在');
            return;
        }
        ctx.request.body = res.dataValues;
        await next();
    }

    //检查接口是否加密
    static async checkApiSign(ctx, next) {
        let flag = true;
        NO_SIGN_API_LIST.forEach((v) => {
            if (
                ctx.request.url.search(v) !== -1 ||
                (ctx.request.url + '/').search(v) !== -1
            ) {
                flag = false;
            }
        });
        if (flag) {
            let {sign: bodySign} = ctx.request.body;
            let {sign: headerSign} = ctx.request.header;
            if (!bodySign && !headerSign) {
                ctx.body = R.error('接口未加密2');
                return
            }
        }
        await next();
    }

    /**
     * 检查用户token是否过期
     * 检查用户token是否有效
     */
    static async checkUserToken(ctx, next) {
        let flag = true;
        NO_TOKEN_API_LIST.forEach((v) => {
            if (
                ctx.request.url.search(v) !== -1 ||
                (ctx.request.url + '/').search(v) !== -1
            ) {
                flag = false;
            }
        });
        if (flag) {
            let {token: bodyToken} = ctx.request.body;
            let {token: headerToken} = ctx.request.header;
            if (!bodyToken && !headerToken) {
                ctx.body = R.error('用户未登录');
                return;
            }
            let token = bodyToken ? bodyToken : headerToken
            try {
                let decoded = Jwt.verify(token, AppConfig.JWT_SECRET_KEY);
                if (!decoded.id) {
                    ctx.body = R.error('用户未登录');
                    return;
                }
            } catch (error) {
                if (error.message === 'invalid signature' || error.message === "jwt malformed") {
                    ctx.body = R.error('token无效');
                    return;
                }
                if (error.message === 'jwt expired') {
                    ctx.body = R.error('token过期了,请重新登录');
                    return;
                }
                throw new Error(error.message);
            }
        }
        await next();
    }
}

module.exports = CheckMw;
