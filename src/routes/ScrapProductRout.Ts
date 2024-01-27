import express from "express";
import {Index} from "../controller/ScrapProductController";
import rateLimitMiddleware from "../middleware/RequastLimitMiddleware";
const ProductRoute = express.Router();

ProductRoute.get("/product", rateLimitMiddleware(),Index);
  export default ProductRoute;