import mongoose,{Document,Types} from "mongoose";

export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  images?: string[];

  category: Types.ObjectId;  
  store: Types.ObjectId;      
  inventory: Types.ObjectId;  

  rating?: number;            
  approvedBy?: Types.ObjectId; 
  reviews?: Types.ObjectId[];
  orders?: Types.ObjectId[];  

  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
     category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true, 
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    inventory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inventory",
      required: true,
    },
    rating: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
});

productSchema.virtual("orders", {
  ref: "Order",
  localField: "_id",
  foreignField: "product",
  justOne: false,
});

export default mongoose.model("Product", productSchema);
