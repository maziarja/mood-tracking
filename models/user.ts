import { Document, type Model, model, models, Schema } from "mongoose";
import validator from "validator";

export type UserType = {
  _id: string;
  email: string;
  name: string;
  image: string;
  createdAt: Date;
  updatedAt?: Date;
  password?: string;
};

const userSchema = new Schema(
  {
    email: {
      unique: true,
      type: String,
      validate: [validator.isEmail, "Please enter valid email address"],
    },
    password: {
      type: String,
      // required: [true, "Password is required"],
    },
    name: {
      type: String,
      // required: [true, "Name is required"],
    },
    image: String,
  },
  {
    timestamps: true,
  },
);

const User: Model<UserType & Document> =
  models.User || model<UserType & Document>("User", userSchema);

export default User;
