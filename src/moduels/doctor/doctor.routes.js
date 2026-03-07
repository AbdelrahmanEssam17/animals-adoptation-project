import { Router } from "express";
import * as doctorController from "./doctor.controller.js";
import validation from "../../middleware/validation.js";
import * as doctorValidators from "./doctor.validation.js";

const router = Router();


router.post("/create", validation(doctorValidators.createDoctor), doctorController.createDoctor);
router.put("/update/:id", validation(doctorValidators.updateDoctor), doctorController.updateDoctorById);
router.get("/all", doctorController.getAllDoctors);
router.get("/:id", doctorController.getDoctorById);
router.delete("/:id", doctorController.deleteDoctorById);

export default router;