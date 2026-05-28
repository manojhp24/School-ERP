import { ApiResponse } from "../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";

import {
  createStudentService,
  getAllStudentService,
  deleteStudentService,
  restoreStudentService,
  updateStudentAdmissionService,
  getStudentByIdService,
} from "../services/index.js";

const studentAdmission = asyncHandler(async (req, res) => {
  const result = await createStudentService(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, result, "Student Admitted successfully"));
});

const getAllStudents = asyncHandler(async (req, res) => {
  const students = await getAllStudentService();

  return res
    .status(201)
    .json(new ApiResponse(201, students, "Students fetched successfully."));
});

const getStudentProfile = asyncHandler(async (req, res) => {
  const { studentId } = req.params;
  const student = await getStudentByIdService(studentId);

  return res
    .status(200)
    .json(new ApiResponse(200, student, "Student fetched successfully"));
});

const updateStudent = asyncHandler(async (req, res) => {
  const { studentId } = req.params;

  const updatedStudent = await updateStudentAdmissionService(
    studentId,
    req.body
  );
  return res
    .status(200)
    .json(new ApiResponse(200, updatedStudent, "Student updated successfully"));
});

const deleteStudent = asyncHandler(async (req, res) => {
  const { studentId } = req.params;

  const student = await deleteStudentService(studentId);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { studentId: student.id, isDeleted: student.isDeleted },
        "Student deleted successfully."
      )
    );
});

const restoreStudent = asyncHandler(async (req, res) => {
  const { studentId } = req.params;

  await restoreStudentService(studentId);
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Student restored successfully"));
});

export {
  studentAdmission,
  getAllStudents,
  deleteStudent,
  restoreStudent,
  updateStudent,
  getStudentProfile,
};
