import express from "express";
import { getEdit, postEdit, getUpload, postUpload, watch } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.route("/:id([0-9a-f]{24})").get(watch); // \\d+ : only numbers
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.route("/upload").get(getUpload).post(postUpload);

export default videoRouter;

// videoRouter.get("/:id(\\d+)/edit", getEdit);
// videoRouter.post("/:id(\\d+)/edit", postEdit);