const route = require('koa-route')

const users = {}
console.log('服务器共' + Object.keys(users).length + '人在线')

module.exports = route.all('/:id', function (ctx) {
  let person = ctx.path

  //用户上线
  users[person] = ctx.websocket

  for (key in users) {
    if (key === person) {
    }
  }

  console.log(person + '上线了')
  console.log('服务器共' + Object.keys(users).length + '人在线')

  ctx.websocket.on('message', function (buf) {
    //参数传递
    let res = JSON.parse(buf.toString('utf-8'))

    //谁应该接收到消息
    users['/' + res.to].send(res.msg)
  })
  ctx.websocket.on('close', function (buf) {
    //用户下线
    delete users[person]
    console.log('用户:' + person + '已下线')
  })
})
