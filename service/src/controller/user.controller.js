const Router = require('koa-router');
const Multer = require('@koa/multer')
const R = require('@/common/R');
const CommonMw = require('@/mw/common.mw');
const ValidatorMw = require('@/mw/validator.mw');
const CheckMw = require('@/mw/check.mw');
const Upload = Multer()
const userService = require('@/service/user.service');
const path = require("path");
const fs = require("fs");
const FileUtil = require("@/util/file.util")
const {v4: uuidv4} = require("uuid")


const router = new Router({prefix: '/user'});

router.post(
    '/register',
    ValidatorMw.passwordValidator,
    CommonMw.encryptPwd,
    async (ctx, next) => {
        const {username, password} = ctx.request.body;
        const res = await userService.addUser(username, password);
        ctx.body = R.success('新增用户成功', res);
    }
);

router.post(
    '/login',
    ValidatorMw.passwordValidator,
    CheckMw.checkUserExist,
    CommonMw.createToken,
    async (ctx, next) => {
        let res = ctx.request.body;
        delete res['password'];
        ctx.body = R.success('登录成功', res);
    }
);

router.post('/token', async (ctx, next) => {
    ctx.body = R.success('token测试成功', null);
});

router.post('/upload/image', Upload.single('file'), async (ctx, next) => {
    let {originalname: fileName} = ctx.file
    let ednname = path.extname(fileName)
    fileName = uuidv4() + ednname;
    let filePath = path.join(__dirname, `../static/images/${fileName}`)
    FileUtil.mkdirsSync(path.dirname(filePath))
    fs.writeFileSync(filePath, ctx.file.buffer);
    ctx.body = R.success('图片上传成功', `/static/images/${fileName}`);
});

module.exports = router;
