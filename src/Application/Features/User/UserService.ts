import UserRepository from "../../../Infrastructure/Persistences/Respositories/UserRepository";
import {CoreException} from '../../Common/Exceptions/CoreException';
import IUserRepository from "../../Persistences/IRepositories/IUserRepository";
import {StatusCodeEnums} from '../../../Domain/Enums/StatusCodeEnums';
import IUserService from "../../Persistences/IServices/IUserService";
import {comparePassword} from "../../Common/Helpers/passwordUtils";
import {encodeJwt} from "../../Common/Helpers/jwtUtils";
import IRoleRepository from "../../Persistences/IRepositories/IRoleRepository";
import RoleRepository from "../../../Infrastructure/Persistences/Respositories/RoleRepository";
import {LoginResponse} from "./Responses/LoginResponse";
import {CreateUserResponse} from "./Responses/CreateUserResponse";
import {GetUserResponse} from "./Responses/GetUserResponse";
import {GetAllUserResponse} from "./Responses/GetAllUserResponse";
import {DeleteUserResponse} from "./Responses/DeleteUserResponse";
import {UpdateUserResponse} from "./Responses/UpdateUserResponse";
import mongoose from 'mongoose';
const jwt = require('jsonwebtoken');

export default class UserService implements IUserService {
    private userRepository: IUserRepository = new UserRepository();
    private roleRepository: IRoleRepository = new RoleRepository();

    async registerAccount(data: any, roleName: string): Promise<CreateUserResponse | CoreException> {
        const session = await this.userRepository.startTransaction();
        try {
            const userData: any = {
                username: data.username,
                isActived: true,
                isDeleted: false
            }
            const roleData: any = {
                name: roleName,
                isActived: true,
                isDeleted: false
            }
            const roleIdResult: any = await this.roleRepository.getRoleByRoleName(roleData);
            if (!roleIdResult || roleIdResult === undefined) return new CoreException(StatusCodeEnums.BadRequest_400, `Error occured with role`);

            const isExistUsername = await this.userRepository.getUserByUsername(userData);

            if (isExistUsername)
                return new CoreException(StatusCodeEnums.BadRequest_400, `Username is already exists`);

            const createUserData: any = {
                ...data,
                roleId: roleIdResult._id
            }


            const result: any = await this.userRepository.createUser(createUserData, session);
            await this.userRepository.commitTransaction();
            return new CreateUserResponse('created user successfully', StatusCodeEnums.Created_201, result);
        } catch (error: any) {
            await this.userRepository.abortTransaction();
            return new CoreException(StatusCodeEnums.InternalServerError_500, `Error occured at createUserService: ${error.message}`);
        }
    }

    async login(data: any): Promise<LoginResponse | CoreException> {
        try {
            const {username, password} = data;
            const userData: any = {
                username: username,
                isActived: true,
                isDeleted: false
            }
            const user: any = await this.userRepository.getUserByUsername(userData);
            console.log(user);
            if (!user || user === undefined) return new CoreException(StatusCodeEnums.InternalServerError_500, `Username or password is incorrect`);

            const isMatchPassword = await comparePassword(password, user.password);
            if (!isMatchPassword) return new CoreException(StatusCodeEnums.InternalServerError_500, `Username or password is incorrect`);

            const tokens = await encodeJwt(user);
            console.log(tokens);

            return new LoginResponse('Login successfully', StatusCodeEnums.OK_200, {accessToken: tokens.accessToken, refreshToken: tokens.refreshToken})
        } catch (error: any) {
            await this.userRepository.abortTransaction();
            return new CoreException(StatusCodeEnums.InternalServerError_500, `Error occured at loginUserService: ${error.message}`);
        }
    }

    async getUserById(userId: string): Promise<GetUserResponse | CoreException> {
        try {
            const userData: any = {
                _id: userId,
                isDeleted: false,
                isActived: true
            }

            const result: any = await this.userRepository.getUserById(userData);

            if (!result || result === undefined)
                return new CoreException(StatusCodeEnums.NotFound_404, 'User not found');

            return new GetUserResponse(`Get user's information successfully`, StatusCodeEnums.OK_200, result);
        } catch (error: any) {
            return new CoreException(StatusCodeEnums.InternalServerError_500, `Error occured at getUserByIdService: ${error.message}`);
        }
    }

    async getAllUser(userData: any): Promise<GetAllUserResponse | CoreException> {
        try {
            const {username, fullName, roleName} = userData;
            const allUserData: any = {};
            if(username != undefined){
                allUserData.username = {$regex: username, $options: 'i'};
            }
            if(fullName != undefined){
                allUserData.fullName = {$regex: fullName, $options: 'i'};
            }
            if(roleName != undefined){
                if(Array.isArray(roleName)){
                    let roleId: any[] = [];
                    for (const name of roleName) {
                        const roleData: any = {
                            name: name,
                            isActived: true,
                            isDeleted: false,
                        };
                        const roleIdResult: any = await this.roleRepository.getRoleByRoleName(roleData);
                        if (roleIdResult) {
                            const id = new mongoose.Types.ObjectId(roleIdResult._id);
                            roleId.push(id);
                        }
                    }
                }else{
                    const roleData: any = {
                        name: roleName,
                        isActived: true,
                        isDeleted: false
                    };
                    const roleIdResult: any = await this.roleRepository.getRoleByRoleName(roleData);
                    if(roleIdResult){
                        allUserData.roleId =  roleIdResult._id;
                    }
                }
            }
            allUserData.isActived = true;
            allUserData.isDeleted = false;

            const result: any = await this.userRepository.getAllUser(allUserData);

            if (!result || result === undefined)
                return new CoreException(StatusCodeEnums.NotFound_404, 'User not found');

            return new GetAllUserResponse(`Get user's information successfully`, StatusCodeEnums.OK_200, result);
        } catch (error: any) {
            return new CoreException(StatusCodeEnums.InternalServerError_500, `Error occured at getUserByIdService: ${error.message}`);
        }
    }

    async deleteUserById(userId: string): Promise<DeleteUserResponse | CoreException> {
        const session = await this.userRepository.startTransaction();
        try {
            const userData: any = {
                _id: userId,
                isDeleted: false,
                isActived: true
            }

            const user = await this.userRepository.getUserById(userData);
            if (!user || user === undefined)
                return new CoreException(StatusCodeEnums.BadRequest_400, 'User is not found!')

            const result: any = await this.userRepository.deleteUserById(userData, session);
            await this.userRepository.commitTransaction();
            return new DeleteUserResponse('deleted user successfully', StatusCodeEnums.OK_200, result);
        } catch (error: any) {
            await this.userRepository.abortTransaction();
            return new CoreException(StatusCodeEnums.InternalServerError_500, `Error occured at updateProfileService: ${error.message}`);
        }
    }

    async updateUserById(userId: string, updateData: any): Promise<UpdateUserResponse | CoreException> {
        const session = await this.userRepository.startTransaction();
        try {
            const userData = {
                _id: userId,
                isDeleted: false,
                isActived: true
            }
            const user = await this.userRepository.getUserById(userData);
            if (!user || user === undefined)
                return new CoreException(StatusCodeEnums.BadRequest_400, 'User is not found!')

            const result: any = await this.userRepository.updateUserById(userData, updateData, session);
            await this.userRepository.commitTransaction()
            return new UpdateUserResponse('updated user successfully', StatusCodeEnums.OK_200, result);
        } catch (error: any) {
            await this.userRepository.abortTransaction();
            return new CoreException(StatusCodeEnums.InternalServerError_500, `Error occured at updateProfileService: ${error.message}`);
        }
    }

    async changePassword(userId: string, updatePasswordData: any): Promise<LoginResponse | CoreException> {
        const session = await this.userRepository.startTransaction();

        try {
            const userData = {
                _id: userId,
                isDeleted: false,
                isActived: true
            };

            const user: any = await this.userRepository.getUserById(userData);
            if (!user || user === undefined)
                return new CoreException(StatusCodeEnums.BadRequest_400, 'User is not found!');

            const isMatchPassword = await comparePassword(updatePasswordData.oldPassword, user.password);
            if (!isMatchPassword) return new CoreException(StatusCodeEnums.InternalServerError_500, `Old password is incorrect`);

            const query = {
                password: updatePasswordData.newPassword,
                ...userData
            }

            const result: any = await this.userRepository.changePassword(userData, query, session);

            await this.userRepository.commitTransaction();

            const tokens = await encodeJwt(result);

            return new LoginResponse('Change pass successfully', StatusCodeEnums.OK_200, {
                accessToken: tokens.accessToken, refreshToken: tokens.refreshToken
            })
        } catch (error: any) {
            await this.userRepository.abortTransaction();
            return new CoreException(StatusCodeEnums.InternalServerError_500, `Error occured at updateProfileService: ${error.message}`);
        }
    }

    async getNewToken(refreshToken: any): Promise<any> {
        try {
            const decoded = jwt.verify(refreshToken, process.env.REACT_APP_REFRESH_TOKEN_SECRET);
            const accessToken = jwt.sign({ user: decoded.userId }, process.env.REACT_APP_EXPIRE_TOKEN, { expiresIn: '10h' });
            return { accessToken: accessToken };
        } catch (error: any) {
            return new CoreException(StatusCodeEnums.InternalServerError_500, `Error at getNewToken: ${error.message}`);
        }
    }
}