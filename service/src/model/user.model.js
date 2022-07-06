const Sequelize = require('sequelize')
const db = require('@/db')

User = db.define(
  'user',
  {
    //主键自增
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    //用户邮箱
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    //用户昵称
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    //用户登录密码
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'create_date',
    updatedAt: 'update_date',
  },
)

User.sync({ force: true })
setTimeout(() => {
  User.create({
    email: '672228275@qq.com',
    username: '雷光银',
    password: 'U2FsdGVkX1/ZBrsNcxPEZaSc0F8PoRQjkx25ZRN9wXQ=',
  })
  User.create({
    email: '110@qq.com',
    username: '110',
    password: 'U2FsdGVkX1/ZBrsNcxPEZaSc0F8PoRQjkx25ZRN9wXQ=',
  })
  User.create({
    email: '120@qq.com',
    username: '110',
    password: 'U2FsdGVkX1/ZBrsNcxPEZaSc0F8PoRQjkx25ZRN9wXQ=',
  })
}, 300)

module.exports = User
