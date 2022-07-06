const route = require('koa-route')

module.exports = (sokectUsers) => {
  return route.all('/:email', function (ctx) {
    let person = ctx.path
    sokectUsers[person] = ctx.websocket
    console.log(person + '上线了')
    console.log('服务器共' + Object.keys(sokectUsers).length + '人在线')

    ctx.websocket.on('message', function (buf) {
      //参数传递
      let res = JSON.parse(buf.toString('utf-8'))
      //谁应该接收到消息
      sokectUsers['/' + res.to].send(res.msg)
    })
    ctx.websocket.on('close', function (buf) {
      //用户下线
      delete sokectUsers[person]
      console.log('用户:' + person + '已下线')
    })
  })
}
