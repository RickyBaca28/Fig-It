import express from 'express';
import * as userController from '../../controllers/user.controller';

const router = express.Router();

router.route('/users/:username').get(userController.getUser);

router.route('/users').post(userController.createUser);

export default router;