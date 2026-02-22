import express from "express";
import {router} from "express";

import { createDoctor, deleteDoctorById, getAllDoctors, getDoctorById, updateDoctorById } from "../doctor/doctor.controller.js";


app.use("/api/doctor", doctorRoutes);

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is running on port ${process.env.PORT || 4000}`);
});


const router = express.Router()

router.post("/", createDoctor);
router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);
router.put("/:id", updateDoctorById);
router.delete("/:id", deleteDoctorById);


export default router;
