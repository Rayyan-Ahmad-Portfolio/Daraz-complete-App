import mongoose,{Document,Types,model} from "mongoose";
import { PERMISSIONS } from "../utils/constants/admin.permission";
import bcrypt from 'bcryptjs';

export interface IAdmin extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role: string;
  permissions: Permissions[];
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  activities?: Types.ObjectId[]; 
   comparePassword(candidatePassword: string): Promise<boolean>;
}

const allPermissions = Object.values(PERMISSIONS).flat();


const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["superadmin", "manager", "support"],
      default: "superadmin",
    },

    permissions: {
       type: [String],
    enum: allPermissions,
    default: ["view_reports"]
    },

    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

adminSchema.virtual("activities", {
  ref: "AdminActivity",
  localField: "_id",
  foreignField: "admin",
  justOne: false,
});


adminSchema.pre<IAdmin>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }   
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error as Error);
    }   
});
adminSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};


export const Admin = model<IAdmin>("Admin", adminSchema);
export default Admin;


