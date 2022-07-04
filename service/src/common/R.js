class R {
  static success(msg, data) {
    return {
      code: 1,
      msg,
      data,
    }
  }
  static error(msg) {
    return {
      code: 0,
      msg,
      data: null,
    }
  }
}

module.exports = R