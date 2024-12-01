const jwt = require("jsonwebtoken");
require("dotenv").config();

async function encodeJwt(user) {
    const data = {
        userId: user._id
    };

    if (user.companyId) {
        data.companyId = user.companyId;
    }

    const accessToken = await jwt.sign(
        data,
        process.env.REACT_APP_JWT_SECRET || '',
        { algorithm: 'HS256', expiresIn: process.env.REACT_APP_EXPIRE_TOKEN }
    );

    const refreshToken = await jwt.sign(
        data,
        process.env.REACT_APP_REFRESH_TOKEN_SECRET || '',
        { algorithm: 'HS256', expiresIn: process.env.REACT_APP_EXPIRE_REFRESH_TOKEN }
    );

    return {
        accessToken,
        refreshToken
    };
}

module.exports = { encodeJwt };
