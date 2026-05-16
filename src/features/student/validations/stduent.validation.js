import Joi from "joi";

export const createStudentValidation = Joi.object({
  firstName: Joi.string()
    .trim()
    .required()
    .messages({ "string.empty": "Firstname is required" }),
  lastName: Joi.string()
    .trim()
    .required()
    .messages({ "string.empty": "Lastname is required" }),
  satsNumber: Joi.string()
    .trim()
    .pattern(/^[0-9]{9}$/)
    .required()
    .messages({
      "string.empty": "SATS number is required",
      "string.pattern.base": "SATS number must contain exactly 9 digits ",
    }),
  personalDetails: Joi.object({
    gender: Joi.string().valid("Male", "Female").required(),
    dateOfBirth: Joi.date().required().max("now").messages({
      "date.base": "Date of birth must be a valid date.",
      "date.max": "Date of birth cannot be a future date.",
      "any.required": "Date of birth is required.",
    }),
  }),
  parentDetails: Joi.object({
    fatherName: Joi.string().trim().required(),
    motherName: Joi.string().trim().required(),
    fatherContactNumber: Joi.string()
      .trim()
      .pattern(/^[0-9]{10}$/)
      .required(),
    motherContactNumber: Joi.string()
      .trim()
      .pattern(/^[0-9]{10}$/)
      .allow("", null),
  }),
  addressDetails: Joi.object({
    addressLine: Joi.string().trim().max(500).required().messages({
      "string.empty": "Address is required.",
    }),

    village: Joi.string().trim().max(100).required().messages({
      "string.empty": "Village is required.",
    }),

    taluk: Joi.string().trim().max(100).required().messages({
      "string.empty": "Taluk is required.",
    }),

    district: Joi.string().trim().max(100).required().messages({
      "string.empty": "District is required.",
    }),

    state: Joi.string().trim().max(100).default("Karnataka"),

    pincode: Joi.string()
      .trim()
      .pattern(/^[0-9]{6}$/)
      .required()
      .messages({
        "string.pattern.base": "Pincode must contain exactly 6 digits.",

        "string.empty": "Pincode is required.",
      }),
  }),
});
