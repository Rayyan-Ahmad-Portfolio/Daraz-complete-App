import mongoose,{Document,Types, model} from "mongoose";
import bcrypt from 'bcrypt';

export interface IAddress {
  street?: string;
  city?: string;
  province?: string;
  postalCode?: string;
}

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: Types.ObjectId; 
  store?: Types.ObjectId; 
  address?: IAddress;
  phoneNumber: string;

  reviews?: Types.ObjectId[];  
  cartItems?: Types.ObjectId[]; 
  orders?: Types.ObjectId[]; 
  payments?: Types.ObjectId[]; 

  createdAt?: Date;
  updatedAt?: Date;
}


const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },

    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
    },

    address: {
      street: { type: String },
      city: { type: String },
      province: { type: String },
      postalCode: { type: String },
    },

    phoneNumber: {
      type: String,
      required: true,
      minlength: 11,
      maxlength: 11,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

userSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});

userSchema.virtual("cartItems", {
  ref: "Cart",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});

userSchema.virtual("orders", {
  ref: "Order",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});

userSchema.virtual("payments", {
  ref: "Payment",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});



userSchema.pre<IUser>('save', async function (next) {
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
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUser>("User", userSchema);
export default User;
