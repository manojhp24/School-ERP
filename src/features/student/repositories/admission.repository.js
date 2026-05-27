import { Admission } from "../models/admission.model.js";

const createAdmission = async (admissionData) => {
  return await Admission.create(admissionData);
};

const getAllAdmissions = async () => {
  return await Admission.find({ isDeleted: false })
    .populate("studentId")
    .sort({ createdAt: -1 });
};

const getAdmissionByStudentId = async (studentId) => {
  return await Admission.findOne({
    studentId,
    isDeleted: false,
  });
};

const getAdmissionById = async (admissionId) => {
  return await Admission.findOne({
    _id: admissionId,
    isDeleted: false,
  }).populate("studentId");
};

const updateAdmissionByStudentId = async (studentId, data) => {
  return await Admission.findOneAndUpdate(
    {
      studentId: studentId,
      isDeleted: false,
    },
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

const deleteAdmissionById = async (admissionId) => {
  return await Admission.findOneAndUpdate(
    {
      _id: admissionId,
    },
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );
};

const findAdmissionByNumber = async (admissionNumber) => {
  return await Admission.findOne({
    admissionNumber,
    isDeleted: false,
  });
};

export {
  createAdmission,
  getAllAdmissions,
  getAdmissionById,
  updateAdmissionByStudentId,
  deleteAdmissionById,
  findAdmissionByNumber,
  getAdmissionByStudentId,
};
