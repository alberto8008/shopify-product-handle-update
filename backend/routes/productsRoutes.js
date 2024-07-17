import express from "express";
import {
  getProductsCount,
  changeProductsHandle,
} from "../controllers/productsController.js";

const router = express.Router();

router.route("/count").get(getProductsCount);
router.route("/change-handle").get(changeProductsHandle);

export default router;
