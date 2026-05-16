import { Student } from "../models/student.model.js";

const createStudent = async (student) => {
  return await Student.create(student);
};

const getAllStudents = async () => {
  return await Student.find({
    isDeleted: false,
  })
    .lean()
    .sort({
      createdAt: -1,
    });
};

const getStudentById = async (studentId) => {
  return await Student.findOne({ _id: studentId, isDeleted: false });
};

const getStudentBySatsNumber = async (satsNumber) => {
  return await Student.findOne({ satsNumber: satsNumber, isDeleted: false });
};

const updateStudentById = async (studentId, data) => {
  return await Student.findOneAndUpdate(
    { _id: studentId, isDeleted: false },
    data,
    {
      returnDocument: "after",
      runValidators: true,
    }
  );
};

const deleteByStudentId = async (studentId) => {
  return await Student.findOneAndUpdate(
    { _id: studentId },
    { isDeleted: true },
    { new: true }
  );
};

const restoreByStudentId = async (studentId) => {
  return await Student.findByIdAndUpdate(
    { _id: studentId },
    { isDeleted: false },
    { new: true }
  );
};

export {
  createStudent,
  getAllStudents,
  getStudentById,
  getStudentBySatsNumber,
  updateStudentById,
  deleteByStudentId,
  restoreByStudentId,
};
