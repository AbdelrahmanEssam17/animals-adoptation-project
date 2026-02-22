import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "doctor",
        required: true,
    },
}, 

{ timestamps: true });


const favouriteDoctor = mongoose.model("Favourite", favouriteSchema);

export default favouriteDoctor;





