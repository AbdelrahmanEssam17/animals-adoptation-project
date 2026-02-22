
import { usermodel } from "../../DB/model/user.model.js";
import { asynchandler } from "../../utils/response/error.response.js";
import { generateHash } from "../../utils/security/hash.security.js";

export const signup=asynchandler (
    async(req,res,next)=>{
  const {username,email,password}=req.body
if(await usermodel.findOne({email})){
    return next(new Error("email exist",{cause:409}))
}
const hashpassword=generateHash({plainText:password})
const user=await usermodel.create({username,email,password:hashpassword})
  return res.status(200).json({message:"done",user})


})