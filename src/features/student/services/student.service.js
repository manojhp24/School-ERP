import { ApiError } from "../../../utils/ApiError.js";
import { HTTP_STATUS } from "../../../shared/statusCodes.js";
import { ERROR_CODES } from "../../../shared/constants/errorCodes.js";
import {
  createStudentValidation,
  createAdmissionValidation,
} from "../validations/index.js";
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteByStudentId,
  getStudentBySatsNumber,
  restoreByStudentId,
  createAdmission,
  updateAdmissionByStudentId,
} from "../repositories/index.js";
import { getAdmissionByStudentIdService } from "../services/index.js";

const createStudentService = async (data) => {
  const { student, admission } = data;
  const studentValidation = createStudentValidation.validate(student);

  if (studentValidation.error) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      "Student validation failed",
      studentValidation.error.details.map((detail) => detail.message),
      ERROR_CODES.VALIDATION_FAILED
    );
  }

  const admissionValidation = createAdmissionValidation.validate(admission);

  if (admissionValidation.error) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      "Admission validation failed",
      admissionValidation.error.details.map((detail) => detail.message),
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

const getStudentByIdService = async (studentId) => {
  const student = await getStudentById(studentId);
  if (!student) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      "Student not found",
      [],
      ERROR_CODES.RESOURCE_NOT_FOUND
    );
  }
  const admission = await getAdmissionByStudentIdService(studentId);
  return { student, admission };
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
  console.log(studentId);

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
  getStudentByIdService,
};
