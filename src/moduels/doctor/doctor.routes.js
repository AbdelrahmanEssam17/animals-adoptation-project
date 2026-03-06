import express from "express";
import {Router} from "express";

import { createDoctor, deleteDoctorById, getAllDoctors, getDoctorById, updateDoctorById } from "../doctor/doctor.controller.js";

const router = Router();

router.post("/", createDoctor);
router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);
router.put("/:id", updateDoctorById);
router.delete("/:id", deleteDoctorById);


export default router;
