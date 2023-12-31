import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import { productSchema } from "./product.model";

const cartItemSchema = new mongoose.Schema({
  productName:{
    type: String,
    required: true
  },
  productImage:{
    type: String,
    required: true
  },
  productPrice:{
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  size: {
    type: String,
    required: true
  },
});

export const userSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: [8, "Minimum password length is 8 characters"],
  },
  url: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  cart:[cartItemSchema]
});

userSchema.set("validateBeforeSave", true);

// hash password before an user is stored
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
