import { Request, Response } from "express";
import * as responseHandler from "../../utils/helpers/response.helpers";
import * as PermissionService from "../../service/user-permission-service/permission.service";
import * as validation from "../../utils/validator/permissions.validator";
import { ZodError } from "zod";

export const createPermission = async (req: Request, res: Response) => {
  try {
    const { module, actions, description } =
      await validation.createPermissionSchema.parseAsync(req.body);

    const permission = await PermissionService.createPermission(
      module,
      actions,
      description
    );

    return responseHandler.successResponse(
      res,
      "Permission created successfully",
      permission,
      201
    );
  } catch (error: any) {
    if (error instanceof ZodError) {
      const messages = error.issues.map((i) => i.message).join(", ");
      return responseHandler.errorResponse(res, messages, 400);
    }

    console.error("Create Permission Error:", error);
    return responseHandler.errorResponse(res, error.message, 500);
  }
};

export const getPermissions = async (req: Request, res: Response) => {
  try {
    const permissions = await PermissionService.getPermissions();
    return responseHandler.successResponse(
      res,
      "Permissions fetched successfully",
      permissions
    );
  } catch (error: any) {
    console.error("Get Permissions Error:", error);
    return responseHandler.errorResponse(res, error.message, 500);
  }
};


export const updatePermission = async (req: Request, res : Response) => {

try {
  const id =req.params.id as string;
   const validData = validation.updatePermissionSchema.parse(req.body);
   const updated = await PermissionService.updatePermission(id,validData);
   responseHandler.successResponse(res, "Permission Updated successfully ", updated);
} catch (error: any) {
   const message =
      error.errors?.map((e: any) => e.message).join(", ") || error.message;
    responseHandler.errorResponse(res, message, 500);
}
};

export const deletePermission = async (req: Request, res : Response) => {

try {
  const id =req.params.id as string;
  
   const deletePermission = await PermissionService.deletePermission(id);
   responseHandler.successResponse(res, "Permission deleted successfully ");
} catch (error: any) {
   const message =
      error.errors?.map((e: any) => e.message).join(", ") || error.message;
    responseHandler.errorResponse(res, message, 500);
}
};