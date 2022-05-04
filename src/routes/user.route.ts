import { Router } from "express";
import UserController from "../controllers/users.controller";
import authUserMiddleware from "../middlewares/userAuth.middleware";

const routes = Router();
const userController = new UserController();

routes.post("", userController.store);
routes.get("", authUserMiddleware, userController.index);
routes.get("/me", authUserMiddleware, userController.show);
routes.delete("/me", authUserMiddleware, userController.delete);
routes.patch("/me/update-password", authUserMiddleware, userController.update);
export default routes;
