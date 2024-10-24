
import jwt from "jsonwebtoken"

export const generateUserToken=(email,userId)=>{
  const token= jwt.sign({email:email,userId},process.env.JWT_SECRET_KEY);
    return token;
};
