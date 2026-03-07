import { doctor } from "../../DB/model/doctor.model.js";
import { asynchandler } from "../../utils/response/error.response.js";


export const createDoctor = asynchandler(async (req, res, next) => {
  const newDoctor = await doctor.create(req.body);
  return res.status(201).json({
    message: "Doctor created successfully",
    doctor: newDoctor
  });
});


export const getAllDoctors = asynchandler(async (req, res, next) => {
  const doctors = await doctor.find();
  return res.status(200).json({
    message: "Doctors retrieved successfully",
    results: doctors.length,
    doctors
  });
});


export const getDoctorById = asynchandler(async (req, res, next) => {
  const { id } = req.params;
  const foundDoctor = await doctor.findById(id);
  if (!foundDoctor) {
    return next(new Error("Doctor not found", { cause: 404 }));
  }
  return res.status(200).json({
    message: "Doctor retrieved successfully",
    doctor: foundDoctor
  });
});


export const updateDoctorById = asynchandler(async (req, res, next) => {
  const { id } = req.params;
  const updatedDoctor = await doctor.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatedDoctor) {
    return next(new Error("Doctor not found", { cause: 404 }));
  }
  return res.status(200).json({
    message: "Doctor updated successfully",
    doctor: updatedDoctor
  });
});

export const deleteDoctorById = asynchandler(async (req, res, next) => {
  const { id } = req.params;
  const deletedDoctor = await doctor.findByIdAndDelete(id);
  if (!deletedDoctor) {
    return next(new Error("Doctor not found", { cause: 404 }));
  }
  return res.status(200).json({
    message: "Doctor deleted successfully"
  });
});