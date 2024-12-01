const UserRepository = require("../../Infrastructure/Persistences/Respositories/UserRepository");
const { StatusCodeEnums } = require('../../Domain/Enums/StatusCodeEnums');
const { CoreException } = require('../Common/Exceptions/CoreException');
const { comparePassword } = require("../Common/Helpers/passwordUtils");
const { encodeJwt } = require("../Common/Helpers/jwtUtils");
const jwt = require('jsonwebtoken');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async registerAccount(data, roleName) {
        const session = await this.userRepository.startTransaction();
        try {
            const baseQuery = {
                isDeleted: false,
                isActive: true
            };
            const isExistUsername = await this.userRepository.checkDuplicateUsername(data.username, {
                ...baseQuery
            });
            if (isExistUsername)
                throw new CoreException(400, `Username already exists`);

            const createUserData = {
                ...data,
                ...baseQuery
            };
            const result = await this.userRepository.createUser(createUserData, session);
            console.log(result);
            await this.userRepository.commitTransaction();
            return result;
        } catch (error) {
            await this.userRepository.abortTransaction();
            console.log(error);
            throw new CoreException(500, `Error occurred at createUserService: ${error.message}`);
        }
    }

    async login(data) {
        try {
            const { username, password } = data;

            const user = await this.userRepository.getUserByUsername(username, { isDeleted: false, isActive: true });
            if (!user) throw new CoreException(500, `Username or password is incorrect`);

            const isMatchPassword = await comparePassword(password, user.password);
            if (!isMatchPassword) throw new CoreException(500, `Username or password is incorrect`);

            const tokens = await encodeJwt(user);

            return tokens;
        } catch (error) {
            throw new CoreException(500, `Error occurred at loginUserService: ${error.message}`);
        }
    }

    async getUserCandidateById(id) {
        try {
            const queryData = {
                isDeleted: false,
                isActive: true
            };

            const result = await this.userRepository.getUserById(id, { ...queryData });
            if (!result)
                throw new CoreException(404, 'User not found');

            return result;
        } catch (error) {
            throw new CoreException(500, `Error occurred at getUserByIdService: ${error.message}`);
        }
    }

    async deleteUserById(userId) {
        const session = await this.userRepository.startTransaction();
        try {
            const queryData = {
                isDeleted: false,
                isActive: true
            };

            const checkExistUser = await this.userRepository.getUserById(userId, queryData);
            if (!checkExistUser)
                throw new CoreException(400, 'User not found!');

            const result = await this.userRepository.deleteUserById(userId, queryData, session);
            await this.userRepository.commitTransaction();
            return result;
        } catch (error) {
            await this.userRepository.abortTransaction();
            throw new CoreException(500, `Error occurred at deleteUserById: ${error.message}`);
        }
    }

    async updateProfile(userId, updateData) {
        const session = await this.userRepository.startTransaction();
        try {
            const queryData = {
                isDeleted: false,
                isActive: true
            };

            const checkExistUser = await this.userRepository.getUserById(userId, queryData);
            if (!checkExistUser)
                throw new CoreException(400, 'User not found!');

            const result = await this.userRepository.updateUserById(userId, updateData, session);
            await this.userRepository.commitTransaction();
            return result;
        } catch (error) {
            await this.userRepository.abortTransaction();
            throw new CoreException(500, `Error occurred at updateProfileService: ${error.message}`);
        }
    }

    async changePassword(userId, data) {
        const session = await this.userRepository.startTransaction();
        try {
            const queryData = {
                isDeleted: false,
                isActive: true
            };

            const user = await this.userRepository.getUserById(userId, queryData);
            if (!user)
                throw new CoreException(400, 'User not found!');

            const isMatchPassword = await comparePassword(data.oldPassword, user.password);
            if (!isMatchPassword) throw new CoreException(500, `Old password is incorrect`);

            const query = {
                password: data.newPassword,
                ...queryData
            };

            const result = await this.userRepository.changePassword(userId, query, session);
            await this.userRepository.commitTransaction();

            const tokens = await encodeJwt(result);

            return tokens;
        } catch (error) {
            await this.userRepository.abortTransaction();
            throw new CoreException(500, `Error occurred at changePassword: ${error.message}`);
        }
    }

    async getEmployeeProfile(_id) {
        try {
            const queryData = {
                isDeleted: false,
                isActive: true
            };

            const result = await this.userRepository.getUserById(_id, queryData);
            if (!result)
                throw new CoreException(404, 'User not found');
            return result;
        } catch (error) {
            throw new CoreException(500, `Error occurred at getEmployeeProfile: ${error.message}`);
        }
    }

    async getNewToken(refreshToken) {
        try {
            const decoded = jwt.verify(refreshToken, process.env.REACT_APP_REFRESH_TOKEN_SECRET);
            const accessToken = jwt.sign(
                { user: decoded.userId },
                process.env.REACT_APP_JWT_SECRET,
                { expiresIn: process.env.REACT_APP_EXPIRE_TOKEN }
            );
            return { accessToken };
        } catch (error) {
            throw new CoreException(500, `Error occurred at getNewToken: ${error.message}`);
        }
    }
}

module.exports = UserService;
