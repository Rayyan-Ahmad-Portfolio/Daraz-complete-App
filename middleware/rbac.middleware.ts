import { Request, Response, NextFunction } from "express";
import { ROLE_PERMISSIONS } from "../utils//constants/admin.role.constants";

interface AuthenticatedRequest extends Request {
  admin?: any;
}

export const authorize =
  (requiredPermissions: string[]) =>
  (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const admin = req.admin;

      if (!admin)
        return res.status(401).json({ message: "Unauthorized - no admin info" });

      const adminPermissions = ROLE_PERMISSIONS[admin.role as keyof typeof ROLE_PERMISSIONS] || [];
      const hasPermission = requiredPermissions.every((perm) =>
        adminPermissions.includes(perm)
      );

      if (!hasPermission)
        return res.status(403).json({ message: "Forbidden: insufficient permissions" });

      next();
    } catch (error) {
      console.error("RBAC Error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
