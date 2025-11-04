import Permission, { IPermission } from "../../models/permission.model";

export const createPermission = async (
  module: string,
  actions: string[],
  description: string
): Promise<IPermission> => {
  const permission = new Permission({ module, actions, description });
  return await permission.save();
};

export const getPermissions = async (): Promise<IPermission[]> => {
  return await Permission.find();
};

export const updatePermission = async (permissionId: string, data: any) => {
  const permission = await Permission.findOneAndUpdate(
    { _id: permissionId },   
    data,
    { new: true }           
  );
  if (!permission) throw new Error("Permission not found or unauthorized");
  return permission;
};


export const deletePermission = async (permissionId: string) => {
  
   const contact = await Permission.findOneAndDelete({ _id: permissionId });
  if (!contact) throw new Error("Permission not found or unauthorized");
  return contact;
};
