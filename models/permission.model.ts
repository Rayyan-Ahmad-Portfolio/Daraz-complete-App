import mongoose,{Document,Types} from "mongoose";

export interface IPermission extends Document {
  _id: Types.ObjectId;
  module: string;          
  actions: string[];       
  description: string;    
  createdAt?: Date;
  updatedAt?: Date;
}


const permissionSchema = new mongoose.Schema(
  {
    module: { type: String, required: true }, 
    actions: [{type: String, required: true}],
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Permission", permissionSchema);
