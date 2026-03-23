import { Router } from "express";
import {
  confirmDeliveryHandler,
  releaseFundsHandler,
} from "../controllers/trade.controller";

const router = Router();

router.post("/trades/:id/confirm", confirmDeliveryHandler);
router.post("/trades/:id/release", releaseFundsHandler);

export default router;
