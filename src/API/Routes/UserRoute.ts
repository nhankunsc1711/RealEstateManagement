//import {hasPermission} from "../Middlewares/checkPermission";
// const authenMiddleware = require('../Middlewares/authMiddleware')
// import { User } from '../../Domain/Entities/UserEntites';
import UserController from '../Controllers/UserController';
import {authenticateMiddleware} from '../Middlewares/authMiddleware';
//import {upload} from '../Middlewares/upImageMiddleware';
//import {BitwisePermissionEnums} from "../../Domain/Enums/PermissionEnums";

const express = require('express');

const router = express.Router();
const userController = new UserController();

interface User {
    userId: string;
    companyId: String;
}

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

router.post('/user/register', userController.registerAccount);
router.post('/user/create-employee', userController.registerAccountEmployee);
router.post('/user/login', userController.login);
router.get('/user/profile/:id', userController.getUserById);
router.put('/user/update', authenticateMiddleware, userController.updateUserById)
router.delete('/user/:id',authenticateMiddleware, userController.deleteUserById);
router.post('/user/change-password', userController.changePassword);
router.post('/user/refresh-token', authenticateMiddleware, userController.getNewToken);


module.exports = router;