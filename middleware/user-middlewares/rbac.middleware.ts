import { Request, Response, NextFunction } from "express";
import Role from "../../models/role.model";
import Permission from "../../models/permission.model";

interface AuthenticatedRequest extends Request {
  user?: any;
}


export const authorizeUser =
  (requiredPermissions: string[]) =>
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user)
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized - no user info" });

   
      const populatedUser = await user.populate({
        path: "role",
        populate: {
          path: "permission",
          model: "Permission",
        },
      });

      const userPermissions: string[] = [];
      populatedUser.role.forEach((r: any) => {
        r.permission.forEach((p: any) => {
   
          p.actions.forEach((action: string) => {
            userPermissions.push(`${p.module}:${action}`);
          });
        });
      });

  
      const hasPermission = requiredPermissions.every((perm) =>
        userPermissions.includes(perm)
      );

      if (!hasPermission) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: insufficient permissions",
        });
      }

      next();
    } catch (error) {
      console.error("RBAC Authorization Error:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };
