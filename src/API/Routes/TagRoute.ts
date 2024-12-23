import TagController from "../Controllers/TagController";
import {authenticateMiddleware} from "../Middlewares/authMiddleware";
//import {hasPermission} from "../Middlewares/checkPermission";
//import {BitwisePermissionEnums} from "../../Domain/Enums/PermissionEnums";

const express = require('express');

const {authenticateToken} = require("../Middlewares/authMiddleware");
const router = express.Router();
const tagController = new TagController();

router.post('/tag/create', tagController.createTag);
router.get('/tag/all', tagController.getAllTag);
router.put('/tag/update/:tagId', tagController.updateTag);
router.get('/tag/find/:tagId', tagController.getTag);
router.delete('/tag/delete/:tagId', tagController.deleteTag);
//router.get('/Tag/permission', tagController.getPermission);

module.exports = router;