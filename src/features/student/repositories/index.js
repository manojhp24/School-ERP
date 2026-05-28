export {
  createStudent,
  deleteByStudentId,
  updateStudentById,
  getAllStudents,
  getStudentById,
  getStudentBySatsNumber,
  restoreByStudentId,
} from "./student.repository.js";
export {
  createAdmission,
  deleteAdmissionById,
  findAdmissionByNumber,
  getAdmissionById,
  getAdmissionByStudentId,
  getAllAdmissions,
  updateAdmissionByStudentId,
} from "./admission.repository.js";
