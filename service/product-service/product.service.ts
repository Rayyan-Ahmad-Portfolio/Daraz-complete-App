import Product from "../../models/product.model";
import { IProduct } from "../../models/product.model";

export const createProduct = async (data : Partial<IProduct>) => {
try {
    const product = new Product(data);
    await product.save();
    return product;
} catch (error:any) {

    console.error("Error creating product:", error.message);
    throw new Error("Could not create product");
 }
};


export const getProduct = async()=>{

    try {
        const products = await Product.find()
        .populate("category", "name")
      .populate("store", "name")
      .populate("inventory", "stock quantity")
      .populate("reviews");
        return products;
    } catch (error) {
     console.error("Error fetching products:", error);
     throw new Error("Could not fetch products");  
    }
};

export const getProductById = async (productId: string) => {
  try {
    const product = await Product.findById(productId)
      .populate("category", "name")
      .populate("store", "name")
      .populate("inventory", "stock quantity")
      .populate("reviews")
      .populate("orders");

    if (!product) throw new Error("Product not found");
    return product;
  } catch (error: any) {
    console.error("Error fetching product:", error);
    throw new Error(error.message || "Failed to fetch product");
  }
};

export const updateProduct = async (productId: string, data: Partial<IProduct>) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, data, {
      new: true,
      runValidators: true,
    });
    if (!updatedProduct) throw new Error("Product not found");
    return updatedProduct;
  } catch (error: any) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product");
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) throw new Error("Product not found");
    return deletedProduct;
  } catch (error: any) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product");
  }
};