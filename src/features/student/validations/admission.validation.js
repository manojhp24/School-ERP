import Joi from "joi";

export const createAdmissionValidation = Joi.object({
  studentId: Joi.string(),

  admissionNumber: Joi.string().trim().uppercase().required().messages({
    "string.empty": "Admission number is required.",
  }),

  rollNumber: Joi.string().trim().required().messages({
    "string.empty": "Roll number is required.",
  }),

  className: Joi.string().trim().required().messages({
    "string.empty": "Class name is required.",
  }),

  section: Joi.string().trim().uppercase().required().messages({
    "string.empty": "Section is required.",
  }),

  academicYear: Joi.string()
    .trim()
    .pattern(/^\d{4}-\d{4}$/)
    .required()
    .messages({
      "string.empty": "Academic year is required.",

      "string.pattern.base": "Academic year format must be YYYY-YYYY.",
    }),

  admissionDate: Joi.date().max("now").messages({
    "date.base": "Admission date must be a valid date.",

    "date.max": "Admission date cannot be in future.",
  }),

  status: Joi.string()
    .valid("Active", "Promoted", "Transferred", "Completed")
    .default("Active"),
});
