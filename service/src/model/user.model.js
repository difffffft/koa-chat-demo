const Sequelize = require('sequelize');
const db = require('@/db');

User = db.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    age: {
      type: Sequelize.TINYINT,
      defaultValue: 20,
    },
    gender: {
      type: Sequelize.ENUM(['男', '女', '妖']),
      defaultValue: '妖',
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'create_date',
    updatedAt: 'update_date',
  }
);

// User.sync({ force: true });

module.exports = User;
