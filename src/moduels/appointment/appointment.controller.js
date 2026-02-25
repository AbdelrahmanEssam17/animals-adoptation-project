import { populate } from "dotenv";
import appointment from "../model/appointment.model.js"
import { application } from "express";


// create appointment


export const createAppointment = async (req, res) => {
    const appointment = await appointment.create({

        doctor: req.body.doctor,
        date: req.body.date,
        time: req.body.time

    });

    res.status(201).json({ message: "Appointment booked successfully", appointment });

}


// get all user appointment


export const getUserApointment = async (req, res) => {
    const appointment = await appointment.find({
        user: req.user._id
    })
        .populate("doctor", "name")

    res.json(appointment)

}


// doctor appointment


export const getDoctorAppointment = async (req, res) => {

    const appointment = await appointment.find({
        doctor: req.params.doctorId
    })
        .populate("user", "name")

    res.json(appointment)
};


// cancel appointment 


export const cancelAppointment = async (req, res) => {
    const appointment = await (
        appointment.findByIdAndUpdate(
            req.params.id,

            { status: "cancelled" },
            { new: true }
        ));

    res.json({ message: "Appointment cancelled", appointment })

};

