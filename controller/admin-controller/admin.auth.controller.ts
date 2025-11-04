import { Response, Request } from "express";
import * as responseHandler from "../../utils/helpers/response.helpers";
import * as validation from "../../utils/validator/auth.validator";
import * as AuthService from "../../service/admin-service/adminAuth.service";
import { ZodError } from "zod";
import * as OTPService from "../../service/otp-service/otp.service";


export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password,role } = await validation.registerSchema.parseAsync(req.body);

    const result = await AuthService.registerUser(username, email, password , role as "superadmin" | "manager" | "support");

    return responseHandler.successResponse(
      res,
      "Admin registered successfully",
      result,
      201
    );
  } catch (error: any) {
    if (error instanceof ZodError) {
      const messages = error.issues.map((issue) => issue.message).join(", ");
      return responseHandler.errorResponse(res, messages, 400);
    }

    if (error.message === "Admin already exists") {
      return responseHandler.errorResponse(res, error.message, 409);
    }

    console.error("Registration error:", error);
    return responseHandler.errorResponse(res, error.message || "Internal server error", 500);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = validation.loginSchema.parse(req.body);

    const userData = await AuthService.loginUser(username, password);

    return responseHandler.successResponse(res, "Login successful", userData);
  } catch (error: any) {
    if (error.errors) {
      const messages = error.errors.map((e: any) => e.message).join(", ");
      return responseHandler.errorResponse(res, messages, 400);
    } else if (error.message === "Invalid credentials") {
      return responseHandler.errorResponse(res, error.message, 401);
    } else {
      console.error("Login error:", error);
      return responseHandler.errorResponse(res, "Internal server error during login", 500);
    }
  }
};

export const requestPasswordReset = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    await OTPService.sendOTP(email);
    return responseHandler.successResponse(res, "OTP sent to email");
  } catch (error: any) {
    return responseHandler.errorResponse(res, error.message, 400);
  }
};

export const resetPasswordWithOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp, newPassword } = req.body;
    await OTPService.verifyOTP(email, otp);
    await OTPService.resetPassword(email, newPassword);
    return responseHandler.successResponse(res, "Password reset successful");
  } catch (error: any) {
    return responseHandler.errorResponse(res, error.message, 400);
  }
};