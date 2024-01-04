import express from "express";
import { SignUp,Login,Logout} from "../controller/AuthController";
const UserRoute = express.Router();

UserRoute.post("/signup",SignUp);


UserRoute.post("/login",Login);

UserRoute.get("/logout",Logout);
  export default UserRoute;
