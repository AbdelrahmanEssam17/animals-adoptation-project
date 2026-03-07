import  {postModel}  from "../../DB/model/post.model.js";
import { reportModel } from "../../DB/model/report.model.js";
import { asynchandler } from "../../utils/response/error.response.js";

export const createPost = asynchandler(async (req, res, next) => {
  try {
    const {title, content, image} = req.body;
    const post = await postModel.create({
      title,
      content,
      image,
      userID: req.userID
    });
    res.status(201).json(post);
  } catch (err) {
    return next(new Error(err.message, {cause: 500}));
  }
});

export const getAllPosts = asynchandler(async (req, res, next) => {
  try {
    const posts = await postModel.find()
      .populate("userID", "username")
      .sort({ timestamp: -1 });
    res.status(200).json({ message: "Success", posts });
  } catch (err) {
    return next(new Error(err.message, {cause: 500}));
  }
});

export const getPostByID = asynchandler(async (req, res, next) => {
  try {
    const post = await postModel.findById(req.params.id)
    .populate("userID", "username")
    .populate("comments.userID", "username");
    if (!post)
      return new Error("Post not found", 404);
    res.status(200).json({ message: "Success", post });
  } catch (err) {
    return next(new Error(err.message, {cause: 500}));
  }
});

export const getUserPosts = asynchandler(async (req, res, next) => {
  try {
    const posts = await postModel.find({
      userID: req.params.userId
    });
    res.status(200).json({ message: "Success", posts });
  } catch (err) {
    return next(new Error(err.message, {cause: 500}));
  }
});

export const deletePost = asynchandler(async (req, res, next) => {
  try {
    await postModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    return next(new Error(err.message, {cause: 500}));
  }
});

export const updatePost = asynchandler(async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const post = await postModel.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    res.status(200).json({ message: "Success", post });
  } catch (err) {
    return next(new Error(err.message, {cause: 500}));
  }
});

export const toggleLike = asynchandler(async (req, res, next) => {
  try {
    const post = await postModel.findById(req.params.id);
    const userId = req.user.id;
    const index = post.likes.indexOf(userId);
    if (index === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(index, 1);
    }
    post.totalLikes = post.likes.length;
    await post.save();
    res.status(200).json({ message: "Success", post });
  } catch (err) {
    return next(new Error(err.message, {cause: 500}));
  }
});

export const toggleSave = asynchandler(async (req, res, next) => {
  try {
    const post = await postModel.findById(req.params.id);
    const userId = req.user.id;
    const index = post.saves.indexOf(userId);
    if (index === -1) {
      post.saves.push(userId);
    } else {
      post.saves.splice(index, 1);
    }
    post.totalSaves = post.saves.length;
    await post.save();
    res.status(200).json({ message: "Success", post });
  } catch (err) {
    return next(new Error(err.message, {cause: 500}));
  }
});

export const addComment = asynchandler(async (req, res, next) => {
  try {
    const post = await postModel.findById(req.body.postId);
    post.comments.push({
      content: req.body.content,
      userID: req.user.id
    });
    await post.save();
    res.status(201).json({ message: "Success", post });
  } catch (err) {
    return next(new Error(err.message, {cause: 500}));
  }
});

export const reportPost = asynchandler(async (req, res, next) => {
  const { reason, details } = req.body;
  const userId = req.user.id;
  const postId = req.params.id;
  const post = await postModel.findById(postId);
  if (!post) {
    return next(new Error("Post not found", { cause: 404 }));
  }
  const existingReport = await reportModel.findOne({
    reporter: userId,
    targetId: postId,
    onModel: "Posts"
  });
  if (existingReport) {
    return next(new Error("You already reported this post", { cause: 400 }));
  }
  const report = await reportModel.create({
    reason,
    details,
    reporter: userId,
    onModel: "Posts",
    targetId: postId
  });
  res.status(201).json({
    message: "Post reported successfully",
    report
  });
});