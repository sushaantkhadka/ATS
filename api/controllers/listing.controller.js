import Applicant from "../models/applicant.model.js";
import Listing from "../models/listing.model.js";
import axios from "axios";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

export const createListing = async (req, res, next) => {
  try {
    const { title, desc, jobType, category, companyName, location, userId } = req.body;

    const newListing = new Listing({
      title,
      desc,
      jobType,
      category,
      companyName,
      location,
      userId,
    });
    await newListing.save();
    res.status(201).json({ message: "Listing Successfully created" });
  } catch (error) {
    next(error);
  }
};

export const uploadResume = async (req, res, next) => {
  try {
    const { name, exp, pdfUrl, email, coverletter, phone } = req.body;
    const { id: listingId } = req.params;
    const listing = await Listing.findById(listingId);

    // parse pdf 
    const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });
    const pdfData = new Uint8Array(response.data);

    const loadingTask = getDocument({ data: pdfData });
    const pdfDoc = await loadingTask.promise;
    
    let extractedText = "";

    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page = await pdfDoc.getPage(i);
      const textContent = await page.getTextContent();
      extractedText += textContent.items.map(item => item.str).join(" ") + "\n";
    }    

    const compare = await axios.post("http://127.0.0.1:5000/compare", {jd: listing.desc, resume: extractedText})
    


    // save applicant da ta to database 
    const newResume = new Applicant({
      name,
      exp,
      pdfUrl,
      coverletter,
      email,
      phone,
      rating: compare.data.rating,
      resumeType: compare.data.category
    });

    if (newResume) {
      listing.applicant.push(newResume._id);
    }
    await Promise.all([listing.save(), newResume.save()]);
    res.status(201).json({ message: "Resume uploaded successfully" });
  } catch (error) {
    next(error);
  }
};

export const getApplicants = async (req, res, next) => {
  try {
    const { id: jobId } = req.params;

    const listing = await Listing.findById(jobId).populate("applicant");
    console.log(listing.applicant);
    res.status(201).json(listing.applicant);
  } catch (error) {
    next(error);
  }
};

export const getApplicant =async (req, res, next) => {
  try{
    const {id: applicantId} = req.params;
    const applicant = await Applicant.findById(applicantId);
    res.status(201).json(applicant)
  }catch(error) {
    next(error)
  }
}


export const getJobs = async (req, res, next) => {
  try {
     const listing = await Listing.find().select("-applicant")
     res.status(201).json(listing)
  } catch (error) {
    next(error)
  }
}

export const getJob = async (req, res, next) => {
  try {
    const {id: jobId} = req.params;
     const listing = await Listing.findById(jobId).select("-applicant")
     res.status(201).json(listing)
  } catch (error) {
    next(error)
  }
}


export const updateJobStatus = async (req, res, next) => {
  try {
    const { id: jobId } = req.params;
    const { status } = req.body;

    // Validate input
    if (typeof status !== "boolean") {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    // Find and update the job
    const job = await Listing.findByIdAndUpdate(
      jobId,
      { $set: { status } },
      { new: true } // Return updated document
    );

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.status(200).json({ success: true, message: "Status changed successfully" });

  } catch (error) {
    next(error);
  }
};

