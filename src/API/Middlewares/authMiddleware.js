const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const CryptoJS = require("crypto-js");
require('dotenv').config();
const CompanyRepository = require("../../Infrastructure/Persistences/Respositories/CompanyRepository");
const mongoose = require('mongoose');

function getAccessToken(req) {
    if (req.headers.authorization)
        return req.headers.authorization.indexOf(' ') >= 0 ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
    if (req.cookies || req.signedCookies)
        return req.cookies?.access_token || req.signedCookies?.access_token;
    if (req.headers?.cookie)
        return getTokenFromHeaderCookie(req.headers?.cookie);
    return null;
}

function getTokenFromHeaderCookie(headerCookie) {
    const splitCookie = headerCookie.split(';');
    let token = '';
    for (let element of splitCookie) {
        const key = element.split('=')[0].trim();
        if (key === 'access_token') {
            token = element.split('=')[1].trim();
            break;
        }
    }
    return token;
}

async function authenticateMiddleware(req, res, next) {
    try {
        const accessToken = getAccessToken(req);
        if (!accessToken || accessToken === 'undefined' || accessToken.split('.').length !== 3)
            return res.status(401).json({ error: 'No access token provided' });

        const verified = await jwt.verify(accessToken, process.env.REACT_APP_JWT_SECRET || '');

        if (!verified)
            return res.status(400).json({ error: 'Cannot authenticate, please check login status' });

        const data = {
            userId: verified.userId
        };

        if (verified.companyId)
            data.companyId = verified.companyId;

        req.user = data;
        return next();
    } catch (error) {
        return res.status(500).json({ error: `Error occured at authentication middleware: ${error.message}` });
    }
}

async function checkAuthenticateMiddleware(req, res, next) {
    try {
        const accessToken = getAccessToken(req);
        if (!accessToken || accessToken === 'undefined' || accessToken.split('.').length !== 3)
            return next();

        const verified = await jwt.verify(accessToken, process.env.REACT_APP_JWT_SECRET || '');

        if (!verified)
            return next();

        req.user = { userId: verified.userId };
        return next();
    } catch (error) {
        return res.status(500).json({ error: `Error occured at checkAuthentication middleware: ${error.message}` });
    }
}

async function checkApiKey(req, res, next) {
    const companyRepository = new CompanyRepository();
    try {
        if (!req.headers.authorization)
            return res.status(400).json({ error: `Please provide your api key` });

        const authorizeString = req.headers.authorization.indexOf(' ') >= 0 ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
        const apiKey = decodeURIComponent(authorizeString);

        const bytes = CryptoJS.AES.decrypt(apiKey, process.env.API_KEY_SECRET);
        const dataInfor = bytes.toString(CryptoJS.enc.Utf8);

        const companyId = dataInfor.split('-')[0];
        if (!mongoose.Types.ObjectId.isValid(companyId))
            return res.status(400).json({ error: `Api key is not authenticate` });

        const company = await companyRepository.getCompanyById({ _id: companyId, isDeleted: false, isActive: true, status: 'Accept' });

        if (!company) return res.status(400).json({ error: `Api key is not authenticate` });

        const isVerify = await bcrypt.compare(encodeURIComponent(apiKey), company.apiKey);
        if (!isVerify) return res.status(400).json({ error: `Api key is not authenticate` });

        req.user = { companyId: company._id };

        return next();
    } catch (error) {
        return res.status(500).json({ error: `Error occured at checkApiKey middleware: ${error.message}` });
    }
}

module.exports = {
    authenticateMiddleware,
    checkAuthenticateMiddleware,
    checkApiKey
};
