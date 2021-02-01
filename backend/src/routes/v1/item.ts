import express from 'express';
import * as itemController from '../../controllers/item.controller';

const router = express.Router();

router.route('/items').get(itemController.getItemList).post(itemController.createItem);

router.route('/items/:id').get(itemController.getItemInfo);

export default router;