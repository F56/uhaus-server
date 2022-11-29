import userRoutes from "./user.routes";
import { Router } from "express";

const router = Router();

router.use(userRoutes);
router.use("/api", router);

export default router;
