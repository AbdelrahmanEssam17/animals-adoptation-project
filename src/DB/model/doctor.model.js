import mongoose from "mongoose";

const contactInfoSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique:true
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
});

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    specialization: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    contactInfo: {
      type: contactInfoSchema,
      required: true,
    },
    availability: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    location: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    price: {
      type: Number,
      min: 0,
      default: 0,
    },
    image: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

export const doctor = mongoose.model("Doctor", doctorSchema);