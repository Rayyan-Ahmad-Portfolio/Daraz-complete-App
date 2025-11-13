import mongoose,{Document,Types} from "mongoose";

export interface IWarehouseLocation {
  type: "Point";
  coordinates: [number, number];
}

export interface IInventory extends Document {
  _id: Types.ObjectId;
  product: Types.ObjectId;
  store: Types.ObjectId;
  stock: number;
  sold?: number;
  warehouseLocation: IWarehouseLocation;
  createdAt?: Date;
  updatedAt?: Date;
}

const inventorySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    stock: { type: Number, required: true, default: 0 },
    sold: { type: Number, default: 0 },
    warehouseLocation: {
    type: {
      type: String, 
      enum: ['Point'],
      default : "Point",
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

inventorySchema.index({warehouseLocation : '2dsphere'})
export default mongoose.model("Inventory", inventorySchema);
