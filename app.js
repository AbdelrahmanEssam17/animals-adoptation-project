import express from 'express';
import mongoose from 'mongoose';

import doctorRoutes from './src/modules/doctor/doctor.routes.js';
import appointmentRoutes from './src/modules/appointment/appointment.routes.js';
import favouriteRoutes from './src/modules/favourite/favourite.routes.js';
import reviewRoutes from './src/modules/review/review.routes.js';
import reportRoutes from './src/modules/report/report.routes.js';
import favouriteRoutes from "./src/moduels/favourite/favourite.routes.js"


const app = express ();

app.use("/api/doctor", doctorRoutes);
app.use("/api/favourite", favouriteRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/appointment", appointmentRoutes);

