const Sequelize = require('sequelize')
const MySqlConfig = require('@/config/MySqlConfig')

const mSequelize = new Sequelize(
  MySqlConfig.DB_DATABASE,
  MySqlConfig.DB_USERNAME,
  MySqlConfig.DB_PASSWORD,
  {
    host: MySqlConfig.DB_HOST,
    dialect: MySqlConfig.DB_TYPE,
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
