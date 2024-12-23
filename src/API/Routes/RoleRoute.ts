import RoleController from "../Controllers/RoleController";
import {authenticateMiddleware} from "../Middlewares/authMiddleware";
//import {hasPermission} from "../Middlewares/checkPermission";
//import {BitwisePermissionEnums} from "../../Domain/Enums/PermissionEnums";

const express = require('express');

const {authenticateToken} = require("../Middlewares/authMiddleware");
const router = express.Router();
const roleController = new RoleController();

router.post('/role/create', roleController.createRole);
router.get('/role/all', roleController.getAllRole);
router.put('/role/update/:roleId', roleController.updateRole);
router.get('/role/find/:roleId', roleController.getRole);
router.delete('/role/delete/:roleId', roleController.deleteRole);
//router.get('/role/permission', roleController.getPermission);

module.exports = router;