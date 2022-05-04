import { Router } from "express";
import SessionController from "../controllers/sessions.controller";

const routes = Router();
const sessionController = new SessionController();

routes.post("", sessionController.store);

export default routes;