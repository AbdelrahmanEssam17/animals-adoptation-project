import { usermodel } from "../../DB/model/user.model.js";
import { asynchandler } from "../../utils/response/error.response.js";

export const changeRole = asynchandler(async (req, res, next) => {
  const _id = req.params;
  const role = req.body;
  const user = await usermodel.findOne({ _id });
  if (!user) {
    return next(new Error("User not found", { cause: 404 }));
  }
  user.role = role;
  user.save();
  res.status(200).json({ message: "Success"});
});