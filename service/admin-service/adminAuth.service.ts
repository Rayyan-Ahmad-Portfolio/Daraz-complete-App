import jwt from 'jsonwebtoken';
import Admin, { IAdmin } from "../../models/admin.model";
import { ROLE_PERMISSIONS } from "../../utils/constants/admin.role.constants";
import { sendEmail } from "../../utils/helpers/email.helper";


const JWT_SECRET = process.env.MY_JWT_SECRET as string;

if (!JWT_SECRET) {
  console.error("❌ JWT_SECRET is not defined in environment variables");
  process.exit(1);
}

interface JwtPayload {
  userId: string;
  username: string;
}


export const registerUser = async (username: string, email: string, password: string, role: keyof typeof ROLE_PERMISSIONS) => {
  const existingUser = await Admin.findOne({ username: username.trim() });
  if (existingUser) throw new Error("Username already exists");

  const permissions = ROLE_PERMISSIONS[role];

  const user = new Admin({
    username: username.trim(),
    email: email.trim(),
    password,
    role,
    permissions,
  });

  await user.save();
await sendEmail(
  user.email,
  "Welcome to Daraz Admin Portal!",
  "account-created.views.ejs",
  { username: user.username, email: user.email }
);
  const token = jwt.sign(
    { userId: user._id.toString(), username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "24h" }
  );

  return {
    bearer_token: token,
    token_type: "Bearer",
    expires_in: "24 hours",
    user: {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
    },
  };
};

export const loginUser = async (username: string, password: string) => {
  const user: IAdmin | null = await Admin.findOne({ username: username.trim() });
  if (!user) throw new Error("Invalid credentials");

  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) throw new Error("Invalid credentials");

  const token = jwt.sign(
  { userId: user._id.toString(), username: user.username, role: user.role },
  JWT_SECRET,
  { expiresIn: "24h" }
);

return {
  bearer_token: token,
  token_type: "Bearer",
  expires_in: "24 hours",
  user: {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    role: user.role,
    permissions: user.permissions,
  },
};
};