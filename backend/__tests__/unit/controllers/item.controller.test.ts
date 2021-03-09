import { mockRequest, mockResponse, mockNext } from '../../utils/expressMocks';
import * as itemController from '../../../src/controllers/item.controller';
import { getItemList, getItemInfo, createItem } from '../../../src/services/item.service';
import { IItem } from '../../../src/models/item';

const item: IItem = {
    name: "test",
    description: "test.",
    tags: ["test"],
    picture: "test",
    userId: "Ricky",
    date: new Date('October 13, 2019 05:35:32'),
    __v: 0,
}

jest.mock('../../../src/services/item.service', () => {
    return {
        getItemList: jest.fn(),
        getItemInfo: jest.fn(),
        createItem: jest.fn(),
    };
});

describe('Item Controller Layer', () => {
    afterEach(() => jest.clearAllMocks());

    describe('getItemList()', () => {
        it('should 200 when there are no items', async () => {
            const res = mockResponse();
            const req = mockRequest({});
            const next = mockNext();

            (getItemList as jest.Mock<any, any>).mockImplementation(() => []);

            await itemController.getItemList(req as any, res as any, next as any);

            expect.assertions(6);
            expect(getItemList).toHaveBeenCalledTimes(1);

            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.send).toHaveBeenCalledTimes(1);

            expect(res.send).toHaveBeenCalledWith([]);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(next).toHaveBeenCalledTimes(0);
        });

        it('should 200 when there are no templates', async () => {
            const res = mockResponse();
            const req = mockRequest({});
            const next = mockNext();

            (getItemList as jest.Mock<any, any>).mockImplementation(() => [item]);

            await itemController.getItemList(req as any, res as any, next as any);

            expect.assertions(6);
            expect(getItemList).toHaveBeenCalledTimes(1);

            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.send).toHaveBeenCalledTimes(1);

            expect(res.send).toHaveBeenCalledWith([item]);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(next).toHaveBeenCalledTimes(0);
        });
    });

    describe('getItemInfo()', () => {
        it('should 200 when there are no items', async () => {
            const res = mockResponse();
            const req = mockRequest({});
            const next = mockNext();

            (getItemInfo as jest.Mock<any, any>).mockImplementation(() => { });

            await itemController.getItemInfo(req as any, res as any, next as any);

            expect.assertions(6);
            expect(getItemInfo).toHaveBeenCalledTimes(1);

            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.send).toHaveBeenCalledTimes(1);

            expect(res.send).toHaveBeenCalledWith(undefined);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(next).toHaveBeenCalledTimes(0);
        });

        it('should 200 when there are no items', async () => {
            const res = mockResponse();
            const req = mockRequest({ id: item._id });
            const next = mockNext();

            (getItemInfo as jest.Mock<any, any>).mockImplementation(() => item);

            await itemController.getItemInfo(req as any, res as any, next as any);

            expect.assertions(6);
            expect(getItemInfo).toHaveBeenCalledTimes(1);

            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.send).toHaveBeenCalledTimes(1);

            expect(res.send).toHaveBeenCalledWith(item);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(next).toHaveBeenCalledTimes(0);
        });
    });

    describe('createItem()', () => {
        it('should 200 when there are no items', async () => {
            const res = mockResponse();
            const req = mockRequest({});
            const next = mockNext();

            (createItem as jest.Mock<any, any>).mockImplementation(() => { });

            await itemController.createItem(req as any, res as any, next as any);

            expect.assertions(6);
            expect(createItem).toHaveBeenCalledTimes(1);

            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.send).toHaveBeenCalledTimes(1);

            expect(res.send).toHaveBeenCalledWith(undefined);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(next).toHaveBeenCalledTimes(0);
        });

        it('should 200 when there are no items', async () => {
            const res = mockResponse();
            const req = mockRequest({ id: item._id });
            const next = mockNext();

            (createItem as jest.Mock<any, any>).mockImplementation(() => item);

            await itemController.createItem(req as any, res as any, next as any);

            expect.assertions(6);
            expect(createItem).toHaveBeenCalledTimes(1);

            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.send).toHaveBeenCalledTimes(1);

            expect(res.send).toHaveBeenCalledWith(item);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(next).toHaveBeenCalledTimes(0);
        });
    });
});