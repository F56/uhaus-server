import userController from "../controllers/user.controller";
import { Router } from "express";

const router = Router();
const userRoutes = Router();

router.post("/", userController.create);
router.get("/", userController.findAll);
router.get("/:id", userController.findOne);
router.put("/:id", userController.update);
router.delete("/:id", userController.remove);

userRoutes.use("/users", router);

export default userRoutes;
