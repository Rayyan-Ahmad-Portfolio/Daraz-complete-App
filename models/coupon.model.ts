import mongoose,{Document,Types} from "mongoose";


export interface ICoupon extends Document {
  _id: Types.ObjectId;
  code: string;
  discountPercent: number;
  validFrom: Date;
  validTill: Date;
  isActive?: boolean;
  usageLimit?: number;
  createdBy?: Types.ObjectId;
  orders?: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}


const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },

    discountPercent: { type: Number, required: true, min: 1, max: 100 },

    validFrom: { type: Date, required: true },
    validTill: { type: Date, required: true },

    isActive: { type: Boolean, default: true },

    usageLimit: { type: Number, default: 1 },
    createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

couponSchema.virtual("orders", {
  ref: "Order",
  localField: "_id",
  foreignField: "coupon",
  justOne: false,
});

export default mongoose.model("Coupon", couponSchema);
