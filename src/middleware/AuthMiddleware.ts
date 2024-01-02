const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

export const requireAuth = async (req: any, res: any, next: any) => {
    try {
        console.log(req.cookies);
        const secretKey: String = process.env.TOKEN_KEY as String;
        const token = req.cookies.jwt;
        if (token) {
            console.log(secretKey);
            await jwt.verify(token, "Achraf_BodyGard7-I-WANT/4_WS+9568", (err: any, decodedToken: any) => {
                if (err) {
                    res.redirect('/login');
                    console.log(err.message);
                    
                } else {
                    console.log(decodedToken);
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
