const User = require('@/model/user.model')

class UserService {
  async addUser(email, username, password) {
    if (await this.findOne(email)) {
      throw new Error('用户已存在')
    }
    const res = await User.create({
      email,
      username,
      password,
    })
    return res
  }

  async searchUser(email) {
    const res = await User.findOne({
      where: {
        email,
      },
    })
    return res
  }

  async findOne(email) {
    const res = await User.findOne({
      where: {
        email,
      },
    })
    return res
  }
}

module.exports = new UserService()
