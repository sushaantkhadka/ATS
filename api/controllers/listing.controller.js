import Applicant from "../models/applicant.model.js";
import Listing from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
  try {
    const { title, desc, jobType, location, userId } = req.body;

    const newListing = new Listing({
      title,
      desc,
      jobType,
      location,
      userId,
    });
    await newListing.save();
    res.status(201).json({ message: "Listing Successfully created" });
  } catch (error) {
    next(error);
  }
};

export  const uploadResume = async (req, res, next) => {
  try{
    const { name, exp, uploads} = req.body;
    const {id: listingId} = req.params;
    const listing = await Listing.findById(listingId);
    const rating = 5

    const newResume = new Applicant({
      name,
      exp,
      uploads,
      rating
    })

    if(newResume) {
      listing.applicant.push(newResume._id)
      await newResume.save();
    }
    res.status(201).json({message: "Resume uploaded successfully", rating})
  } catch{
    next(error)
  }
}
