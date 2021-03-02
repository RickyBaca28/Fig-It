import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as userService from '../services/user.service';
import { IUser } from '../models/user';

//gets a user based off username
export const getUser = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {

        const user: IUser = await userService.getUser(req.params.username);
        res.status(200).send(user);
    },
);

//creates a user
export const createUser = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        const { body } = req;

        const user = await userService.createUser(body);
        res.status(200).send(user);
    },
);