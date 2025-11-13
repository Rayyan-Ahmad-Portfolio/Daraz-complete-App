import { Request, Response } from "express";
import * as responseHandler from "../../utils/helpers/response.helpers";
import * as validation from "../../utils/validator/product.validator";
import * as productService from "../../service/product-service/product.service";
import * as cloudinaryService from "../../service/cloudinary-service/cloudinary.service";
import mongoose from "mongoose";
import fs from "fs";
import { ZodError } from "zod";


export const createProduct = async (req: Request, res: Response) => {
  try {
    const parsed = validation.createProductSchema.parse(req.body);
    let imageUrls: string[] = [];
    if (req.files && Array.isArray(req.files)) {
  const filePaths = (req.files as Express.Multer.File[]).map(f => f.path);
  imageUrls = await cloudinaryService.uploadMultipleToCloudinary(filePaths);
}

    const validatedData = {
      name: parsed.name,
      description: parsed.description,
      price: parsed.price,
      images: imageUrls,
      category: new mongoose.Types.ObjectId(parsed.category),
      store: new mongoose.Types.ObjectId(parsed.store),
      inventory: new mongoose.Types.ObjectId(parsed.inventory),
      rating: parsed.rating ?? 0,
      reviews: (parsed.reviews || []).map((id) => new mongoose.Types.ObjectId(id)),
    };

    const product = await productService.createProduct(validatedData);
    return responseHandler.successResponse(res, "Product created successfully", product, 201);
  } catch (error: any) {
    if (error instanceof ZodError) {
      return responseHandler.errorResponse(res, error.issues.map((e) => e.message).join(", "), 400);
    }
    console.error("❌ Error creating product:", error);
    return responseHandler.errorResponse(res, error.message || "Internal server error", 500);
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getProduct();
    return responseHandler.successResponse(res, "Products fetched successfully", products);
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return responseHandler.errorResponse(res, error.message, 500);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
const id = req.params.id as string;
if (!id) {
  return responseHandler.errorResponse(res, "Product ID is required", 400);
}    const product = await productService.getProductById(id);
    return responseHandler.successResponse(res, "Product fetched successfully", product);
  } catch (error: any) {
    console.error("Error fetching product:", error);
    return responseHandler.errorResponse(res, error.message, 404);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
const id = req.params.id as string;
if (!id) {
  return responseHandler.errorResponse(res, "Product ID is required", 400);
}    const parsed = validation.createProductSchema.parse(req.body);
    const user = (req as any).user;

      let imageUrls: string[] = [];

    if (req.files && Array.isArray(req.files)) {
      const filePaths = (req.files as Express.Multer.File[]).map(f => f.path);
      imageUrls = await cloudinaryService.uploadMultipleToCloudinary(filePaths);
    }
    
    const validatedData = {
      name: parsed.name,
      description: parsed.description,
      price: parsed.price,
      images: imageUrls || [],
      category: new mongoose.Types.ObjectId(parsed.category),
      store: new mongoose.Types.ObjectId(parsed.store),
      inventory: new mongoose.Types.ObjectId(parsed.inventory),
      rating: parsed.rating || 0,
      reviews: (parsed.reviews || []).map((id) => new mongoose.Types.ObjectId(id)),
    };
    const updatedProduct = await productService.updateProduct(id, validatedData);
    return responseHandler.successResponse(res, "Product updated successfully", updatedProduct);
  } catch (error: any) {
    if (error instanceof ZodError) {
      return responseHandler.errorResponse(res, error.issues.map(e => e.message).join(", "), 400);
    }
    console.error("Error updating product:", error);
    return responseHandler.errorResponse(res, error.message, 500);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
if (!id) {
  return responseHandler.errorResponse(res, "Product ID is required", 400);
}
    const deletedProduct = await productService.deleteProduct(id);
    return responseHandler.successResponse(res, "Product deleted successfully", deletedProduct);
  } catch (error: any) {
    console.error("Error deleting product:", error);
    return responseHandler.errorResponse(res, error.message, 500);
  }
};
