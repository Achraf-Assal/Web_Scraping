const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
import User from "../models/User";
dotenv.config();

export const requireAuth = async (req: any, res: any, next: any) => {
    try {
        const secretKey: String = process.env.TOKEN_KEY as String;
        const token = req.cookies.jwt;
        if (token) {
            await jwt.verify(token, "Achraf_BodyGard7-I-WANT/4_WS+9568", (err: any, decodedToken: any) => {
                if (err) {
                    res.redirect('/login');

                } else {
                    next();
                }
            });

        } else {
            res.redirect('/');
        }
    } catch (error) {
        console.log(error);
    }
}

export const checkUser = async (req: any, res: any, next: any) => {
    try {
        const secretKey: String = process.env.TOKEN_KEY as String;
        const token = req.cookies.jwt;
        if (token) {
            await jwt.verify(token,secretKey, async (err: any, decodedToken: any) => {
                if (err) {
                    res.locals.user = null;
                    next();
                } else {
                    let user = await User.findById(decodedToken.id);
                    res.locals.user = user;
                    next();
                }
            });

        } else {
            res.locals.user = null;
            next();
        }
    } catch (error) {
        console.log(error);
    }
}