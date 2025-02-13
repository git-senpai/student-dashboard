const Joi = require("joi");

const createApplicationSchema = Joi.object({
  programName: Joi.string().required().min(2).max(100),
  details: Joi.string().max(1000),
});

module.exports = {
  createApplicationSchema,
};
