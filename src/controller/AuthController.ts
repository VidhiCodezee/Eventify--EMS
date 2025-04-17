import { Request, Response } from "express";
import { User } from "../model/userModel";
// import { signupSchema, loginSchema } from "../schema/userschema";
import {
  hashPassword,
  comparePassword,
  generateToken,
} from "../utils/authutils";

export type messageResponse = { message: string  };
export type AuthResponse = messageResponse | { token: string; success?: boolean; message?: string };
 type UserParams = {
  id: string,
  name: string;
  email: string;
  password: string;
  userId?: string; 
};
export const signup = async (
  req: Request<UserParams>,
  res: Response<AuthResponse>
)=> {
  const { name, email, password } = req.body;
  const password_hash = hashPassword(password);

  const newUser = await User.create({ name, email, password_hash });
   req.params.userId = newUser.id; 
   if (!newUser) {
    return res.status(400).json({ message: "User not created" });
       }
    
   return res.status(201).json({ message: "User Registration Successfully..." });
 
};

export const login = async ( req: Request<UserParams>,
  res: Response<AuthResponse>)=> {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user || !comparePassword(password, user.password_hash)) {
    return res.status(400).json({ message: "Invalid email or password" });
  }


  const token = generateToken(user.id);
  return res.status(200).send({
    success: true,
    message: "Login successfully",
    token: token
})
  // return res.json({ token });
};

export const getProfile = async ( req: any, res: Response) => {
  const user = await User.findByPk(req.params.userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  return res.json({ user });
};
