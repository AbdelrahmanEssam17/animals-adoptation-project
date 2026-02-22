import { Router } from "express";

import { toggleFavourite, getMyFavourite,} from "./favourite.controller.js";

const router = Router();

router.post("/favourite/:doctorId", toggleFavourite)
router.get("/favourite", getMyFavourite)

export default router

