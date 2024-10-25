import { JsonWebTokenError } from 'jsonwebtoken';
import { createAdmin, getAdminByEmail, getAdmins, getUserDataByRole, loginAdmin } from '../conroller/adminController/adminController';
import { Router } from 'express';
import { jwtMiddleware } from '../util/middlewares/jwtMiddlewares';




const router = Router();


router.post('/signup', createAdmin);
router.post('/login', loginAdmin);
router.get('/getUser',jwtMiddleware,getUserDataByRole)
router.get('/getAlladmins', getAdmins);
router.get('/getAdmin/:email', getAdminByEmail);

export default router;
