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
import {DeleteUserResponse} from "./Responses/DeleteUserResponse";
import {UpdateUserResponse} from "./Responses/UpdateUserResponse";
const jwt = require('jsonwebtoken');

class UserService implements IUserService {
    private userRepository: IUserRepository = new UserRepository();
    private roleRepository: IRoleRepository = new RoleRepository();

    async registerAccount(data: any, roleName: string): Promise<CreateUserResponse | CoreException> {
        const session = await this.userRepository.startTransaction();
        try {
            const baseQuery: any = {
                isDeleted: false,
                isActive: true
            }
            // console.log('roleName', roleName);
            const roleIdResult = await this.roleRepository.getRoleIdByRoleName(roleName, baseQuery);
            // console.log('roleIdResult', roleIdResult);
            if (!roleIdResult) return new CoreException(StatusCodeEnums.BadRequest_400, `Error occured with role`);

            const isExistUsername = await this.userRepository.checkDuplicateUsername(data.username, {
                ...baseQuery
            })

            if (isExistUsername)
                return new CoreException(StatusCodeEnums.BadRequest_400, `Username is already exists`);

            let createUserData: any = {
                ...data
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
            /*const role: any = await this.roleRepository.getRoleIdByRoleName(roleName, {
                isDeleted: false,
                isActive: true
            });
            if (!role) return new CoreException(StatusCodeEnums.InternalServerError_500, `Role is not suitable`);*/
            const user = await this.userRepository.getUserByUsername(username, {isDeleted: false, isActive: true});
            if (!user) return new CoreException(StatusCodeEnums.InternalServerError_500, `Username or password is incorrect`);

            const isMatchPassword = await comparePassword(password, user.password);
            if (!isMatchPassword) return new CoreException(StatusCodeEnums.InternalServerError_500, `Username or password is incorrect`);

            const tokens = await encodeJwt(user);

            return new LoginResponse('Login successfully', StatusCodeEnums.OK_200, {
                accessToken: tokens.accessToken, refreshToken: tokens.refreshToken
            })
        } catch (error: any) {
            await this.userRepository.abortTransaction();
            return new CoreException(StatusCodeEnums.InternalServerError_500, `Error occured at loginUserService: ${error.message}`);
        }
    }

    async getUserById(id: any): Promise<GetUserResponse | CoreException> {
        try {
            const queryData: any = {
                isDeleted: false,
                isActive: true
            }
            // const roleIdResult = await this.roleRepository.getRoleIdByRoleName('Candidate', queryData);
            // if (!roleIdResult) return new CoreException(StatusCodeEnums.BadRequest_400, `Error occured with role`);

            const result = await this.userRepository.getUserById(id as string, {...queryData});

            if (result === null)
                return new CoreException(StatusCodeEnums.NotFound_404, 'User not found');

            return new GetUserResponse(`Get user's information successfully`, StatusCodeEnums.OK_200, result);
        } catch (error: any) {
            return new CoreException(StatusCodeEnums.InternalServerError_500, `Error occured at getUserByIdService: ${error.message}`);
        }
    }

    async deleteUserById(userId: any): Promise<DeleteUserResponse | CoreException> {
        const session = await this.userRepository.startTransaction();
        try {
            const queryData: any = {
                isDeleted: false,
                isActive: true
            }

            const checkExistUser = await this.userRepository.getUserById(userId as string, queryData);
            if (!checkExistUser)
                return new CoreException(StatusCodeEnums.BadRequest_400, 'User is not found!')

            const result: any = await this.userRepository.deleteUserById(userId as string, queryData, session);
            await this.userRepository.commitTransaction();
            return new DeleteUserResponse('deleted user successfully', StatusCodeEnums.OK_200, result);
        } catch (error: any) {
            await this.userRepository.abortTransaction();
            return new CoreException(StatusCodeEnums.InternalServerError_500, `Error occured at updateProfileService: ${error.message}`);
        }
    }

    async updateUserById(userId: any, updateData: any): Promise<UpdateUserResponse | CoreException> {
        const session = await this.userRepository.startTransaction();
        try {
            const queryData = {
                isDeleted: false,
                isActive: true
            }
            const checkExistUser = await this.userRepository.getUserById(userId as string, queryData);
            if (!checkExistUser)
                return new CoreException(StatusCodeEnums.BadRequest_400, 'User is not found!')

            const result: any = await this.userRepository.updateUserById(userId as string, updateData, session);
            await this.userRepository.commitTransaction()
            return new UpdateUserResponse('updated user successfully', StatusCodeEnums.OK_200, result);
        } catch (error: any) {
            await this.userRepository.abortTransaction();
            return new CoreException(StatusCodeEnums.InternalServerError_500, `Error occured at updateProfileService: ${error.message}`);
        }
    }

    async changePassword(userId: string, data: any): Promise<LoginResponse | CoreException> {
        const session = await this.userRepository.startTransaction();

        try {
            const queryData = {
                isDeleted: false,
                isActive: true
            };

            const user = await this.userRepository.getUserById(userId as string, queryData);
            if (!user)
                return new CoreException(StatusCodeEnums.BadRequest_400, 'User is not found!');

            const isMatchPassword = await comparePassword(data.oldPassword, user.password);
            if (!isMatchPassword) return new CoreException(StatusCodeEnums.InternalServerError_500, `Old password is incorrect`);

            const query = {
                password: data.newPassword,
                ...queryData
            }

            const result: any = await this.userRepository.changePassword(userId, query, session);

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

export default UserService;