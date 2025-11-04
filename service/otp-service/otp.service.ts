import OTP from "../../models/otp.model";
import Admin from "../../models/admin.model";
import bcrypt from "bcryptjs";
import { generateOTP } from "../../utils/helpers/otp.helper";
import { sendEmail } from "../../utils/helpers/email.helper";

export const sendOTP = async (email: string): Promise<void> => {
  const admin = await Admin.findOne({ email });
  if (!admin) throw new Error("No admin found with this email");

  await OTP.deleteMany({ email });

  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await OTP.create({ email, code: otp, expiresAt });

await sendEmail(
  email,
  "Your OTP Code for Verification",
  "otp.view.ejs",
  { username: admin.username, otp }
);
};

export const verifyOTP = async (email: string, code: string): Promise<boolean> => {
  const otpRecord = await OTP.findOne({ email, code });
  if (!otpRecord) throw new Error("Invalid OTP");
  if (otpRecord.expiresAt < new Date()) throw new Error("OTP expired");

  otpRecord.verified = true;
  await otpRecord.save();
  return true;
};

export const resetPassword = async (email: string, newPassword: string): Promise<void> => {
  const admin = await Admin.findOne({ email });
  if (!admin) throw new Error("Admin not found");

  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(newPassword, salt);
  await sendEmail(
  email,
  "Your password has been reset",
  "reset-password.views.ejs",
  {
    username: admin.username,
    resetUrl: "https://daraz-admin.com/reset",
    dashboardUrl: "https://daraz-admin.com/dashboard"
  }
);

  await admin.save();
};
