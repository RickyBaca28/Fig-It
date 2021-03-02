import mongoose from "mongoose";
import { IBase } from '../types/models';

export interface IUser extends IBase {
    username: string;
    email: string;
    password: string;
}

export type IUserDocument = IUser & mongoose.Document;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 5,
        maxLength: 20,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        minLength: 5,
        maxLength: 20,
        required: true,
    }
});

const UserModel = mongoose.model<IUserDocument>('user', userSchema);
export default UserModel;