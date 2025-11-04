import mongoose,{Document,Types} from "mongoose";


export interface ICategory extends Document {
  name: string;
  _id: Types.ObjectId;
  description?: string;
  parent?: Types.ObjectId | null;
  image?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}


const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null, 
    },
    image: {
      type: String, 
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

categorySchema.index({ name: 1 });

export default mongoose.model("Category", categorySchema);
