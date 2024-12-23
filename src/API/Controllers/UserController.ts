import UserService from "../../Application/Features/User/UserService";
import IUserService from "../../Application/Persistences/IServices/IUserService";

import {StatusCodeEnums} from "../../Domain/Enums/StatusCodeEnums";
import {Request, Response} from 'express';
import {CreateUserRequest} from "../../Application/Features/User/Requests/CreateUserRequest";
import {LoginRequest} from "../../Application/Features/User/Requests/LoginRequest";
import {UpdateUserRequest} from "../../Application/Features/User/Requests/UpdateUserRequest";
import {ChangePasswordRequest} from '../../Application/Features/User/Requests/ChangePasswordRequest';

export default class UserController {
    private userService: IUserService = new UserService();

    registerAccount = async (req: Request<CreateUserRequest, any, any>, res: Response) => {
        try {
            const {
                username,
                password,
                fullName,
                address,
                phoneNumber,
                email
            } = req.body;

            const data = {
                username,
                password,
                fullName,
                address,
                phoneNumber,
                email
            }

            // console.log(data);

            const result = await this.createUser(data, 'User');


            if (result.error != undefined || result.error) {
                return res.status(result.statusCode).json({error: result.error});
            }
            return res.status(StatusCodeEnums.Created_201).json(result);

        } catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message})
        }
    }

    registerAccountEmployee = async (req: Request<CreateUserRequest, any, any>, res: Response) => {
        try {
            const {
                username,
                password,
                fullName,
                address,
                phoneNumber,
                email,
                roleName
            } = req.body;

            const data = {
                username,
                password,
                fullName,
                address,
                phoneNumber,
                email,
                roleName
            }

            // console.log(data);

            const result = await this.createUser(data, roleName);


            if (result.error != undefined || result.error) {
                return res.status(result.statusCode).json({error: result.error});
            }
            return res.status(StatusCodeEnums.Created_201).json(result);

        } catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message})
        }
    }

    private createUser = async (userData: any, roleName: string): Promise<any> => {
        const result = await this.userService.registerAccount(userData, roleName);
        return result;
    }

    login = async (req: Request<LoginRequest, any, any>, res: Response) => {
        try {
            
            const result = await this.handleLogin(req.body);
            if (result.error != undefined || result.error) {
                return res.status(result.statusCode).json({error: result.error});
            }

            res.cookie('access_token', result.data?.accessToken, {
                httpOnly: true,
                maxAge: 10 * 60 * 60 * 1000,
            })

            return res.status(StatusCodeEnums.OK_200).json(result);
        } catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message})
        }
    }

    private handleLogin = async (userData: any): Promise<any> => {
        const {username, password} = userData;
        const result = await this.userService.login({username, password});
        return result;
    }

    logout = async (req: Request, res: Response): Promise<Response> => {
        try {
            res.clearCookie('access_token', {
                httpOnly: true, 
            });

            return res.status(StatusCodeEnums.OK_200).json({
                message: 'Logout successful'
            });
        } catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({
                error: error.message
            });
        }
    }

    getUserById = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = req.params.id;
            if (!id)
                return res.status(400).json({error: 'Please check login status'})
            const result = await this.userService.getUserById(id);

            return res.status(StatusCodeEnums.OK_200).json(result);
        } catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message})
        }
    }

    getAllEmployee = async (req: Request, res: Response): Promise<Response> =>{
        try {
            const {username, fullName} = req.body;
            const userData: any = {
                username: username,
                fullName: fullName,
                roleName: "Employee"
            }
            const result = await this.userService.getAllUser(userData);

            return res.status(StatusCodeEnums.OK_200).json(result);
        } catch(error: any){
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message})
        }
    }

    getAllUser = async (req: Request, res: Response): Promise<Response> =>{
        try {
            const {username, fullName, roleName} = req.body;
            const userData: any = {
                username: username,
                fullName: fullName,
                roleName: roleName
            }
            const result = await this.userService.getAllUser(userData);

            return res.status(StatusCodeEnums.OK_200).json(result);
        } catch(error: any){
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message})
        }
    }

    deleteUserById = async (req: Request, res: Response): Promise<any> => {
        try {
            const userId: string = req.params.id;

            const result = await this.userService.deleteUserById(userId);

            return res.status(StatusCodeEnums.OK_200).json(result);
        } catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message})
        }
    }

    updateUserById = async (req: Request<UpdateUserRequest, any, any>, res: Response): Promise<any> => {
        try {
            if ((req as any)?.file) {
                const filename: string = (req as any).file?.filename;
                const fullpath: string = `uploads${req.url}/${filename}`;
                req.body.imagePath = fullpath;
            }

            const userId: string = (req as any).user?.userId;
            if (!userId)
                return res.status(400).json({error: 'Please check login status'})

            const updateData = req.body as any;
            const result = await this.userService.updateUserById(userId, updateData);

            return res.status(StatusCodeEnums.OK_200).json(result);
        } catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message})
        }
    }

    changePassword = async (req: Request<ChangePasswordRequest, any, any>, res: Response): Promise<any> => {
        try {
            var userId: string = '';
            if ((req as any).user?.userId)
                userId = (req as any).user.userId;
            else
                return res.status(400).json({error: 'Please check login status'})

            const data = req.body;

            const result = await this.userService.changePassword(userId, data);

            return res.status(StatusCodeEnums.OK_200).json(result);
        } catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message})
        }
    }

    getNewToken = async (req: Request, res: Response): Promise<any> => {
        try {
            const refreshToken = req.body.refreshToken;
            if (!refreshToken)
                return res.status(401).send('Access Denied. No refresh token provided.');

            const result = await this.userService.getNewToken(refreshToken);
            return res.status(StatusCodeEnums.OK_200).json(result);
        } catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message})
        }
    }
}