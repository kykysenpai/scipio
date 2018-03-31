import app from "./server/config/Express";
import Config from "./server/config/Config";
import Logger from "./server/modules/Logger";

app.listen(Config.PORT, () => {
    Logger.info('Server started on port', Config.PORT, 'in an environment of', Config.ENV);
});

export default app;