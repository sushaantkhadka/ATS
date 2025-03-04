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
    pdfUrl: {
      type: String,
      required: true,
    },
    rating: {
      type : String,
      required: true,
    },
    resumeType: {
      type : String,
      require: true,
    },
    coverletter: {
      type: String,
      require: true
    },
    email: {
      type:String,
      require: true
    },
    phone: {
      type: String,
      require: true
    }
  },
  { timestamps: true }
);

const Applicant = mongoose.model("Applicant", applicant);

export default Applicant;
