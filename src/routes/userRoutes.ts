import { Router } from 'express';
import { getAllUsers, createUser } from '../controllers/userController';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/', verifyToken, getAllUsers); // Protected route
router.post('/', createUser); // create user

export default router;
