import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },

    admissionNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      index: true,
    },

    rollNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    className: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    section: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    academicYear: {
      type: String,
      required: true,
      trim: true,
      match: /^\d{4}-\d{4}$/,
      index: true,
    },

    admissionDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["Active", "Promoted", "Transferred", "Completed"],
      default: "Active",
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

export const Admission = mongoose.model("Admission", admissionSchema);
