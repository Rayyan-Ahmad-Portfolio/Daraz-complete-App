import { Request, Response } from "express";
import Role from "../../models/role.model";
import Permission from "../../models/permission.model";
import * as responseHandler from "../../utils/helpers/response.helpers";
import * as validation from "../../utils/validator/role.validator";
import { ZodError } from "zod";

export const createRole = async (req: Request, res: Response) => {
  try {
    const { name, description, permissionIds } =
      await validation.createRoleSchema.parseAsync(req.body);

    const existingPermissions = await Permission.find({
      _id: { $in: permissionIds },
    });

    if (existingPermissions.length !== permissionIds.length) {
      return responseHandler.errorResponse(
        res,
        "One or more permission IDs are invalid",
        400
      );
    }

    const role = await Role.create({
      name,
      description,
      permission: permissionIds,
    });

    return responseHandler.successResponse(
      res,
      "Role created successfully",
      role,
      201
    );
  } catch (error: any) {
    if (error instanceof ZodError) {
      const messages = error.issues.map((i) => i.message).join(", ");
      return responseHandler.errorResponse(res, messages, 400);
    }

    console.error("Create Role Error:", error);
    return responseHandler.errorResponse(res, "Failed to create role", 500);
  }
};

export const getAllRoles = async (req: Request, res: Response) => {
  try {
    const roles = await Role.find().populate("permission");
    return responseHandler.successResponse(res, "Roles fetched successfully", roles);
  } catch (error: any) {
    console.error("Get Roles Error:", error);
    return responseHandler.errorResponse(res, error.message, 500);
  }
};

