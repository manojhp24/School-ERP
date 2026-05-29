import { ApiError } from "../../../utils/ApiError.js";
import { HTTP_STATUS } from "../../../shared/statusCodes.js";
import { ERROR_CODES } from "../../../shared/constants/errorCodes.js";
import { createStudentValidation } from "../validations/stduent.validation.js";
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteByStudentId,
  getStudentBySatsNumber,
  restoreByStudentId,
} from "../repositories/student.repository.js";
import {
  createAdmission,
  getAdmissionByStudentId,
} from "../repositories/admission.repository.js";
import { updateAdmissionByStudentId } from "../repositories/admission.repository.js";
import uploadToCloudinary from "../../../utils/uploadToCloudinary.js";

const createStudentService = async (data, file) => {
  const { student, admission } = data;
  const { error } = createStudentValidation.validate(student);

  if (error) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      "Validation failed",
      error.details.map((detail) => detail.message),
      ERROR_CODES.VALIDATION_FAILED
    );
  }

  const isStudentExists = await getStudentBySatsNumber(student.satsNumber);

  if (isStudentExists) {
    throw new ApiError(
      HTTP_STATUS.CONFLICT,
      "Student Already Exists",
      [],
      ERROR_CODES.RESOURCE_ALREADY_EXISTS
    );
  }

  if (file) {
    const uploadedImage = await uploadToCloudinary(file.buffer);
    student.personalDetails.studentImage = uploadedImage.secure_url;
  }

  const createdStudent = await createStudent(student);

  const createdAdmission = await createAdmission({
    ...admission,

    studentId: createdStudent._id,
  });

  return {
    student: createdStudent,
    admission: createdAdmission,
  };
};

const getAllStudentService = async () => {
  return await getAllStudents();
};

const getStudentProfileService = async (studentId) => {
  const student = await getStudentById(studentId);
  const admission = await getAdmissionByStudentId(studentId);
  return {
    student,
    admission,
  };
};

const updateStudentAdmissionService = async (studentId, data) => {
  const { student, admission } = data;
  const existingStudent = await getStudentById(studentId);

  if (!existingStudent) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Student not found");
  }

  let updatedStudent = null;
  let updatedAdmission = null;

  if (student) {
    updatedStudent = await updateStudentById(studentId, student);
  }

  if (admission) {
    updatedAdmission = await updateAdmissionByStudentId(studentId, admission);
  }

  return {
    student: updatedStudent,
    admission: updatedAdmission,
  };
};

const deleteStudentService = async (studentId) => {
  const student = await getStudentById(studentId);

  if (!student) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Student not found");
  }

  return await deleteByStudentId(studentId);
};

const restoreStudentService = async (studentId) => {
  const student = await getStudentById(studentId);

  if (!student) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Student not found");
  }

  return await restoreByStudentId(studentId);
};

export {
  createStudentService,
  getAllStudentService,
  deleteStudentService,
  restoreStudentService,
  updateStudentAdmissionService,
  getStudentProfileService,
};
