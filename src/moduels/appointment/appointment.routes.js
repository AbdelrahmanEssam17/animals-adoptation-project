
import {Router} from 'express'
import { createAppointment,getDoctorAppointment,getUserApointment,cancelAppointment } from "./appointment.controller.js";

const router=Router()


router.post ("/",createAppointment)
router.get("/my-appointments",getUserApointment)
router.get("/doctor/:doctorId",getDoctorAppointment)
router.patch("/id/cancel",cancelAppointment)


export default router;