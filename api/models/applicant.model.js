import mongoose from "mongoose";

const applicant = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    exp: {
      type: String,
      required: true,
    },
    uploads: {
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
