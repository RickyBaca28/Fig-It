import * as service from '../../../src/services/item.service';
import { getItemList, getItemInfo } from '../../../src/dbs/item.db';

jest.mock('../../../src/dbs/item.db', () => {
    return {
        getItemList: jest.fn(),
        getItemInfo: jest.fn(),
    };
});


describe('Item service Layer', () => {
    afterEach(() => jest.clearAllMocks());

    describe('getItemList()', () => {
        it('should return all items', async () => {
            (getItemList as jest.Mock<any, any>).mockImplementation(() => []);

            const itemList = await service.getItemList();

            expect(getItemList).toHaveBeenCalledTimes(1);
            expect(itemList).toHaveLength(0);

        });
    });
});