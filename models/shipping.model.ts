import mongoose,{Document,Types} from "mongoose";

export interface IShipping extends Document {
  from: Types.ObjectId;
  to: Types.ObjectId;   
  deliverDate: string;
  deliverPartner: string;
  order: Types.ObjectId; 
  orderDetails?: Types.ObjectId[]; 
  _id: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}


const shippingSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deliverDate: {
      type: String,
      required: true,
    },
    deliverPartner: {
      type: String,
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
  },
  { timestamps: true }
);

shippingSchema.virtual("orderDetails", {
  ref: "Order",
  localField: "_id",
  foreignField: "shipping",
  justOne: false,
});

shippingSchema.set("toObject", { virtuals: true });
shippingSchema.set("toJSON", { virtuals: true });

export default mongoose.model("Shipping", shippingSchema);
