import { IUser } from "../models/user.interface";
import { model, Schema, Document } from "mongoose";

export interface IUserSchema extends Document {
    name: string;
    email: string;
    password: string;
}

const userSchema = new Schema<IUserSchema>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {type: String, required: true}
});


const User = model("User", userSchema);

export default User;