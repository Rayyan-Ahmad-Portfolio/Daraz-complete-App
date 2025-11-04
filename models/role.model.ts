import mongoose,{Document,Types} from "mongoose";

export interface IRole extends Document {
  name: "Buyer" | "Store Owner" | "Store Manager";
  description: string;
  permission: Types.ObjectId[]; 
  _id: Types.ObjectId;

}



const roleSchema = new mongoose.Schema({
    name: {type: String,
      enum: ["Buyer", "Store Owner", "Store Manager"],
      required: true},
    description : {type : String , required: true},
    permission: [{
      type: mongoose.Schema.Types.ObjectId,
      ref : "Permission",
      required: true
    }]
},{
  timestamps: true
});

export default mongoose.model("Role", roleSchema);