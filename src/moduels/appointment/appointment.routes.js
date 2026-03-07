import Router from "express"
const router=Router()
import * as appointetmentservice from './appointment.controller.js'


router.post('/bookappointment',appointetmentservice.addAppointment)
 router.post ('/bookappointment/:id',appointetmentservice.bookAppointment)
router.get('/getallappointment',appointetmentservice.getAllAppointments)
 router.delete('/deleteappointment/:id',appointetmentservice.deleteAppointment)

export default router