import config from '../config/config';

const index = (req, res) => {
    res.sendFile(config.PUBLIC + '/index.html');
};

module.exports = {index};