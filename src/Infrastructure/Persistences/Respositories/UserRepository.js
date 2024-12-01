const BaseUnitOfWork = require('./BaseUnitOfWork');
const mongoose = require('mongoose');
const { hashPassword } = require('../../../Application/Common/Helpers/passwordUtils');
const { UserWithBase } = require('../../../Domain/Models/UserAccount');

class UserRepository extends BaseUnitOfWork {
    constructor() {
        super();
    }

    async createUser(userData, session) {
        try {
            const { password, username } = userData;

            const hashedPassword = await hashPassword(password);
            console.log(username);
            const user = await UserWithBase.create(
                [
                    {
                        username: username,
                        password: hashedPassword,
                    }
                ],
                { session }
            );

            return user[0];
        } catch (error) {
            throw new Error(`Error occurred at createUser in UserRepository: ${error.message}`);
        }
    }

    async checkDuplicateUsername(username, queryData) {
        try {
            const data = {
                username: username,
                isDeleted: queryData.isDeleted,
                isActive: queryData.isActive,
                roleId: queryData.roleId
            };
            const user = await UserWithBase.findOne(data);
            return !!user;
        } catch (error) {
            throw new Error(`Error occurred at checkDuplicateUsername in UserRepository: ${error.message}`);
        }
    }

    async getUserByUsername(username, queryData) {
        try {
            const query = {
                username,
                isDeleted: queryData.isDeleted,
                isActive: queryData.isActive,
            };
            const user = await UserWithBase.findOne(query).lean();
            return user;
        } catch (error) {
            throw new Error(`Error at getUserByUsername in UserRepository: ${error.message}`);
        }
    }

    async getUserById(userId, queryData) {
        try {
            const query = {
                _id: userId,
                ...queryData
            };
            const user = await UserWithBase.findOne(query).lean();
            return user;
        } catch (error) {
            throw new Error(`Error at getUserById in UserRepository: ${error.message}`);
        }
    }

    async deleteUserById(userId, queryData, session) {
        try {
            const query = {
                _id: userId,
                isDeleted: queryData.isDeleted,
                isActive: queryData.isActive
            };
            const softDelete = {
                updatedAt: Date.now(),
                isDeleted: true,
                isActive: false
            };
            await UserWithBase.updateOne(query, softDelete, { session });
            return userId;
        } catch (error) {
            throw new Error(`Error at deleteUserById in UserRepository: ${error.message}`);
        }
    }

    async updateUserById(userId, userData, session) {
        try {
            const _id = new mongoose.Types.ObjectId(userId);
            const updateData = {
                ...userData,
                updatedAt: Date.now()
            };
            await UserWithBase.findByIdAndUpdate(_id, updateData, { session });
        } catch (error) {
            throw new Error(`Error at updateUserById in UserRepository: ${error.message}`);
        }
    }

    async changePassword(userId, userData, session) {
        try {
            const hashedPassword = await hashPassword(userData.password);

            const query = {
                password: hashedPassword,
                updatedAt: Date.now()
            };
            const user = await UserWithBase.findByIdAndUpdate(userId, query, { session });
            return user;
        } catch (error) {
            throw new Error(`Error at changePassword in UserRepository: ${error.message}`);
        }
    }
}

module.exports = UserRepository;
