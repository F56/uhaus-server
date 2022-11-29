import userRoutes from "./user.routes";
import roomRoutes from "./room.routes";
import { Router } from "express";

const router = Router();

router.use(userRoutes, roomRoutes);
router.use("/api", router);

export default router;
