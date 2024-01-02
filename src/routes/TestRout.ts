
import express from "express";
import { Index , Show , Store ,Delete , Update,Search,SoftDelete,Deleted} from "../controller/UserAgentController";
const UserAgentRoute = express.Router();

// Users_Agent
UserAgentRoute.route("/")
  .get(Index)
  .post(Store);

  UserAgentRoute.route("/:id")
  .get(Show)
  .put(Update)
  .delete(Delete);

// Search
UserAgentRoute.get("/search", Search);

// Soft Delete
UserAgentRoute.put("/soft-delete/:id", SoftDelete);
// Deleted
UserAgentRoute.get("/soft-delete", Deleted);


export default UserAgentRoute;