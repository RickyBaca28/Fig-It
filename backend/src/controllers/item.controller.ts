import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as itemService from '../services/item.service';
import { IItem } from '../models/item';

// gets a global item list
export const getItemList = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        const items: IItem[] = await itemService.getItemList();
        res.status(200).send(items);
    },
);

// gets an items info based of its id
export const getItemInfo = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {

        const item: IItem = await itemService.getItemInfo(req.params.id);
        res.status(200).send(item);
    },
);

export const createItem = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        const { body } = req;

        const item = await itemService.createItem(body);
        res.status(200).send(item);
    },
);