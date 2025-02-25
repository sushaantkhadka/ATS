import Applicant from "../models/applicant.model.js";
import Listing from "../models/listing.model.js";
import axios from "axios";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

export const createListing = async (req, res, next) => {
  try {
    const { title, desc, jobType, companyName, location, userId } = req.body;

    const newListing = new Listing({
      title,
      desc,
      jobType,
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
    const { name, exp, pdfUrl, rating } = req.body;
    const { id: listingId } = req.params;
    const listing = await Listing.findById(listingId);
    console.log(listing);
    


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

    console.log(extractedText);
    

    // const compare = await axios.post("http://127.0.0.1:5000", {jd: listing.desc, resume: extractedText})

    // console.log(compare);
    


    // save applicant da ta to database 
    const newResume = new Applicant({
      name,
      exp,
      pdfUrl,
      rating,
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

export const getApplicant = async (req, res) => {
  try {
    const { id: jobId } = req.params;

    const listing = await Listing.findById(jobId).populate("applicant");
    console.log(listing.applicant);
    res.status(201).json(listing.applicant);
  } catch (error) {
    next(error);
  }
};

export const testPdfParse = async (req, res, next) => {
  try {
    const pdfUrl = "https://ucarecdn.com/943daeed-7c1e-4ecc-9794-1017443db547/";
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

    console.log("Extracted Text:", extractedText);
    res.status(200).json({ text: extractedText });

  } catch (error) {
    console.log(error);

    next(error);
  }
};
