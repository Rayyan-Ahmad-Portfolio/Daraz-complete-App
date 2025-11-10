import Category from '../../models/category.model';
import mongoose from 'mongoose';
import { ICategory } from '../../models/category.model';

export const createCategory = async (data: Partial<ICategory>) => {
   try {
    const newcategory = new Category(data);
   return await newcategory.save();
   
   } catch (error) {
    console.error("Error creating category:", error);
    throw new Error("Could not create category");
   }
};


export const getCategory = async () => {
try {
    return (await Category.find().populate("parent", "name"));
} catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Could not fetch categories");
}
};


export const getCategoryById = async (id: string) => {
try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid category ID");
    }
    return await Category.findById(id).populate("parent", "name");
} catch (error) {
    console.error("Error fetching category by ID:", error); 
    throw new Error("Could not fetch category by ID");
}
};


export const updateCategory = async (id: string, data: Partial<ICategory>) => {
try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid category ID");
    }
    return await Category.findByIdAndUpdate(id, data, { new: true });
} catch (error) {
    console.error("Error updating category:", error);
    throw new Error("Could not update category");
}};


export const deleteCategory = async (id: string) => { try {
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new Error("Invalid category ID");
    }
    return await Category.findByIdAndDelete(id);
} catch (error) {
    console.error("Error deleting category:", error);
    throw new Error("Could not delete category");
}};