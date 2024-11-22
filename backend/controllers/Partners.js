import mongoose from "mongoose";
import * as fs from "fs";
import PartnerModel from "../models/partnerData.js";
import cloudinary from "../config/cloudinary.js";

// const addPartner = async (req, res) => {
//   console.log("fnnfkjnfjdnjn");

//   //Upload image to Cloudinary
//   const result = cloudinary.uploader
//     .upload_stream(
//       {
//         folder: "partners",
//         resource_type: "image",
//         // format: "jpg",
//       },
//       (error, result) => {
//         if (error) return res.status(500).send({ error });
//         return res.status(500).send({ error: "Cloudinary upload failed" });
//       }
//     )
//     .end(req.file.buffer);

//   const newPartner = new PartnerModel({
//     photoUrl: result.secure_url,
//     partnerName: req.body.partnerName,
//     partnerType: req.body.partnerType,
//     contactDetails: req.body.contactDetails,
//     address: req.body.address,
//   });
//   try {
//     await newPartner.save();
//     res.json({ success: true, message: "Partner Added" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

const addPartner = async (req, res) => {
  try {
    console.log("Body:", req.body); // Log text data
    console.log("File:", req.file); // Log file data
    // Ensure the file exists
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "File is missing" });
    }

    // Upload image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "partners",
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(req.file.buffer);
    });

    // Create new partner
    const newPartner = new PartnerModel({
      photoUrl: result.secure_url,
      partnerName: req.body.partnerName,
      partnerType: req.body.partnerType,
      contactDetails: JSON.parse(req.body.contactDetails),
      address: JSON.parse(req.body.address),
    });

    await newPartner.save();
    res.status(201).json({
      success: true,
      message: "Partner added successfully",
      data: newPartner,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "An error occurred", error });
  }
};

const listPartners = async (req, res) => {
  try {
    const allPartners = await PartnerModel.find({});
    res.json({ success: true, data: allPartners });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const getPartnerById = async (req, res) => {
  try {
    const allPartners = await PartnerModel.findById(req.body.id);
    res.json({ success: true, data: allPartners });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const removePartner = async (req, res) => {
  try {
    if (req.body.id) {
      await PartnerModel.findByIdAndDelete(req.body.id);
      res.json({ success: true, message: "Partner Removed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const updatePartner = async (req, res) => {
  try {
    const { id, updateData } = req.body;

    // Ensure the ID is provided
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Partner ID is required" });
    }

    // Update the partner data
    const updatedPartner = await PartnerModel.findByIdAndUpdate(
      id,
      { $set: updateData }, // Update only the fields provided
      { new: true, runValidators: true } // Return the updated document
    );

    // If partner not found
    if (!updatedPartner) {
      return res
        .status(404)
        .json({ success: false, message: "Partner not found" });
    }

    res.json({
      success: true,
      message: "Partner Updated",
      data: updatedPartner,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error updating partner" });
  }
};

export {
  addPartner,
  listPartners,
  getPartnerById,
  removePartner,
  updatePartner,
};
