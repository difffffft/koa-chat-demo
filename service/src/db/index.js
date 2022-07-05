const Sequelize = require('sequelize')
const DBConfig = require('@/config/db.config')

const mSequelize = new Sequelize(
  DBConfig.DB_DATABASE,
  DBConfig.DB_USERNAME,
  DBConfig.DB_PASSWORD,
  {
    host: DBConfig.DB_HOST,
    dialect: DBConfig.DB_TYPE,
    pool: {
      max: 300,
      min: 0,
    },
    timezone: '+08:00',
  },
)

mSequelize
  .authenticate()
  .then(() => {
    console.log('\x1B[32m%s\x1B[0m', '数据库连接测试成功')
  })
  .catch((err) => {
    console.log('\x1B[31m%s\x1B[0m', '数据库连接失败')
  })

module.exports = mSequelize
