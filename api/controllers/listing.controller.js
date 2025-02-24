import Applicant from "../models/applicant.model.js";
import Listing from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
  try {
    const { title, desc, jobType,companyName, location, userId } = req.body;

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

<<<<<<< HEAD
export const uploadResume = async (req, res, next) => {
  try {
    const { name, exp, uploads, rating } = req.body;
    const { id: listingId } = req.params;
    const listing = await Listing.findById(listingId);
    
=======
export  const uploadResume = async (req, res, next) => {
  try{
    const { name, exp, uploads} = req.body;
    const {id: listingId} = req.params;
    const listing = await Listing.findById(listingId);
    const rating = 5
>>>>>>> 81c6a2dc02689b7a84955117650cbffbbb0c6bd4

    const newResume = new Applicant({
      name,
      exp,
      uploads,
<<<<<<< HEAD
      rating,
    });

    if (newResume) {
      listing.applicant.push(newResume._id);
    }
    await Promise.all([listing.save(), newResume.save()]);
    res.status(201).json({ message: "Resume uploaded successfully"});
  } catch(error) {
    next(error);
  }
};

export const getApplicant = async (req, res) => {
  try {
    const {id: jobId} = req.params;
    
    const listing = await Listing.findById(jobId).populate("applicant")
    console.log(listing.applicant);
    res.status(201).json(listing.applicant)
    
  }catch (error){
=======
      rating
    })

    if(newResume) {
      listing.applicant.push(newResume._id)
      await newResume.save();
    }
    res.status(201).json({message: "Resume uploaded successfully", rating})
  } catch{
>>>>>>> 81c6a2dc02689b7a84955117650cbffbbb0c6bd4
    next(error)
  }
}
