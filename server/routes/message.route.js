import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getMessage, sendMessage } from "../controllers/message.controllers.js";

const messsageroute = express.Router();
messsageroute.route("/send-message/:id").post(isAuthenticated, sendMessage);
messsageroute.route("/get-message/:id").get(isAuthenticated, getMessage);

export default messsageroute;
