import mongoose from "mongoose";

const listing = new mongoose.Schema(
  {
    userId:
      {
        type: String,
        required: true,
      },
    title:
      {
        type: String,
        required: true,
      },
    desc:
      {
        type: String,
        required: true,
      },
    companyName:
      {
        type: String,
        required: true,
      },
    jobType:
      {
        type: String,
        required: true,
      },
    location:
      {
        type: String,
        required: true,
      },
    applicant: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Applicant",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listing);

export default Listing;
