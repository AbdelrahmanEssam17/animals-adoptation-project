import doctor from "../models/doctor.model.js";

// create +

export const createDoctor = async (req, res) => {
    const newDoctor = await doctor.create(req.body)
    return res.status(201).json({ message: "Doctor created successfully", doctor: newDoctor })
}

// get all

export const getAllDoctors = async (req, res) => {
    const doctors = await doctor.find()
    return res.status(200).json({ message: "Doctors retrieved successfully", doctors })
}

// get one by id 

export const getDoctorById = async (req, res) => {
    const { id } = req.params;
    const doctor = await doctor.findById(id);
    if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
    }
    return res.status(200).json({ message: "Doctor retrieved successfully", doctor });
}

// update by id

export const updateDoctorById = async (req, res) => {
    const { id } = req.params;
    const updatedDoctor = await doctor.findByIdAndUpdate
    (id, req.body, { new: true });
    if (!updatedDoctor) {
        return res.status(404).json({ message: "Doctor not found" });
    }
    return res.status(200).json({ message: "Doctor updated successfully", doctor: updatedDoctor });
}

// delete by id

export const deleteDoctorById = async (req, res) => {
    const { id } = req.params;
    const deletedDoctor = await doctor.findByIdAndDelete(id);
    if (!deletedDoctor) {
        return res.status(404).json({ message: "Doctor not found" });
    }
    return res.status(200).json({ message: "Doctor deleted successfully" });
};


