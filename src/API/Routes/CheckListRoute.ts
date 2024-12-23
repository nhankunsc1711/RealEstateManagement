import CheckListController from "../Controllers/CheckListController";
import {authenticateMiddleware} from "../Middlewares/authMiddleware";
//import {hasPermission} from "../Middlewares/checkPermission";
//import {BitwisePermissionEnums} from "../../Domain/Enums/PermissionEnums";

const express = require('express');

const {authenticateToken} = require("../Middlewares/authMiddleware");
const router = express.Router();
const checkListController = new CheckListController();

router.post('/checkList/create/:realestateId', authenticateMiddleware, checkListController.createCheckList);
router.get('/checkList/all', checkListController.getAllCheckList);
router.put('/checkList/update/:checkListId', checkListController.updateCheckList);
router.get('/checkList/find/:checkListId', checkListController.getCheckList);
router.delete('/checkList/delete/:checkListId', checkListController.deleteCheckList);
//router.get('/CheckList/permission', CheckListController.getPermission);

module.exports = router;