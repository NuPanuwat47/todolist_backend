import { Router } from 'express';
import { getTodos, createTodo } from '../controllers/todo';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/todos', authMiddleware, getTodos);
router.post('/todos', authMiddleware, createTodo);

export default router;
