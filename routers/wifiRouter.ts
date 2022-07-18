import { Router } from "express";

import * as controller from "../controllers/wifiController.js";
import schemaValidator from "../middlewares/schemaValidatorMiddleware.js"
import { validateToken } from "../middlewares/tokenMiddleware.js";
import * as schema from "../schemas/wifiSchema.js";

const wifiRouter = Router();
wifiRouter.post("/wifi/:id",validateToken ,schemaValidator(schema.wifiSchema), controller.createWifi)
wifiRouter.get('/wifi/:id', validateToken, controller.getUserWifis)
wifiRouter.delete('/wifi/:id/:userId', validateToken, controller.deleteWifi)

export default wifiRouter;