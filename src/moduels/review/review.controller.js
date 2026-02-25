// add review

import review from "../model/review.model.js"

export const addReview = async ( req,res)=>{

const review = await review.create({
    
user : req.user.id,
doctor : req.params.doctorId,
comment : req.body.comment

});

res.status(201).json(review)
}


// get doctor reviews

export const getDoctorReview = async (req,res)=> {

const review = await review.find
doctor :req.params.doctorId.populate ("user , name")

res.json(review)

};



// delete review

export const deleteReview = async (req,res)=> {
    await review.findOneAndDelete ({
        
    id : req.param.id_,
    user : req.user.id
    })
    
    res.json({message : "Review delete"})
};


