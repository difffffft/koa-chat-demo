const ___ = require('module-alias/register');
const Koa = require('koa');
const KoaBody = require('koa-body');
const Router = require('koa-router');
const Cors = require('koa2-cors');
const Static = require('koa-static')
const Mount = require('koa-mount')
const Path = require('path')


const AppConfig = require('@/config/AppConfig');
const UserController = require('@/controller/UserController');
const CommonMw = require('@/mw/common');
const CheckMw = require('@/mw/check');


const app = new Koa();
app.use(Cors());
app.use(KoaBody());
app.use(CommonMw.globalError);
app.use(CheckMw.checkApiSign);
app.use(CheckMw.checkUserToken);
app.use(Mount('/static', Static(Path.join(__dirname, '/static'))))


const router = new Router({prefix: '/api'});

router.use(UserController.routes());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(AppConfig.APP_PORT, () => {
    console.log('server is running on http://localhost:' + AppConfig.APP_PORT);
});
