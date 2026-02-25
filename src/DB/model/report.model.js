import mongoose from "mongoose";
import dbconeection from "../db.connection";
import { application } from "express";


const reportSchema = new mongoose.Schema({


    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "doctor",
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true

    },

    status: {
        type: String,
        enum: ["pending", "resolved"],
        default: "pending"
    },
},
    { timestamps: true });

export default mongoose.model("report", reportSchema);

