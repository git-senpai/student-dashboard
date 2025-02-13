const Joi = require("joi");

const registerSchema = Joi.object({
  fullName: Joi.string().required().min(2).max(50),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(30),
  mobileNumber: Joi.string().pattern(/^[0-9]{10}$/),
  studentId: Joi.string(),
  degreeProgram: Joi.string()
    .valid("B.Tech", "B.Sc", "M.Tech", "M.Sc", "PhD", "Other")
    .required(),
  yearOfStudy: Joi.string().valid("1st", "2nd", "3rd", "4th", "5th").required(),
  universityName: Joi.string().required().min(2).max(100),
  profilePicture: Joi.string().uri().allow(""),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const updateProfileSchema = Joi.object({
  fullName: Joi.string().min(2).max(50),
  mobileNumber: Joi.string().pattern(/^[0-9]{10}$/),
  degreeProgram: Joi.string().valid(
    "B.Tech",
    "B.Sc",
    "M.Tech",
    "M.Sc",
    "PhD",
    "Other"
  ),
  yearOfStudy: Joi.string().valid("1st", "2nd", "3rd", "4th", "5th"),
  universityName: Joi.string().min(2).max(100),
  profilePicture: Joi.string().uri().allow(""),
}).min(1);

module.exports = {
  registerSchema,
  loginSchema,
  updateProfileSchema,
};
