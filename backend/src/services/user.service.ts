import * as db from '../dbs/user.db';
import { IUser } from '../models/user';

// gets global user list
export const getUserList = (): Promise<IUser[]> => {
    return db.getUserList();
};

// gets user from specific user id
export const getUser = (userId: string): Promise<IUser> => {
    return db.getUser(userId);
};

// adds an user 
export const createItem = (payload: any): Promise<IUser> => {
    payload.date = new Date();
    return db.createUser(payload);
};

