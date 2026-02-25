import express from "express"
import { createAppointment,getDoctorAppointment,getUserAppointment,cancelAppointment } from "./appointment.controller";


const router = express.Router


router.post ("/",createAppointment)
router.get("/my-appointments",getUserAppointment)
router.get("/doctor/:doctorId",getDoctorAppointment)
router.patch("/id/cancel",cancelAppointment)


export default router;