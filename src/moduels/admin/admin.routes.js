import { Router } from "express";
import { deletePost, getAllPosts, getPostByID } from "../post/post.controller.js";
import { deleteDoctorById, getAllDoctors, getDoctorById } from "../doctor/doctor.controller.js";
import { deletePet, getAllPets, getPetById } from "../pet/pet.controller.js";
import { deleteReportAndTarget, getAllReports } from "../report/report.controller.js";
import { deleteProduct, getAllProducts, getProductById } from "../shop/shop.controller.js";
import { adminVerify } from "../../middleware/admin.middleware.js";
import { changeRole } from "./admin.controller.js";

const adminRouter = Router();

// post section
adminRouter.get('/posts', adminVerify, getAllPosts);
adminRouter.get('/post/:id', adminVerify, getPostByID);
adminRouter.delete('/d/post/:id', adminVerify, deletePost);

// doctor section
adminRouter.get('/doctors', adminVerify, getAllDoctors);
adminRouter.get('/doctor/:id', adminVerify, getDoctorById);
adminRouter.delete('/d/doctor/:id', adminVerify, deleteDoctorById);

// pet section
adminRouter.get('/pets', adminVerify, getAllPets);
adminRouter.get('/pet/:id', adminVerify, getPetById);
adminRouter.delete('/d/pet/:id', adminVerify, deletePet);

// shop section
adminRouter.get('/products', adminVerify, getAllProducts);
adminRouter.get('/product/:id', adminVerify, getProductById);
adminRouter.delete('/d/product/:id', adminVerify, deleteProduct);

// report section
adminRouter.get('/reports', adminVerify, getAllReports);
adminRouter.delete('/d/report/:id', adminVerify, deleteReportAndTarget);

// user modifications
adminRouter.post('/role/:id', adminVerify, changeRole);

export default adminRouter;