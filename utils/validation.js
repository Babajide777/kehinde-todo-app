const Joi = require("joi");

const validateTodo = async (body) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      date: Joi.date().required(),
    });
    return await schema.validateAsync(body, { abortEarly: false });
  } catch (err) {
    return err;
  }
};

const validateId = async (field) => {
  const schema = Joi.object({
    id: Joi.string().required().length(24),
  });
  try {
    return await schema.validateAsync(field, { abortEarly: false });
  } catch (err) {
    return err;
  }
};

module.exports = {
  validateTodo,
  validateId,
};
