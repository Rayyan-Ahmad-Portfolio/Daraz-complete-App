import { Request, Response } from "express";
import mongoose from "mongoose";
import * as storeService from "../../service/store-service/store.service";
import * as validation from "../../utils/validator/store.validator";
import * as responseHandler from "../../utils/helpers/response.helpers";



export const createStore = async (req: Request, res: Response) => {
    try {
    const parsed = validation.storeRegister.parse(req.body);

    const user = (req as any).user;

    const managers = parsed.managers?.map((id) => new mongoose.Types.ObjectId(id)) || [];
    const products = parsed.products?.map((id) => new mongoose.Types.ObjectId(id)) || [];
    const inventory = parsed.inventory?.map((id) => new mongoose.Types.ObjectId(id)) || [];

const address = parsed.address
  ? {
      street: parsed.address.street ?? "",
      city: parsed.address.city ?? "",
      province: parsed.address.province ?? "",
      postalCode: parsed.address.postalCode ?? "",
    }
  : undefined;

    const store = await storeService.createStore({
      userId: user._id,
      name: parsed.name ?? "",
      description: parsed.description ?? "",
      managers,
      products,
      inventory,
      address,
      status: parsed.status ?? "active",
    });

       return responseHandler.successResponse(res, "Store Created Successfully", store,201);        


    } catch (error: any) {
        console.error("Error creating store:", error);
        return responseHandler.errorResponse(res, "Failed to create store",500);
    }
 
};
export const getStore = async (req: Request, res: Response) => {
   try {
    const stores = await storeService.getStore();
   return responseHandler.successResponse(res, "Stores fetched successfully", stores);
   } catch (error : any) {
    console.error("❌ Store Fetch Error:", error);
return responseHandler.errorResponse(res, error.message || "Failed to fetch stores", 500);

   }
};


export const updateStore = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) return responseHandler.errorResponse(res, "Store id is required", 400);

    // ✅ Validate update input
    const parsed = validation.storeUpdateSchema.parse(req.body);

    const updates: any = {
      ...parsed,
      managers: parsed.managers?.map((id) => new mongoose.Types.ObjectId(id)) || [],
      products: parsed.products?.map((id) => new mongoose.Types.ObjectId(id)) || [],
      inventory: parsed.inventory?.map((id) => new mongoose.Types.ObjectId(id)) || [],
    };

    const store = await storeService.updateStore(id, updates);

    if (!store)
      return responseHandler.errorResponse(res, "Store not found", 404);

    return responseHandler.successResponse(res, "Store updated successfully", store);
  }catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteStore = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      return responseHandler.errorResponse(res, "Store id is required", 400);
    }
    const store = await storeService.deleteStorez(id);
    if (!store)
      return responseHandler.errorResponse(res, "Store not found", 404);
    return responseHandler.successResponse(res, "Store deleted successfully", store);
  } catch (error: any) {
    console.error("Error deleting store:", error);
    return responseHandler.errorResponse(res, "Failed to delete store", 500);
  }
};