const UserService = require("../../Application/Services/UserService");
const { StatusCodeEnums } = require("../../Domain/Enums/StatusCodeEnums");

class UserController {
    constructor() {
        this.userService = new UserService();
    }

    registerAccountCandidate = async (req, res) => {
        try {
            const {
                username,
                password
            } = req.body;
            const data = {
                username,
                password
            };

            const result = await this.createUser(data, "User");

            if (result.error != undefined || result.error) {
                return res.status(result.statusCode).json({ error: result.error });
            }

            return res.status(201).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };

    createUser = async (userData, rolename) => {
        const result = await this.userService.registerAccount(userData, rolename);
        return result;
    };

    login = async (req, res) => {
        try {
            const { username, password } = req.body;
            const result = await this.userService.login({ username, password });

            if (result.error != undefined || result.error) {
                return res.status(result.statusCode).json({ error: result.error });
            }

            res.cookie('access_token', result.data?.accessToken, {
                httpOnly: true,
                maxAge: 10 * 60 * 60 * 1000, // Expires after 10 hours
            });

            return res.status(201).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };

    changePassword = async (req, res) => {
        try {
            let userId = '';
            if (req.user?.userId) {
                userId = req.user.userId;
            } else {
                return res.status(400).json({ error: 'Please check login status' });
            }

            const data = req.body;
            const result = await this.userService.changePassword(userId, data);

            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };

    getProfileEmployeeById = async (req, res) => {
        try {
            const { _id } = req.params;

            if (!_id) {
                return res.status(400).json({ error: 'Invalid user id' });
            }

            const result = await this.userService.getEmployeeProfile(_id);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };
}

module.exports = UserController;
