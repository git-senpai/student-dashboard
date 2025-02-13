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
  dateOfBirth: Joi.date(),
  gender: Joi.string().valid('male', 'female', 'other'),
  phoneNumber: Joi.string(),
  address: Joi.object({
    street: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    country: Joi.string(),
    zipCode: Joi.string(),
  }),
  education: Joi.object({
    degree: Joi.string(),
    institution: Joi.string(),
    graduationYear: Joi.number(),
    major: Joi.string(),
  }),
  interests: Joi.array().items(Joi.string()),
  skills: Joi.array().items(Joi.string()),
  bio: Joi.string().max(500),
  socialLinks: Joi.object({
    linkedin: Joi.string().uri(),
    twitter: Joi.string().uri(),
    github: Joi.string().uri(),
  }),
  profilePicture: Joi.string().uri(),
  preferredLanguage: Joi.string(),
  timezone: Joi.string(),
}).min(1);

module.exports = {
  registerSchema,
  loginSchema,
  updateProfileSchema,
};
