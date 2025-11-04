import mongoose,{Document,Types} from "mongoose";


export interface IAddress {
  street?: string;
  city?: string;
  province?: string;
  postalCode?: string;
}

export interface IStore extends Document {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  owner: Types.ObjectId; 
  managers: Types.ObjectId[]; 
  products: Types.ObjectId[]; 
  inventory: Types.ObjectId[]; 
  address?: IAddress;
  status: "active" | "suspended" | "pending";
  createdAt?: Date;
  updatedAt?: Date;
}

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true, 
    },
    description: {
      type: String,
      default: "",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, 
    },
    managers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    inventory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Inventory",
      },
    ],
    address: {
      street: { type: String },
      city: { type: String },
      province: { type: String },
      postalCode: { type: String },
    },
    
    status: {
      type: String,
      enum: ["active", "suspended", "pending"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Store", storeSchema);
