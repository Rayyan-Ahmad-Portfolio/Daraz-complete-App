import { Request, Response } from "express";
import * as cartService from "../../service/cart-service/cart.service";
import * as validation from "../../utils/validator/cart.validator";
import * as responseHandler from "../../utils/helpers/response.helpers";
import { ZodError } from "zod";

export const getCart = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const cart = await cartService.getCartByUser(user._id);
    return responseHandler.successResponse(res, "Cart fetched", cart);
  } catch (error: any) {
    return responseHandler.errorResponse(res, error.message, 500);
  }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const parsed = validation.addToCartSchema.parse(req.body);

    const cart = await cartService.addToCart(
      user._id,
      parsed.productId,
      parsed.quantity
    );

    return responseHandler.successResponse(res, "Item added to cart", cart);
  } catch (error: any) {
    if (error instanceof ZodError)
      return responseHandler.errorResponse(res, error.message, 400);

    return responseHandler.errorResponse(res, error.message, 500);
  }
};

export const updateQuantity = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const parsed = validation.updateQuantitySchema.parse(req.body);

    const cart = await cartService.updateQuantity(
      user._id,
      parsed.productId,
      parsed.quantity
    );

    return responseHandler.successResponse(res, "Quantity updated", cart);
  } catch (error: any) {
    return responseHandler.errorResponse(res, error.message, 400);
  }
};

export const removeItem = async (req: Request, res: Response) => {
  try {
    const parsed = validation.removeFromCartSchema.parse(req.body);
    const user = (req as any).user;

    const cart = await cartService.removeItem(user._id, parsed.productId);

    return responseHandler.successResponse(res, "Item removed", cart);
  } catch (error: any) {
    return responseHandler.errorResponse(res, error.message, 400);
  }
};

export const clearCart = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const cart = await cartService.clearCart(user._id);

    return responseHandler.successResponse(res, "Cart cleared", cart);
  } catch (error: any) {
    return responseHandler.errorResponse(res, error.message, 500);
  }
};
