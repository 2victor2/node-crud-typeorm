import express from "express";
import userRouter from "./routes/user.route";
import sessionsRouter from "./routes/sessions.route";

const app = express();
const port = 3000;
app.use(express.json());
app.use("/users", userRouter);
app.use("/sessions", sessionsRouter);

app.listen(process.env.PORT || port, () => {
  console.log(`App running on port ${process.env.PORT || port}!`);
});
