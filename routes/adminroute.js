import { Router } from "express";
import { adminLogin, registerAdmin, updateAdmin } from "../controllers/admincontroller.js";



const adminRouter = Router();

adminRouter.post('/register', registerAdmin);

adminRouter.post('/login', adminLogin);

adminRouter.patch('/:id', updateAdmin)
//adminRouter.patch('/admin/:id', updateUser )


export default adminRouter;