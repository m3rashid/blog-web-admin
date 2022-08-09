const initValidator = (schema) => async (req, res, next) => {
  await schema.validateAsync({ ...req.body })
  next()
}

module.exports = {
  initValidator,
}
