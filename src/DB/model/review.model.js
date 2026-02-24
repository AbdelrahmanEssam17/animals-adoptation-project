import mongoose from "mongoose";

const reviewSchema = new mongoose.Schem({

    user : {
        type : mongoose.Schema.type.objectId,
        ref : "user",
        required : true 
    },

    doctor : {
        type : mongoose.Schema.type.objectId,
        ref : "doctor",
        required : true
    },

    rating : {
        type : Number,
        min : 1,
        max : 5,
        required : false
    },

    Comment : String,
},

    { timestamps : true })

    
    // don't add a review for the same doctor twice


reviewSchema.index ({ user : 1 , doctor : 1},{unique : true})

export default mongoose.model ("review", reviewSchema);

