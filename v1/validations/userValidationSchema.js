// const Joi = require('@hapi/joi')

// const validate = Joi.object({
//   username: Joi.string().min(3).max(30).required(),
//   email: Joi.string().email().lowercase().required(),
//   password: Joi.string().min(6).max(30).required(),
// })

// module.exports = {validate};
const Joi = require('@hapi/joi');


// Register User 
module.exports.validateUser = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).max(30).required(),
});

// and Login User
module.exports.validateLogin = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).max(30).required(),
});

// Update User
module.exports.validateUpdate = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).max(30).required(),
});

// Get User, Get Users, Delete User
// Assuming 'id' is used to identify the user
module.exports.validateId = Joi.object({
  id: Joi.string().required(),
})

// module.exports = { validateUser };