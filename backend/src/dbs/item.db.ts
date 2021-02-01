import ItemModel, { IItem, IItemDocument } from '../models/item';

// gets a global list of every item
export const getItemList = async (): Promise<IItem[]> => {
const items: IItemDocument[] = await ItemModel.find({}).exec();

return items.map(
    (item: IItemDocument): IItem => {
        return item.toObject();
    },
);
};

// gets an items info by its id
export const getItemInfo = async (itemId: string): Promise<IItem> => {
    const item: IItemDocument = await ItemModel.findById({ _id: itemId }).exec();
    return item;
};

// adds an item to the db
export const createItem = async (payload: any): Promise<IItem> => {
    const item = new ItemModel(payload);
    const savedItem = await item.save();

    const result: IItem = savedItem.toObject();
    delete item.__v;

    return result;
};