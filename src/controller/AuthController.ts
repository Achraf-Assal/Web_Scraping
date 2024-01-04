import User_schema ,{ IUserDocument } from "../models/User";
import { ErrorHandler , SuccasHandler} from "../handlers/ResponsHandler";
import { ValidationErrorHandler } from "../handlers/ValidationHandler";
import { HandelTokenCreation } from "../handlers/TokenHandler";
import { day } from "../GlobalVar";

export const SignUp = async (req : any,res : any)=>{
    try {
        const email = req.body.email.toLowerCase();
        const password = req.body.password.toLowerCase();
        const user = await new User_schema({
            email:email,
            password:password
        });
         
        let userExist  = await User_schema.findOne({email});
        if (userExist) {
            let succasMSG = {message: " user emil is alredy exist "};
            ErrorHandler(succasMSG,401,res);
        }else{

            let savedUser = await user.save();
            let token = HandelTokenCreation(savedUser.id,3);
            res.cookie('jwt',token,{httpOnly:true,maxAge:3*day*1000})
            let succasMSG = {message: " user has been signup ",
            "user":savedUser.email };
            SuccasHandler(succasMSG,200,res);
        }

    } catch (error:any) {
        let err = ValidationErrorHandler(error)
        ErrorHandler(err,401,res);
    }
}

export const Login = async (req : any,res : any)=>{
    try {
        const {email,password} = req.body ;
        const user:any = await User_schema.login(email,password).then(user => {return user})
        .catch(err=>{
            throw err;
        });
        
        let token = HandelTokenCreation(user._id,3);
             res.cookie('jwt',token,{httpOnly:true,maxAge:3*day*1000});
        let succasMSG = {message: " user has been login ",
             "User":user.email};
            SuccasHandler(succasMSG,200,res);
            
    } catch (error:any) {
        ErrorHandler({ 
            message: "Authentication failed",
            error: error.error.message || "An unexpected error occurred"
        },500,res);
    }
}

export const Logout = (req : any,res : any)=>{
    try {
        res.cookie('jwt', '', { maxAge: 1 });
        res.redirect('/');
    } catch (error) {
        
    }
}