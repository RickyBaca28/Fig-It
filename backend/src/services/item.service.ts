import * as db from '../dbs/item.db';
import { IItem } from '../models/item';

// gets global item list
export const getItemList = (): Promise<IItem[]> => {
    return db.getItemList();
};

// gets item from specific item id
export const getItemInfo = (itemId: string): Promise<IItem> => {
    return db.getItemInfo(itemId);
};

// adds an item 
export const createItem = (payload: any): Promise<IItem> => {
    payload.date = new Date();
    return db.createItem(payload);
};

