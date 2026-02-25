import { Router } from "express";
import { addReview,getDoctorReview,deleteReview } from "../review/review.controller.js"
import { protect } from "../middlewares"

const router = Router();

router.post ("/:doctorId",protect,addReview);
router.get ("/:doctorId",getDoctorReview);
router.delete ("/:id",protect,deleteReview);

export default router;