import express from "express";
import contactRouter from "./contactRouter";

const router = express.Router();

router.use("/api", contactRouter);

export default router;
