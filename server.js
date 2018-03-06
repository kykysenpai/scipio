import config from './server/config/config';
import log from './server/config/logger';
import app from './server/config/express';

app.listen(config.PORT, () => {
    log.info('server started on port ', config.PORT, ' in an environment of ', config.ENV);
});

module.exports = app;