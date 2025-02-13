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
