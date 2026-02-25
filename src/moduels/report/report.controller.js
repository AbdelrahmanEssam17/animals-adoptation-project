import { populate } from "dotenv";
import report from "../model/report.model.js"


export const createReport = async (req, res) => {

    const report = await report.create({
        doctor: req.body.doctor,
        user: req.user.id_,
        reason: req.body.reason
    })
    res.status(201).json({ message: "Report submitted successfully", report });
};


// to admin


export const getAllReport = async (req, res) => {
    const report = await report.find
    populate("doctor", "name")
    populate.apply("user", "name")

    res.json(report)
};

