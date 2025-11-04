import mongoose,{Document,Types} from "mongoose";

export interface IPayment extends Document {
  _id: Types.ObjectId;
  order: Types.ObjectId;
  user: Types.ObjectId;
  paymentMethod: "COD" | "Card" | "Wallet";
  amount: number;
  status: "Pending" | "Success" | "Failed";
  transactionId?: string;
  paidAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const paymentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "Card", "Wallet"],
      required: true,
    },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Success", "Failed"],
      default: "Pending",
    },
    transactionId: { type: String },
    paidAt: { type: Date },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
export default mongoose.model("Payment", paymentSchema);
