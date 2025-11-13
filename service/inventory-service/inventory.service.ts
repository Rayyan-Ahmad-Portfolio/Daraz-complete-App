import Inventory from "../../models/inventory.model";
import mongoose from "mongoose";

export const createInventory = async (data: any) => {
  const inventory = await Inventory.create({
    ...data,
    store: new mongoose.Types.ObjectId(data.store),
    product: new mongoose.Types.ObjectId(data.product),
  });
  return inventory;
};

export const getAllInventories = async () => {
  return Inventory.find()
    .populate("store", "name")
    .populate("product", "name price");
};
export const getInventoryById = async (id: string) => {
  return Inventory.findById(id)
    .populate("store", "name")
    .populate("product", "name price");
};

export const updateInventory = async (id: string, data: any) => {
  const updatedData: any = { ...data };
  if (data.store) updatedData.store = new mongoose.Types.ObjectId(data.store);
  if (data.product) updatedData.product = new mongoose.Types.ObjectId(data.product);

  return Inventory.findByIdAndUpdate(id, updatedData, { new: true });
};

export const deleteInventory = async (id: string) => {
  return Inventory.findByIdAndDelete(id);
};
