import express from "express";
import morgan from "morgan";
import global from "./routers/globarouter";
import user from "./routers/userRouter";
import video from "./routers/videoRouter";

const PORT = 4000;

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger)
app.use("/", global);
app.use("/videos", video);
app.use("/users", user);

const handleListening = () => console.log(`Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);


// Middlewares 1. res.send 2. next()
// Protected Middleware  1. res.send 2. next()
// use first url, and then get ()