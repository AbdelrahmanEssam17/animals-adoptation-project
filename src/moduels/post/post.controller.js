import Post from "../../DB/model/post.model.js";

export const createPost = async (req, res) => {
  try {
    const {title, content, image} = req.body;
    const post = await Post.create({
      title,
      content,
      image,
      userID: req.userID
    });
    res.status(201).json(post);
  } catch (err) {
    return new Error(err.message,cause,500);
  }
};

export const getAllPosts = async (req, res) => {
  try {
    if (redisClient.isOpen) {
      const cachedPosts = await redisClient.get("posts");
      if (cachedPosts) {
        console.log("Serving from cache");
        return res.status(200).json({ message: "All posts (cached)", Posts: JSON.parse(cachedPosts) });
      }
    }
    const posts = await Post.find()
      .populate("userID", "username")
      .sort({ timestamp: -1 });
    if (redisClient.isOpen) {
      await redisClient.setEx("posts", 3600, JSON.stringify(journals));
    }
    res.status(200).json({ message: "Success", posts });
  } catch (err) {
    throw new Error(err.message, 500);
  }
};

export const getPostByID = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    .populate("userID", "username")
    .populate("comments.userID", "username");
    if (!post)
      return new Error("Post not found", 404);
    res.status(200).json({ message: "Success", post });
  } catch (err) {
    throw new Error(err.message, 500);
  }
};

export const getUserPosts = async (req, res) => {
  try {
    if (redisClient.isOpen) {
      const cachedPosts = await redisClient.get("userPosts");
      if (cachedPosts) {
        console.log("Serving from cache");
        return res.status(200).json({ message: "User posts (cached)", Posts: JSON.parse(cachedPosts) });
      }
    }
    const posts = await Post.find({
      userID: req.params.userId
    });
    res.status(200).json({ message: "Success", posts });
    if (redisClient.isOpen) {
      await redisClient.setEx("userPosts", 3600, JSON.stringify(journals));
    }
  } catch (err) {
    throw new Error(err.message, 500);
  }
};

export const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted" });
    if (redisClient.isOpen) {
      await redisClient.del("posts");
    }
    if (redisClient.isOpen) {
      await redisClient.del("posts");
      await redisClient.del("userPosts");
    }
  } catch (err) {
    throw new Error(err.message, 500);
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ message: "Success", post });
    if (redisClient.isOpen) {
      await redisClient.del("posts");
      await redisClient.del("userPosts");
    }
  } catch (err) {
    throw new Error(err.message, 500);
  }
};

export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
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
    throw new Error(err.message, 500);
  }
};

export const toggleSave = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
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
    throw new Error(err.message, 500);
  }
};

export const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.body.postId);
    post.comments.push({
      content: req.body.content,
      userID: req.user.id
    });
    await post.save();
    res.status(201).json({ message: "Success", post });
  } catch (err) {
    throw new Error(err.message, 500);
  }
};

export const reportPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const userId = req.user.id;
    if (!post.reports.includes(userId)) {
      post.reports.push(userId);
    }
    await post.save();
    res.status(201).json({ message: "Post reported" });
  } catch (err) {
    throw new Error(err.message, 500);
  }
};