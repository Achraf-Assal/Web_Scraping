
import express from "express";
import { Index , Show , Store ,Delete , Update,Search} from "../controller/testController";
const route = express.Router();

route.get("/userAgent",Index);
route.post("/userAgent",Store);
route.get("/userAgent/:id",Show)
route.delete("/userAgent/:id",Delete);
route.put("/userAgent/:id", Update)
route.get("/SearchUserAgent", Search)
export default route;