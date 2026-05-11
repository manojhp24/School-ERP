import Joi from "joi";

const registerValidationSchema = Joi.object({
  name: Joi.string().trim().min(3).required().messages({
    "string.empty": "Name is required",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Please enter valid email",
  }),

  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),
  role: Joi.string().valid("admin", "teacher", "parent").optional(),
});

const loginValidationSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({ "string.email": "Please enter valid email" }),

  password: Joi.string()
    .required()
    .messages({ "string.empty": "Password is required" }),
});

export { registerValidationSchema, loginValidationSchema };
