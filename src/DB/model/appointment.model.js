import mongoose from "mongoose"

const appointmentSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "doctor",
        required: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },

    date: {
        type: String,
        required: true
    },

    time: {

        type: String,
        required: true
    },

    statusDoctor: {

        type: String,
        enum: ["pending", "confirmed", "cancelled"],
        default: "pending",
        required: true
    },
},

{ timestamps: true });

export default mongoose.model("appointment",appointmentSchema);









