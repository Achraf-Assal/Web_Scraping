import mongoose, { mongo, Document, Model } from "mongoose";
import isEmail from "validator/lib/isEmail";
import { comparePasswor } from "../handlers/CompareHandler";
const bcrypt = require('bcrypt')


interface IUser {
    email: string;
    password: string;
    // isDeleted?: boolean;
    // deletedAt?: Date;
}

export interface IUserDocument extends IUser, Document {
    // You can add instance methods here if needed
}

interface IUserModel extends Model<IUserDocument> {
    login(email: string, password: string): Promise<IUserDocument | null>;
}

const User_schema = new mongoose.Schema({
    email:
    {
        type: String,
        require: [true, 'email is required to signup'],
        unique: true,
        validate: [isEmail, 'Please enter a valid email addres ']
    },
    password: {
        type: String,
        require: [true, 'password is required to signup'],
        minLength: [8, 'the minmal length for password is 8 character']
    },
    isDeleted: {
        type: Boolean
    },
    deletedAt: {
        type: Date
    }
})

// User_schema.post('save',(docs:any,next:any)=>{
//     console.log('user has been saved',docs);
//     next();
// })
User_schema.pre<IUserDocument>('save', async function (next: any) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

User_schema.statics.login = async function (email: string, password: string) {
    return new Promise(async (resolve: any, reject: any) => {

            const user = await this.findOne({ email });
            comparePasswor(password, user).then((user: any) => {
                resolve(user);
            }).catch((err: any) => {
                reject({
                     error:err.error,
                     statusCode: 401
                });
            })
    });

};

const User = mongoose.model<IUserDocument, IUserModel>('User', User_schema);

export default User;