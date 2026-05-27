// admission.service.js

import { ApiError } from "../../../utils/ApiError.js";

import { HTTP_STATUS } from "../../../shared/statusCodes.js";

import { createAdmissionValidation } from "../validations/admission.validation.js";

import {
  createAdmission,
  getAllAdmissions,
  findAdmissionByNumber,
  getAdmissionByStudentId,
} from "../repositories/admission.repository.js";

import { getStudentById } from "../repositories/student.repository.js";

const createAdmissionService = async (data) => {
  const { error } = createAdmissionValidation.validate(data);

  if (error) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      "Validation failed.",
      error.details.map((detail) => detail.message)
    );
  }

  const student = await getStudentById(data.studentId);

  if (!student) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Student not found.");
  }

  const existingAdmission = await findAdmissionByNumber(data.admissionNumber);

  if (existingAdmission) {
    throw new ApiError(HTTP_STATUS.CONFLICT, "Admission already exists.");
  }

  return await createAdmission(data);
};

const getAllAdmissionsService = async () => {
  return await getAllAdmissions();
};

const getAdmissionByStudentIdService = async (studentId) => {
  const admissionData = await getAdmissionByStudentId(studentId);
  if (!admissionData) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      "Student admission Data not found"
    );
  }
  return admissionData;
};

export {
  createAdmissionService,
  getAllAdmissionsService,
  getAdmissionByStudentIdService,
};
