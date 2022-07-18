import { Router } from "express";

import * as controller from "../controllers/safeNoteController.js";
import schemaValidator from "../middlewares/schemaValidatorMiddleware.js"
import { validateToken } from "../middlewares/tokenMiddleware.js";
import * as schema from "../schemas/safeNoteSchema.js";

const safeNoteRouter = Router();
safeNoteRouter.post("/safeNote/:id",validateToken ,schemaValidator(schema.safeNoteSchema), controller.createSafeNote)
safeNoteRouter.get('/safeNote/:id', validateToken, controller.getUserSafeNotes)
safeNoteRouter.delete('/safeNote/:id/:userId', validateToken, controller.deleteSafeNote)

export default safeNoteRouter;