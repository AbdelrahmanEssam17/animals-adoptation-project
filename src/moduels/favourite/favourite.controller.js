import favouriteDoctor from "../DB/model/favourite.model";

// add and remove favourite (toggle favourite)


export const toggleFavourite = async (req,res) => {
    const doctorId = req.params.doctorId

const userId = req.user._id

const exists = await favouriteDoctor.findOne(
    { user : userId, doctor: doctorId })
};


// if the doctor is not in the user's favourites, add it
// if the doctor is already in the user's favourites, remove it


if (exists) {
    await exists.deleteOne()
    return res.status(200).json({ message: "doctor removed from favourites" })

    const fav = await favouriteDoctor.create(
        { user: userId, doctor: doctorId }
    )
    return res.status(200).json({ message: "doctor added to favourites", fav })
};









export const getMyFavourite = async (req, res) => {
    const favourite = await favouriteDoctor.find({ userId: req.user._id }).populate("doctor")
    return res.status(200).json({ message: "success", favourite })
};
