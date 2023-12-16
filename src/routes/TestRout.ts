
import express from "express";
import { Index , Show , Store ,Delete , Update,Search,SoftDelete,Deleted} from "../controller/testController";
const route = express.Router();

// Users_Agent
route.route("/user-agent")
  .get(Index)
  .post(Store);

route.route("/user-agent/:id")
  .get(Show)
  .put(Update)
  .delete(Delete);

// Search
route.get("/search-users-agen", Search);

// Soft Delete
route.put("/soft-delete/users-agen/:id", SoftDelete);
// Deleted
route.get("/soft-delete/users-agent", Deleted);
export default route;