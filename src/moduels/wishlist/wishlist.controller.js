
// import { usermodel } from "../../DB/model/user.model.js";
// import { shopModel } from "../../DB/model/shop.model.js";


// // Add product to wishlist
// export const addToWishlist = async (req, res, next) => {
//   try {
//     const { productId } = req.body;

//     const user = await usermodel.findByIdAndUpdate(
//       req.user._id,
//       { $addToSet: { wishlist: productId } },
//       { new: true }
//     ).populate("wishlist");

//     if (!user) return res.status(404).json({ message: "User not found" });

//     return res.status(200).json({
//       message: "Product added to wishlist",
//       wishlist: user.wishlist,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Remove product from wishlist
// export const removeFromWishlist = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const user = await usermodel.findByIdAndUpdate(
//       req.user._id,
//       { $pull: { wishlist: id } },
//       { new: true }
//     ).populate("wishlist");

//     if (!user) return res.status(404).json({ message: "User not found" });

//     return res.status(200).json({
//       message: "Product removed from wishlist",
//       wishlist: user.wishlist,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Get all wishlist items
// export const getAllWishlist = async (req, res, next) => {
//   try {
//     const user = await usermodel.findById(req.user._id).populate("wishlist");

//     if (!user) return res.status(404).json({ message: "User not found" });

//     return res.status(200).json({
//       message: "Wishlist fetched successfully",
//       wishlist: user.wishlist,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
import { wishlistModel } from "../../DB/model/withlist.model.js";

export const addToWishlist = async (req, res, next) => {
  try {
    const { productId, guestId } = req.body;

    if (!guestId) return res.status(400).json({ message: "guestId is required" });

    let wishlist = await wishlistModel.findOne({ guestId });

    if (!wishlist) {
      wishlist = await wishlistModel.create({ guestId, products: [productId] });
    } else {
      wishlist.products.addToSet(productId);
      await wishlist.save();
    }
    
    return res.status(200).json({
      message: "Product added to wishlist",
      wishlist: wishlist.products,
    });
  } catch (error) {
    next(error);
  }
};

export const removeFromWishlist = async (req, res, next) => {
  try {
    const { guestId, productId } = req.body;

    if (!guestId || !productId) return res.status(400).json({ message: "guestId and productId are required" });

    const wishlist = await wishlistModel.findOne({ guestId });
    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

    wishlist.products.pull(productId);
    await wishlist.save();

    return res.status(200).json({
      message: "Product removed from wishlist",
      wishlist: wishlist.products,
    });
  } catch (error) {
    next(error);
  }
};

export const getWishlist = async (req, res, next) => {
  try {
    const { guestId } = req.params;
    if (!guestId) return res.status(400).json({ message: "guestId is required" });

    const wishlist = await wishlistModel.findOne({ guestId }).populate("products");
    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

    return res.status(200).json({
      message: "Wishlist fetched successfully",
      wishlist: wishlist.products,
    });
  } catch (error) {
    next(error);
  }
};