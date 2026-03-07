import { Router } from "express";
import { validation } from '../../middleware/validation.js'
import * as posts from './post.controller.js'
import { commentValidation, PostValidation } from "./post.validation.js";
import { auth } from "../../middleware/auth.middleware.js";

const postRouter = Router();

postRouter.post('/new', auth, validation(PostValidation), posts.createPost);
postRouter.get('/a', posts.getAllPosts);
postRouter.get('/p/:id', posts.getPostByID);
postRouter.get('/user/:userId',posts. getUserPosts);
postRouter.delete('/d/:id', posts.deletePost);
postRouter.patch('/u/:id', posts.updatePost);
postRouter.post('/save/:id', auth, posts.toggleSave);
postRouter.post('/like/:id', auth, posts. toggleLike);
postRouter.post('/comment', auth, validation(commentValidation), posts.addComment);
postRouter.post('/report/:id', auth, posts.reportPost);

export default postRouter;