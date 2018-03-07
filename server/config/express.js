import express from 'express';
import log from 'winston';
import index from '../routes/index.route';
import httpStatus from 'http-status';
import api from '../routes/api.route';
import config from './config';

const app = express();

app.use(express.static('../../public'));

app.use('/api', api);

app.use('/', index);

app.use((req, res) => {
    res.status(httpStatus.NOT_FOUND);

    if(req.accepts('html')){
        res.sendFile(config.VIEWS + '/error404.html');
        return;
    }

    if(req.accepts('json')){
        res.send({error: 'This url doesn\'t exist'});
        return;
    }

    res.type('txt').send('Error 404 this page doesn\'t exist');

});

log.info('express app has received middlewares setup');

module.exports = app;