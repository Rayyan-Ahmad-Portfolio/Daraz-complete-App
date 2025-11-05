import jwt from "jsonwebtoken";
import User from "../../models/users.model";
import Role from "../../models/role.model";
import { sendEmail } from "../../utils/helpers/email.helper";
import bcrypt from "bcrypt";


const JWT_SECRET = process.env.MY_JWT_SECRET as string;
if (!JWT_SECRET) throw new Error("❌ JWT_SECRET missing in .env");

interface JwtPayload {
  userId: string;
  name: string;
  email: string;
  roles: string[];
}

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  phoneNumber: string,
  roleNames: string[] | string,
  address?: {
    street?: string| undefined;
    city?: string | undefined;
    province?: string | undefined;
    postalCode?: string | undefined;
  }
) => {
  const existingUser = await User.findOne({ email: email.trim() });
  if (existingUser) throw new Error("User already exists");

  const roleArray = Array.isArray(roleNames) ? roleNames : [roleNames];
  const roles = await Role.find({
    name: { $in: roleArray.map((r) => new RegExp(`^${r}$`, "i")) },
  });
  if (!roles.length) throw new Error("Invalid roles provided");

  const user = new User({
    name: name.trim(),
    email: email.trim(),
    password,
    role: roles.map((r) => r._id),
    phoneNumber,
    address,
  });

  await user.save();

  await sendEmail(user.email, "Welcome!", "account-created.views.ejs", {
    username: user.name,
    email: user.email,
    year: new Date().getFullYear(),
  });

  const token = jwt.sign(
    {
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
      roles: roles.map((r) => r.name),
    } as JwtPayload,
    JWT_SECRET,
    { expiresIn: "24h" }
  );

  return {
    bearer_token: token,
    token_type: "Bearer",
    expires_in: "24 hours",
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      roles: roles.map((r) => r.name),
      address: user.address,
    },
  };
};


export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email: email.trim() }).populate("role");
  if (!user) throw new Error("Invalid email or password");

  const isValidPassword = await (user as any).comparePassword(password);
  if (!isValidPassword) throw new Error("Invalid email or password");

  const token = jwt.sign(
    {
      userId: user._id,
      
      name: user.name,
      email: user.email,
      role: (user.role as any).name,
    },
    process.env.MY_JWT_SECRET!,
    { expiresIn: "24h" }
  );

  return {
    bearer_token: token,
    token_type: "Bearer",
    expires_in: "24 hours",
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: (user.role as any).name,
    },
  };
};
