const User = require('@/entity/User');

class UserService {
  async addUser(username, password) {
    const res = await User.create({
      username,
      password,
    });
    return res;
  }

  /**
   * 查找当前用户
   * @param {*} username
   * @param {*} password
   * @returns
   */
  async findOne(username, password) {
    const res = await User.findOne({
      where: {
        username,
      },
    });
    return res;
  }
}

module.exports = new UserService();
