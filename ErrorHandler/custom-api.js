class customApiError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    this.isOprational = true
  }
}
const AppError = (msg, statusCode) => {
  return new customApiError(msg, statusCode)
}

module.exports = { customApiError, AppError }
