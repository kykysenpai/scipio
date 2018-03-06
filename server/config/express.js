import express from 'express';
import log from './logger';
import routes from '../routes/index.route';

const app = express();

app.use(express.static('../../public'));

app.use('/api', routes);

log.info('express app has received middlewares setup');

module.exports = app;