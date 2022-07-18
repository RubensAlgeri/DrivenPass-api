import { Router } from "express";
import "express-async-errors"
import errorHandlingMiddleware from "../middlewares/errorHandler.js";
import authRouter from "./authRouter.js";
import cardRouter from './cardRouter.js';
import credentialRouter from "./credentialRouter.js";


const router = Router();

router.use(authRouter)
router.use(cardRouter);
router.use(credentialRouter)
router.use(errorHandlingMiddleware)

export default router;