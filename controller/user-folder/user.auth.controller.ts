import { Response, Request } from "express";
import * as responseHandler from "../../utils/helpers/response.helpers";
import * as validation from "../../utils/validator/userauth.validator";
import * as UserAuthService from "../../service/user-service/userAuth.service";
import { ZodError } from "zod";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phoneNumber, role: roleId } =
      await validation.registerSchema.parseAsync(req.body);
console.log("Incoming role:", roleId);

    const result = await UserAuthService.registerUser(
      name,
      email,
      password,
      phoneNumber,
      roleId
    );

    // Success response
    return responseHandler.successResponse(
      res,
      "User registered successfully",
      result,
      201
    );
  } catch (error: any) {
    if (error instanceof ZodError) {
      const messages = error.issues.map((issue) => issue.message).join(", ");
      return responseHandler.errorResponse(res, messages, 400);
    }

    if (error.message === "User already exists") {
      return responseHandler.errorResponse(res, error.message, 409);
    }

    console.error("Registration error:", error);
    return responseHandler.errorResponse(
      res,
      error.message || "Internal server error",
      500
    );
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    // Validate input
    const { email, password } = validation.loginSchema.parse(req.body);

    // Authenticate
    const result = await UserAuthService.loginUser(email, password);

    return responseHandler.successResponse(
      res,
      "Login successful",
      result,
      200
    );
  } catch (error: any) {
    if (error instanceof ZodError) {
      const messages = error.issues.map((issue) => issue.message).join(", ");
      return responseHandler.errorResponse(res, messages, 400);
    }

    if (error.message === "Invalid credentials") {
      return responseHandler.errorResponse(res, "Invalid email or password", 401);
    }

    console.error("Login error:", error);
    return responseHandler.errorResponse(
      res,
      error.message || "Internal server error",
      500
    );
  }
};
