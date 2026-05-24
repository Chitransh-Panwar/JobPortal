import express from "express";
import { getExternalJobs } from "../controllers/externalJob.controller.js";

const router = express.Router();

router.route("/").get(getExternalJobs);

export default router;
