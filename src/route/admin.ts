import { Router } from 'express'
import { getAdmins, getAdminById } from '../controllers/admin';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/admins', authMiddleware, getAdmins);
router.get('/admins/:id', authMiddleware, getAdminById);

export default router;