import mongoose from "mongoose";
import { IBase } from '../types/models';

export interface IItem extends IBase {
    name: string;
    date: Date;
    description: string;
    tags: string[];
    picture: string;
    userId: string;
}

export type IItemDocument = IItem & mongoose.Document;

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    }
});

const ItemModel = mongoose.model<IItemDocument>('item', itemSchema);
export default ItemModel;