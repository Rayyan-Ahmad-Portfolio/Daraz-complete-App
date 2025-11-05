import { Request, Response } from "express";
import * as storeService from "../../service/store-service/store.service";

import * as responseHandler from "../../utils/helpers/response.helpers";



export const createStore = async (req: Request, res: Response) => {
    try {
         
        const user = (req as any).user;
    const { name, description, managers, products, inventory, address, status } =
      req.body;

    const store = await storeService.createStore({
      userId: user._id,
      name,
      description,
      managers,
      products,
      inventory,
      address,
      status,
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
    if (!id) {
      return responseHandler.errorResponse(res, "Store id is required", 400);
    }
    const store = await storeService.updateStore(id, req.body);
    if (!store)
      return res.status(404).json({ success: false, message: "Store not found" });
    res
      .status(200)
      .json({ success: true, message: "Store updated successfully", store });
  } catch (error: any) {
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