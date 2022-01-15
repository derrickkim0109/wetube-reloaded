import express from "express";
import morgan from "morgan";
import global from "./routers/globarouter";
import user from "./routers/userRouter";
import video from "./routers/videoRouter";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({extended:true}));
app.use("/", global); 
app.use("/videos", video);
app.use("/users", user);

export default app;