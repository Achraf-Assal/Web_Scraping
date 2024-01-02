import express from "express";
import { SignUp,Login} from "../controller/AuthController";
const UserRoute = express.Router();

UserRoute.post("/signup",SignUp);


UserRoute.post("/login",Login);
  export default UserRoute;
