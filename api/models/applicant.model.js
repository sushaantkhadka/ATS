import mongoose from "mongoose";

const applicant = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
    rating: {
      type : String,
      required: true,
    }
  },
  { timestamps: true }
);

const Applicant = mongoose.model("Applicant", applicant);

export default Applicant;
