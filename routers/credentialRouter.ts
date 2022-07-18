import { Router } from "express";

import * as controller from "../controllers/credentialController.js";
import schemaValidator from "../middlewares/schemaValidatorMiddleware.js"
import { validateToken } from "../middlewares/tokenMiddleware.js";
import * as schema from "../schemas/credentialSchema.js";

const credentialRouter = Router();
credentialRouter.post("/credential/:id",validateToken ,schemaValidator(schema.credentialSchema), controller.createCredential)
credentialRouter.get('/credential/:id', validateToken, controller.getUserCredentials)
credentialRouter.delete('/credential/:id/:userId', validateToken, controller.deleteCredential)

export default credentialRouter;