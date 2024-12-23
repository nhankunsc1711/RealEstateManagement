import ContractController from "../Controllers/ContractController";
import {authenticateMiddleware} from "../Middlewares/authMiddleware";
//import {hasPermission} from "../Middlewares/checkPermission";
//import {BitwisePermissionEnums} from "../../Domain/Enums/PermissionEnums";

const express = require('express');

const {authenticateToken} = require("../Middlewares/authMiddleware");
const router = express.Router();
const contractController = new ContractController();

router.post('/contract/create/:checkListId', authenticateMiddleware, contractController.createContract);
router.get('/contract/all', authenticateMiddleware, contractController.getAllContract);
router.put('/contract/update/:contractId', authenticateMiddleware, contractController.updateContract);
router.get('/contract/find/:contractId', authenticateMiddleware, contractController.getContract);
router.delete('/contract/delete/:contractId', authenticateMiddleware, contractController.deleteContract);
//router.get('/Contract/permission', ContractController.getPermission);

module.exports = router;