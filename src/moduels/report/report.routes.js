import express from "express"
import { createReport, ctrateReport , getAllReport } from "../report/report.controller"


const router = express.Router();


router.post("/",createReport);
router.get("/",getAllReport);


export default router
