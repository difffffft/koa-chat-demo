const Router = require('koa-router')
const Multer = require('@koa/multer')
const R = require('@/common/R')
const CommonMw = require('@/mw/common.mw')
const ValidatorMw = require('@/mw/validator.mw')
const CheckMw = require('@/mw/check.mw')
const Upload = Multer()
const userService = require('@/service/user.service')
const path = require('path')
const fs = require('fs')
const FileUtil = require('@/util/file.util')
const TokenUtil = require('@/util/token.util')
const { v4: uuidv4 } = require('uuid')

const router = new Router({ prefix: '/user' })

router.post('/register', CommonMw.encryptPwd, async (ctx, next) => {
  const { userEmail: email, username = email, password } = ctx.request.body
  const res = await userService.addUser(email, username, password)
  ctx.body = R.success('用户注册成功', res)
})

router.post(
  '/login',
  CheckMw.checkUserExist,
  CommonMw.createToken,
  async (ctx, next) => {
    let res = ctx.request.body
    delete res['password']
    ctx.body = R.success('登录成功', res)
  },
)

router.post('/search', async (ctx, next) => {
  let { email } = ctx.request.body
  const res = await userService.searchUser(email)
  ctx.body = R.success('搜索完成', res)
})

router.post('/add/firend', async (ctx, next) => {
  let { token } = ctx.request.header
  let { to } = ctx.request.body
  let self = TokenUtil.parse(token)
  try {
    ctx.sokectUsers['/' + to].send(`${self.email}向你发起了好友申请`)
  } catch (error) {}
  ctx.body = R.success('已向好友发起邀请', null)
})

router.post('/token', async (ctx, next) => {
  ctx.body = R.success('token测试成功', null)
})

router.post('/upload/image', Upload.single('file'), async (ctx, next) => {
  let { originalname: fileName } = ctx.file
  let ednname = path.extname(fileName)
  fileName = uuidv4() + ednname
  let filePath = path.join(__dirname, `../static/images/${fileName}`)
  FileUtil.mkdirsSync(path.dirname(filePath))
  fs.writeFileSync(filePath, ctx.file.buffer)
  ctx.body = R.success('图片上传成功', `/static/images/${fileName}`)
})

module.exports = router
