import RealestateController from "../Controllers/RealestateController";
import {authenticateMiddleware} from "../Middlewares/authMiddleware";
//import {hasPermission} from "../Middlewares/checkPermission";
//import {BitwisePermissionEnums} from "../../Domain/Enums/PermissionEnums";

const express = require('express');

const {authenticateToken} = require("../Middlewares/authMiddleware");
const router = express.Router();
const realestateController = new RealestateController();

router.post('/Realestate/create', authenticateMiddleware, realestateController.createRealestate);
router.get('/Realestate/all', authenticateMiddleware, realestateController.getAllRealestate);
router.put('/Realestate/update/:RealestateId', authenticateMiddleware, realestateController.updateRealestate);
router.get('/Realestate/find/:RealestateId', authenticateMiddleware, realestateController.getRealestate);
router.delete('/Realestate/delete/:RealestateId', authenticateMiddleware, realestateController.deleteRealestate);
//router.get('/Realestate/permission', RealestateController.getPermission);

module.exports = router;