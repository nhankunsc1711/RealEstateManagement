import ContractController from "../Controllers/ContractController";
import {authenticateMiddleware} from "../Middlewares/authMiddleware";
//import {hasPermission} from "../Middlewares/checkPermission";
//import {BitwisePermissionEnums} from "../../Domain/Enums/PermissionEnums";

const express = require('express');

const {authenticateToken} = require("../Middlewares/authMiddleware");
const router = express.Router();
const contractController = new ContractController();

router.post('/Contract/create', authenticateMiddleware, contractController.createContract);
router.get('/Contract/all', authenticateMiddleware, contractController.getAllContract);
router.put('/Contract/update/:contractId', authenticateMiddleware, contractController.updateContract);
router.get('/Contract/find/:contractId', authenticateMiddleware, contractController.getContract);
router.delete('/Contract/delete/:contractId', authenticateMiddleware, contractController.deleteContract);
//router.get('/Contract/permission', ContractController.getPermission);

module.exports = router;