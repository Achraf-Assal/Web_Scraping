"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswor = void 0;
const bcrypt = require('bcrypt');
function comparePasswor(password, user) {
    return new Promise((resolve, reject) => {
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result == false) {
                    console.log("incorrect password");
                    reject(new Error("incorrect password"));
                }
                else {
                    resolve(user);
                }
            });
        }
        else {
            console.log("incorrect email");
            reject(new Error("incorrect email"));
        }
    });
}
exports.comparePasswor = comparePasswor;
