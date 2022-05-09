import express, { NextFunction, Request, Response } from "express";
import userRouter from "./routes/user.route";
import sessionsRouter from "./routes/sessions.route";
import { AppError } from "./errors/appError";

const app = express();
const port = 3000;
app.use(express.json());
app.use("/users", userRouter);
app.use("/sessions", sessionsRouter);
app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(process.env.PORT || port, () => {
  console.log(`App running on port ${process.env.PORT || port}!`);
});
