const _ = require('module-alias/register')
const Koa = require('koa')
const KoaBody = require('koa-body')
const Router = require('koa-router')
const Cors = require('koa2-cors')
const Static = require('koa-static')
const Mount = require('koa-mount')
const Path = require('path')
const Websockify = require('koa-websocket')

const AppConfig = require('@/config/app.config')
const UserController = require('@/controller/user.controller')
const CommonMw = require('@/mw/common.mw')
const CheckMw = require('@/mw/check.mw')
const im = require('@/im')

const app = Websockify(new Koa())
const sokectUsers = []

app.use(Cors())
app.use(KoaBody())
app.use(CommonMw.globalError)
app.use(async (ctx, next) => {
  ctx.sokectUsers = sokectUsers
  await next()
})
app.use(CheckMw.checkApiSign)
app.use(CheckMw.checkUserToken)
app.use(Mount('/static', Static(Path.join(__dirname, '/static'))))

const router = new Router({ prefix: '/api' })

router.use(UserController.routes())
app.use(router.routes())
app.use(router.allowedMethods())

app.ws.use(im(sokectUsers))

app.listen(AppConfig.APP_PORT, () => {
  console.log('server is running on http://localhost:' + AppConfig.APP_PORT)
})
