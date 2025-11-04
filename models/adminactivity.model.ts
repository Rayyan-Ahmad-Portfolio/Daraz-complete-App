import mongoose,{Document,Types} from "mongoose";


export interface IAdminActivity extends Document {
    _id: Types.ObjectId;
  
  admin: Types.ObjectId;
  action: string;
  targetModel?: string;
  targetId?: Types.ObjectId;
  details?: string;
  timestamp?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const adminActivitySchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    action: { type: String, required: true }, 
    targetModel: { type: String },
    targetId: { type: mongoose.Schema.Types.ObjectId }, 
    details: { type: String }, 
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("AdminActivity", adminActivitySchema);
