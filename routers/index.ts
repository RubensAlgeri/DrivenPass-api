import { Router } from "express";
import "express-async-errors"
import errorHandlingMiddleware from "../middlewares/errorHandler.js";

import cardRouter from './cardRouter.js';


const router = Router();

router.use(cardRouter);
router.use(errorHandlingMiddleware)

export default router;