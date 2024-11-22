import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema(
  {
    // Partner details
    photoUrl: {
      type: String, // URL of the uploaded image
      required: true,
    },
    partnerName: {
      type: String,
      required: true,
      trim: true,
    },
    partnerType: {
      type: String,
      enum: ["Owner", "Partner", "Operations"], // Example categories, can only choose from given choices.
      default: "Partner",
    },
    contactDetails: {
      email: {
        type: String,
        unique: true,
        required: true,
        match: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, // Email validation
      },
      phone: {
        type: String,
        required: true,
      },
    },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      postalCode: { type: String },
      country: { type: String, default: "India" },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const PartnerModel =
  mongoose.model.partner || mongoose.model("partner", partnerSchema);

export default PartnerModel;
