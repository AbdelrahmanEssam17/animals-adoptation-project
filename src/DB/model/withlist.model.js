// import mongoose, { Schema, model } from "mongoose";

// const wishlistSchema = new Schema({
//     user: {
//         type: mongoose.Schema.ObjectId,
//         ref: "User",
//         required: true,
//         unique: true
//     },
//     products: [{
//         type: mongoose.Schema.ObjectId,
//         ref: "Product"
//     }]
// }, { timestamps: true });

// export const wishlistModel = mongoose.models.Wishlist || model("Wishlist", wishlistSchema);

import mongoose, { model, Schema, Types } from "mongoose";

const wishlistSchema = new Schema({
  products: [{ type: Types.ObjectId, ref: "Product" }],
  guestId: { type: String, required: true, unique: true } // to identify the guest
}, { timestamps: true });

export const wishlistModel = mongoose.models.Wishlist || model("Wishlist", wishlistSchema);