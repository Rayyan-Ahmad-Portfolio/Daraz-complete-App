import Cart from "../../models/cart.model";
import Product from "../../models/product.model";
import mongoose from "mongoose";

export const getCartByUser = async (userId: string) => {
  return await Cart.findOne({ user: userId }).populate("items.product");
};

export const createCartIfNotExists = async (userId: string) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({
      user: new mongoose.Types.ObjectId(userId),
      items: [],
      totalPrice: 0
    });
  }
  return cart;
};

export const addToCart = async (userId: string, productId: string, quantity: number) => {
  const cart = await createCartIfNotExists(userId);

  // Check product exists
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  // Check if product already exists in cart
  const existingItem = cart.items.find(item => item.product.toString() === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      product: new mongoose.Types.ObjectId(productId),
      quantity
    });
  }

  // Recalculate total
  cart.totalPrice = await calculateTotal(cart.items);
  await cart.save();
  return cart;
};

export const removeItem = async (userId: string, productId: string) => {
  const cart = await createCartIfNotExists(userId);

  const itemToRemove = cart.items.id(productId);
  if (itemToRemove) {
    itemToRemove.deleteOne();
  }

  cart.totalPrice = await calculateTotal(cart.items);
  await cart.save();
  return cart;
};

export const clearCart = async (userId: string) => {
  const cart = await createCartIfNotExists(userId);

  cart.items.splice(0);
  cart.totalPrice = 0;
  await cart.save();
  return cart;
};

export const updateQuantity = async (userId: string, productId: string, quantity: number) => {
  const cart = await createCartIfNotExists(userId);

  const item = cart.items.find(i => i.product.toString() === productId);
  if (!item) throw new Error("Item not in cart");

  item.quantity = quantity;

  cart.totalPrice = await calculateTotal(cart.items);
  await cart.save();
  return cart;
};

// Helper: calculate total
export const calculateTotal = async (items: any[]) => {
  let total = 0;
  for (let item of items) {
    const product = await Product.findById(item.product);
    if (product) {
      total += product.price * item.quantity;
    }
  }
  return total;
};
