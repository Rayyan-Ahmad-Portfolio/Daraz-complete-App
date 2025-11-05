import Store from "../../models/store.model";
import {IStore} from "../../models/store.model"
import { Types } from "mongoose";

export const createStore = async (data: {
  userId: Types.ObjectId;
  name: string;
  description?: string;
  managers?: Types.ObjectId[];
  products?: Types.ObjectId[];
  inventory?: Types.ObjectId[];
  address?: IStore["address"];
  status?: "active" | "suspended" | "pending";
}) => {
  const {
    userId,
    name,
    description,
    managers = [],
    products = [],
    inventory = [],
    address,
    status = "active",
  } = data;

  const newStore = await Store.create({
    name,
    description,
    owner: userId,
    managers,
    products,
    inventory,
    address,
    status,
  });

  return newStore;
};


export const getStore= async () => {
  try {
    const stores = await Store.find()
    .populate("owner", "name email")
    .populate("managers", "name email")
    .populate("products")
    .populate("inventory");
    return stores;
  } catch (error) {
    throw error;
  }
};


export const getStoreById = async (id: string) => {
  return Store.findById(id)
    .populate("owner", "name email")
    .populate("managers", "name email")
    .populate("products")
    .populate("inventory");
};


export const updateStore = async (id: string, updates: Partial<IStore>) => {
  return Store.findByIdAndUpdate(id, updates, { new: true })
    .populate("owner", "name email")
    .populate("managers", "name email")
    .populate("products")
    .populate("inventory");
};


export const deleteStorez = async (id: string) => {
  return Store.findByIdAndDelete(id);
};
