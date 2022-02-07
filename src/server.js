import express from "express";
import morgan from "morgan";
import session from "express-session"; // before our routers
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import req from "express/lib/request";
import res from "express/lib/response";
import { localMiddlewear } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({extended:true}));
 
// before our routers
// Session middle ware is going to start to  remember every body that comes to our web site 
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false , 
        cookie: {
            maxAge: 20000,
        },
        store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    })
)

app.use(localMiddlewear);

app.use("/", rootRouter); 
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;