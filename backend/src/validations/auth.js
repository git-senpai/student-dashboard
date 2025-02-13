const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().required().min(2).max(50),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(30),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(50).allow('', null),
  dateOfBirth: Joi.string().allow('', null),
  gender: Joi.string().valid('male', 'female', 'other').allow('', null),
  phoneNumber: Joi.string().allow('', null),
  address: Joi.object({
    street: Joi.string().allow('', null),
    city: Joi.string().allow('', null),
    state: Joi.string().allow('', null),
    country: Joi.string().allow('', null),
    zipCode: Joi.string().allow('', null),
  }).allow(null),
  education: Joi.object({
    degree: Joi.string().allow('', null),
    institution: Joi.string().allow('', null),
    graduationYear: Joi.alternatives().try(
      Joi.number().integer().min(0).max(2100),
      Joi.string().allow('', null)
    ),
    major: Joi.string().allow('', null),
  }).allow(null),
  interests: Joi.alternatives().try(
    Joi.array().items(Joi.string()),
    Joi.string()
  ).allow(null, ''),
  skills: Joi.alternatives().try(
    Joi.array().items(Joi.string()),
    Joi.string()
  ).allow(null, ''),
  bio: Joi.string().max(500).allow('', null),
  socialLinks: Joi.object({
    linkedin: Joi.string().uri().allow('', null),
    twitter: Joi.string().uri().allow('', null),
    github: Joi.string().uri().allow('', null),
  }).allow(null),
  profilePicture: Joi.string().uri(),
  preferredLanguage: Joi.string().allow('', null),
  timezone: Joi.string().allow('', null),
}).min(1);

module.exports = {
  registerSchema,
  loginSchema,
  updateProfileSchema,
};
