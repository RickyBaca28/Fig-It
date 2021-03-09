import mongoose from 'mongoose';
import ItemModel, { IItem } from '../../../src/models/item';
import { getItemList, getItemInfo, createItem } from '../../../src/dbs/item.db';

const item1: IItem = {
    name: "test",
    description: "test.",
    tags: ["test"],
    picture: "test",
    userId: "Ricky",
    date: new Date('October 13, 2019 05:35:32'),
    __v: 0,
    _id: '123-123-123'
}
//! NEED TO READ http://mongoosejs.com/docs/jest.html
describe.skip('Item Database Layer', () => {
    beforeAll(async () => {
        await mongoose.connect(
            (global as any).__MONGO_URI__,
            { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
            (err) => {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
            },
        );
    });

    beforeEach(async () => {
        await new ItemModel(item1).save();
    });

    afterEach(async () => {
        await mongoose.connection.dropDatabase();
    });

    afterAll(() => {
        mongoose.disconnect();
    });

    describe('getItemList()', () => {
        it('should return items', async () => {
            const items = await getItemList();

            expect(items).toHaveLength(1);
            expect(items[0]).toMatchObject(item1);
        });
    });
});