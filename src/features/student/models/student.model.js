import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    lastName: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    satsNumber: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      match: /^[0-9]{9}$/,
      index: true,
    },

    parentDetails: {
      fatherName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
      },

      motherName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
      },

      fatherContactNumber: {
        type: String,
        required: true,
        trim: true,
        match: /^[0-9]{10}$/,
      },

      motherContactNumber: {
        type: String,
        trim: true,
        match: /^[0-9]{10}$/,
      },
    },

    personalDetails: {
      gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
      },

      dateOfBirth: {
        type: Date,
        required: true,
      },

      studentImage: {
        type: String,
        trim: true,
      },
    },

    addressDetails: {
      addressLine: {
        type: String,
        trim: true,
        maxlength: 500,
      },

      village: {
        type: String,
        trim: true,
        maxlength: 100,
      },

      taluk: {
        type: String,
        trim: true,
        maxlength: 100,
      },

      district: {
        type: String,
        trim: true,
        maxlength: 100,
      },

      state: {
        type: String,
        trim: true,
        maxlength: 100,
        default: "Karnataka",
      },

      pincode: {
        type: String,
        trim: true,
        match: /^[0-9]{6}$/,
      },
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Student = mongoose.model("Student", studentSchema);
