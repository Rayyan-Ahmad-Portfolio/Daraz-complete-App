import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../../models/users.model";
import * as responseHandler from "../../utils/helpers/response.helpers";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticator = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return responseHandler.errorResponse(res, "Access token is missing", 401);
    }

    const decoded = jwt.verify(token, process.env.MY_JWT_Secret!) as JwtPayload;
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return responseHandler.errorResponse(res, "User not found, Invalid Token", 403);
    }

    req.user = user; 
    next();
  } catch (error: any) {
    console.error("Error verifying token:", error);

    if (error.name === "JsonWebTokenError") {
      return responseHandler.errorResponse(res, "Invalid token", 403);
    }

    if (error.name === "TokenExpiredError") {
      return responseHandler.errorResponse(res, "Token has expired", 403);
    }

    return responseHandler.errorResponse(res, "Authentication failed", 500);
  }
};
