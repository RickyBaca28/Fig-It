import * as service from '../../../src/services/item.service';
import { getItemList, getItemInfo, createItem } from '../../../src/dbs/item.db';
import { IItem } from '../../../src/models/item';

jest.mock('../../../src/dbs/item.db', () => {
    return {
        getItemList: jest.fn(),
        getItemInfo: jest.fn(),
        createItem: jest.fn()
    };
});

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

describe('Item Service Layer', () => {
    afterEach(() => jest.clearAllMocks());

    describe('getItemList()', () => {
        it('should return even with no items', async () => {
            (getItemList as jest.Mock<any, any>).mockImplementation(() => []);

            const itemList = await service.getItemList();

            expect(getItemList).toHaveBeenCalledTimes(1);
            expect(itemList).toHaveLength(0);

        });
        it('should return all items', async () => {
            (getItemList as jest.Mock<any, any>).mockImplementation(() => [item1]);

            const itemList = await service.getItemList();

            expect(getItemList).toHaveBeenCalledTimes(1);
            expect(itemList).toHaveLength(1);
            expect(itemList[0]).toMatchObject(item1);
        });
    });

    describe('getItemInfo()', () => {
        it('should return an items given a valid id', async () => {
            (getItemInfo as jest.Mock<any, any>).mockImplementation(() => { });

            const itemInfo = await service.getItemInfo(item1._id);

            expect(getItemInfo).toHaveBeenCalledTimes(1);
            expect(getItemInfo).toHaveBeenCalledWith(item1._id);

        });
        it('should return an items given a valid id', async () => {
            (getItemInfo as jest.Mock<any, any>).mockImplementation(() => item1);

            const itemInfo = await service.getItemInfo(item1._id);

            expect(getItemInfo).toHaveBeenCalledTimes(1);
            expect(getItemInfo).toHaveBeenCalledWith(item1._id);
            expect(itemInfo).toMatchObject({ _id: item1._id, name: item1.name });
        });
    });

    describe('createItem()', () => {
        it('should return an items given a valid id', async () => {
            (createItem as jest.Mock<any, any>).mockImplementation(() => item1);

            const item = await service.createItem(item1);

            expect(createItem).toHaveBeenCalledTimes(1);
            expect(createItem).toHaveBeenCalledWith(item1);
            expect(item).toMatchObject({ _id: item1._id, name: item1.name });
        });
    });
});