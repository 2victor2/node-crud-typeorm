import { Router } from "express";
import UserController from "../controllers/users.controller";

const routes = Router();
const userController = new UserController();

routes.post("", userController.store);
routes.get("", userController.index);
routes.get("/me", userController.show);

export default routes;
