import { Router } from "express";
import { validation } from '../../middleware/validation.js'
import * as posts from './post.controller.js'
import { commentValidation, PostValidation } from "./post.validation.js";

const postRouter = Router();

postRouter.post('/new', validation(PostValidation), posts.createPost);
postRouter.get('/a', posts.getAllPosts);
postRouter.get('/p/:id', posts.getPostByID);
postRouter.get('/user/:userId',posts. getUserPosts);
postRouter.delete('/d/:id', posts.deletePost);
postRouter.patch('/u/:id', posts.updatePost);
postRouter.post('/save/:id', posts.toggleSave);
postRouter.post('/like/:id',posts. toggleLike);
postRouter.post('/comment', validation(commentValidation), posts.addComment);
postRouter.post('/report/:id', posts.reportPost);

export default postRouter;