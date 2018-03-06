import config from '../config/config';

exports.index = (req, res) => {
    res.status(200).sendFile(config.PUBLIC + '/index.html');
}