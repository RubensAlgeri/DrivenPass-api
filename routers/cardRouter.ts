import { Router } from "express";

import * as controller from "../controllers/cardController.js";
import schemaValidator from "../middlewares/schemaValidatorMiddleware.js"
import { validateToken } from "../middlewares/tokenMiddleware.js";
import * as schema from "../schemas/cardSchema.js";

const cardRouter = Router();
cardRouter.post("/card/:id",validateToken ,schemaValidator(schema.cardSchema), controller.createCard)
cardRouter.get('/card/:id', validateToken, controller.getUserCards)
cardRouter.delete('/card/:id/:userId', validateToken, controller.deleteCard)

export default cardRouter;