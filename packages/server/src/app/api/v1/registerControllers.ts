import { registerController } from "./util";

import { authorizeController, issueTokenController } from "./controller/auth";
import { registerUserController } from "./controller/register";
import { getPlantInfoController, updatePlantInfoController } from "./controller/plant";
import {
    getSolarPlantInfoController,
    predictSolarPlantController,
    updateSolarPlantInfoController,
} from "./controller/solarPlant";
import { monthlyHistoryReportController } from "./controller/analysis";
import { submitActualController, submitPredictionController } from "./controller/submit";
import { getCurrentWeatherController } from "./controller/weather";
import {
    getWindPlantInfoController,
    predictWindPlantController,
    updateWindPlantInfoController,
} from "./controller/windPlant";

registerController(issueTokenController);
registerController(authorizeController);
registerController(registerUserController);

registerController(getPlantInfoController);
registerController(updatePlantInfoController);

registerController(getSolarPlantInfoController);
registerController(updateSolarPlantInfoController);
registerController(predictSolarPlantController);

registerController(getWindPlantInfoController);
registerController(updateWindPlantInfoController);
registerController(predictWindPlantController);

registerController(monthlyHistoryReportController);

registerController(submitActualController);
registerController(submitPredictionController);

registerController(getCurrentWeatherController);
