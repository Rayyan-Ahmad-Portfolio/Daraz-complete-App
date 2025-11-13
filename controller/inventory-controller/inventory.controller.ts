import { Request, Response } from "express";
import * as responseHandler from "../../utils/helpers/response.helpers";
import * as InventoryService from "../../service/inventory-service/inventory.service";
import {
  createInventorySchema,
  updateInventorySchema,
} from "../../utils/validator/inventory.validator";
import { ZodError } from "zod";

export const createInventory = async (req: Request, res: Response) => {
  try {
    const parsed = createInventorySchema.parse(req.body);
    const inventory = await InventoryService.createInventory(parsed);
    return responseHandler.successResponse(res,  "Inventory created successfully",inventory, 201);
  } catch (error: any) {
    if (error instanceof ZodError) {
      const messages = error.issues.map((e) => e.message).join(", ");
      return responseHandler.errorResponse(res, `Invalid input: ${messages}`, 400);
    }
    return responseHandler.errorResponse(res, error.message, 500);
  }
};

export const getAllInventories = async (req: Request, res: Response) => {
  try {
    const inventories = await InventoryService.getAllInventories();
    return responseHandler.successResponse(res,  "Inventories fetched successfully",inventories);
  } catch (error: any) {
    return responseHandler.errorResponse(res, error.message, 500);
  }
};

export const getInventoryById = async (req: Request, res: Response) => {
  try {
    const inventory = await InventoryService.getInventoryById(req.params.id!);
    if (!inventory)
      return responseHandler.errorResponse(res, "Inventory not found", 404);
    return responseHandler.successResponse(res,  "Inventory fetched successfully", inventory);
  } catch (error: any) {
    return responseHandler.errorResponse(res, error.message, 500);
  }
};

export const updateInventory = async (req: Request, res: Response) => {
  try {
    const parsed = updateInventorySchema.parse(req.body);
    const inventory = await InventoryService.updateInventory(req.params.id!, parsed);
    if (!inventory)
      return responseHandler.errorResponse(res, "Inventory not found", 404);
    return responseHandler.successResponse(res, "Inventory updated successfully",inventory);
  } catch (error: any) {
    if (error instanceof ZodError) {
      const messages = error.issues.map((e) => e.message).join(", ");
      return responseHandler.errorResponse(res, `Invalid input: ${messages}`, 400);
    }
    return responseHandler.errorResponse(res, error.message, 500);
  }
};

export const deleteInventory = async (req: Request, res: Response) => {
  try {
    const inventory = await InventoryService.deleteInventory(req.params.id!);
    if (!inventory)
      return responseHandler.errorResponse(res, "Inventory not found", 404);
    return responseHandler.successResponse(res, "Inventory deleted successfully", inventory);
  } catch (error: any) {
    return responseHandler.errorResponse(res, error.message, 500);
  }
};
