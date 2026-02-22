import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    contactInfo: {
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
    },
    availability: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    price : {
        type: Number,
        required: true,
    },
    image : {
        type: String,
        required: false,
    },
});


export const Doctor = mongoose.model("Doctor", doctorSchema);