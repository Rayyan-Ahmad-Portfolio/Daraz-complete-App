import mongoose,{Document,Types} from "mongoose";

export interface IReview extends Document {
  user: Types.ObjectId;     
  product: Types.ObjectId; 
  order?: Types.ObjectId;   
  rating: number;           
  comment?: string;         
  _id: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", 
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order", 
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
