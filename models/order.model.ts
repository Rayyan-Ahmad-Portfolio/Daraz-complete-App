import mongoose,{Document,Types} from "mongoose";

export interface IOrderItem {
  product: Types.ObjectId;
  quantity: number;
  priceAtPurchase: number;
}

export interface IOrder extends Document {
    _id: Types.ObjectId;
  user: Types.ObjectId;
  items: IOrderItem[];
  shippingAddress: Types.ObjectId;
  totalAmount: number;
  payment?: Types.ObjectId;
  coupon?: Types.ObjectId;
  placedAt?: Date;
  shipping?: Types.ObjectId;
  reviews?: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: { type: Number, required: true },
      priceAtPurchase: { type: Number, required: true } 
    }
  ],
  shippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shipping",
    required: true
  },
  totalAmount: { type: Number, required: true },
 payment: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Payment",
  required: false
},
  coupon:{
  type: mongoose.Schema.Types.ObjectId,
  ref: "Coupon",
  required: false

},
  placedAt: { type: Date, default: Date.now }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

orderSchema.virtual("shipping", {
  ref: "Shipping",
  localField: "_id",
  foreignField: "order",
  justOne: true
});

orderSchema.virtual("reviews", {
  ref: "Reviews",
  localField: "_id",
  foreignField: "order",
  justOne: false
});


export default mongoose.model("Order", orderSchema);
