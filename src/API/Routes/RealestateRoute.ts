import RealestateController from "../Controllers/RealestateController";
import {authenticateMiddleware, checkAuthenticateMiddleware} from "../Middlewares/authMiddleware";
//import {hasPermission} from "../Middlewares/checkPermission";
//import {BitwisePermissionEnums} from "../../Domain/Enums/PermissionEnums";

const express = require('express');

const {authenticateToken} = require("../Middlewares/authMiddleware");
const router = express.Router();
const realestateController = new RealestateController();

router.post('/realestate/create', authenticateMiddleware, realestateController.createRealestate);
router.get('/', checkAuthenticateMiddleware, realestateController.getAllRealestateForUser);
router.get('/realestate/all', checkAuthenticateMiddleware, realestateController.getAllRealestate);
router.put('/realestate/update/:realestateId', realestateController.updateRealestate);
router.get('/realestate/find/:realestateId', realestateController.getRealestate);
router.delete('/realestate/delete/:realestateId', realestateController.deleteRealestate);
router.put('/realestate/changestatus/:realestateId', realestateController.changeStatusRealestate);
//router.get('/Realestate/permission', RealestateController.getPermission);

module.exports = router;