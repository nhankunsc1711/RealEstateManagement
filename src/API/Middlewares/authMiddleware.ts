const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const CryptoJS = require("crypto-js")
require('dotenv').config();
// const Company = require('');
import mongoose from 'mongoose';

function getAccessToken(req: any): string | null | undefined {
    if (req.headers.authorization)
        return req.headers.authorization.indexOf(' ') >= 0 ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
    if (req.cookies || req.signedCookies)
        return req.cookies?.access_token || req.signedCookies?.access_token;
    if (req.headers?.cookie)
        return getTokenFromHeaderCookie(req.headers?.cookie)
    return null
}

function getTokenFromHeaderCookie(headerCookie: string): string | undefined {
    const splitCookie = headerCookie.split(';')
    let token: string = '';
    for (let element of splitCookie) {
        const key: string = element.split('=')[0].trim();
        if (key === 'access_token') {
            token = element.split('=')[1].trim();
            break;
        }
    }
    return token;
}

export async function authenticateMiddleware(req: any, res: any, next: any): Promise<any> {
    try {
        const accessToken: string | null | undefined = getAccessToken(req);
        if (!accessToken || accessToken === 'undefined' || accessToken.split('.').length !== 3)
            return res.status(401).json({error: 'No access token provided'})

        const verified = await jwt.verify(accessToken, process.env.REACT_APP_JWT_SECRET || '')

        if (!verified)
            return res.status(400).json({error: 'Cannot authenticate, please check login status'});

        const data: any = {
            userId: verified.userId
        } 

        if (verified.companyId)
            data.companyId = verified.companyId

        req.user = data;
        return next()
    } catch (error: any) {
        return res.status(500).json({error: `Error occured at authentication middleware: ${error.message}`})
    }
}

export async function checkAuthenticateMiddleware(req: any, res: any, next: any): Promise<any> {
    try {
        const accessToken: string | null | undefined = getAccessToken(req);
        if (!accessToken || accessToken === 'undefined' || accessToken.split('.').length !== 3)
            return next()

        const verified = await jwt.verify(accessToken, process.env.REACT_APP_JWT_SECRET || '')

        if (!verified)
            return next();

        req.user = {userId: verified.userId};
        return next()
    } catch (error: any) {
        return res.status(500).json({error: `Error occured at checkAuthentication middleware: ${error.message}`})
    }
}



module.exports = {
    authenticateMiddleware,
    checkAuthenticateMiddleware
}