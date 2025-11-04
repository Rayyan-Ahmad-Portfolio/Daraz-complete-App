import jwt from "jsonwebtoken";
import User from "../../models/users.model";
import Role from "../../models/role.model";
import { sendEmail } from "../../utils/helpers/email.helper";

const JWT_SECRET = process.env.MY_JWT_SECRET as string;

if (!JWT_SECRET) {
  console.error("❌ JWT_SECRET is not defined in environment variables");
  process.exit(1);
}

interface JwtPayload {
  userId: string;
  name: string;
  email: string;
  role: string;
}

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  phoneNumber: string,
  roleId: any
) => {
  const existingUser = await User.findOne({ email: email.trim() });
  if (existingUser) throw new Error("User with this email already exists");

  const role = await Role.findById(roleId);
  if (!role) throw new Error("Invalid role selected");

  const user = new User({
    name: name.trim(),
    email: email.trim(),
    password,
    role: role._id,
    phoneNumber,
  });

  await user.save();

  await sendEmail(
  user.email,                      // recipient
  "Welcome to Daraz Admin System", // subject
  "account-created.views.ejs",     // template file name (must include .ejs)
  {
    username: user.name,           // ✅ define this
    email: user.email,             // ✅ define this
    year: new Date().getFullYear() // optional footer info
  }
);

  // Generate JWT
  const token = jwt.sign(
    {
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
      role: role.name,
    },
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
      role: role.name,
    },
  };
};

// 🔵 USER LOGIN
export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email: email.trim() }).populate("role");
  if (!user) throw new Error("Invalid email or password");

  const isValidPassword = await (user as any).comparePassword(password);
  if (!isValidPassword) throw new Error("Invalid email or password");

  const token = jwt.sign(
    {
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
      role: (user.role as any).name,
    },
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
      role: (user.role as any).name,
    },
  };
};
