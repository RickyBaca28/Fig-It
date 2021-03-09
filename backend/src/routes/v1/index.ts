import express from 'express';
import itemRoutes from './item';
import userRoutes from './user';

const router = express.Router();

router.use(itemRoutes, userRoutes);

export default router;