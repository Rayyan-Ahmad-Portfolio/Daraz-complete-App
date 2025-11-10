import { Request, Response } from 'express';
import * as responseHandler from '../../utils/helpers/response.helpers';
import * as validators from '../../utils/validator/category.validator';
import * as categoryService from '../../service/category-service/category.service';
import mongoose from 'mongoose';
import { ZodError } from 'zod';


export const createCategory = async (req: Request, res: Response) => {
    try {
        const admin = (req as any).admin;
        const parsed = validators.createCategory.parse(req.body);
        const categoryData = {
            ...parsed,
            createdBy: admin._id,
        };
        const category = await categoryService.createCategory(categoryData as any);
        return responseHandler.successResponse(res, 'Category created successfully', category, 201);
    } catch (error : any) {
         if (error instanceof ZodError) {
      return responseHandler.errorResponse(res, error.issues.map(e => e.message).join(", "), 400);
    }
    console.error("Error creating category:", error);
    return responseHandler.errorResponse(res, error.message, 500);
  }
};


export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await categoryService.getCategory();
        return responseHandler.successResponse(res, 'Categories fetched successfully', categories);
    } catch (error: any) {
        console.error("Error fetching categories:", error);
        return responseHandler.errorResponse(res, error.message, 500);
    }
};


export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;   
        if (!id) {
          return responseHandler.errorResponse(res, "Category ID is required", 400);
        }
        const category = await categoryService.getCategoryById(id);
        return responseHandler.successResponse(res, 'Category fetched successfully', category);
    } catch (error: any) {
        console.error("Error fetching category by ID:", error);
        return responseHandler.errorResponse(res, error.message, 500);
    }
};


export const updateCategory = async (req: Request, res: Response) => {  
    try {
        const id = req.params.id as string;
        const parsed = validators.updatedCategory.parse(req.body);
        const category = await categoryService.updateCategory(id, parsed as any);
        return responseHandler.successResponse(res, 'Category updated successfully', category);
    }   catch (error: any) {
        if (error instanceof ZodError) {
            return responseHandler.errorResponse(res, error.issues.map(e => e.message).join(", "), 400);
        }
        console.error("Error updating category:", error);
        return responseHandler.errorResponse(res, error.message, 500);
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string; 
        const category = await categoryService.deleteCategory(id);
        return responseHandler.successResponse(res, 'Category deleted successfully', category);
    } catch (error: any) {
        console.error("Error deleting category:", error);
        return responseHandler.errorResponse(res, error.message, 500);
    }
};
