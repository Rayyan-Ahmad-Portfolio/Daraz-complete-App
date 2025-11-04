import Role, { IRole } from "../../models/role.model";
import Permission from "../../models/permission.model";

export const createRole = async (
  name: string,
  description: string,
  permissionIds: string[]
): Promise<IRole> => {
  const permissions = await Permission.find({ _id: { $in: permissionIds } });
  if (permissions.length !== permissionIds.length) {
    throw new Error("One or more permission IDs are invalid");
  }

  const role = new Role({ name, description, permission: permissionIds });
  return await role.save();
};

export const getAllRoles = async (): Promise<IRole[]> => {
  return await Role.find().populate("permission");
};



