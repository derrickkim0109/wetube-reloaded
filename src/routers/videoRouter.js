import express from "express";
import { getEdit, postEdit, getUpload, postUpload, watch } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.route("/:id(\\d+)").get(watch); // \\d+ : only numbers
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouter.route("/upload").get(getUpload).post(postUpload);

export default videoRouter;

// videoRouter.get("/:id(\\d+)/edit", getEdit);
// videoRouter.post("/:id(\\d+)/edit", postEdit);