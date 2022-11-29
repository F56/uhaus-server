import roomController from "../controllers/room.controller";
import { Router } from "express";

const router = Router();
const roomRoutes = Router();

router.post("/", roomController.create);

roomRoutes.use("/rooms", router);

export default roomRoutes;
