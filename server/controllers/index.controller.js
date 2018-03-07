import config from '../config/config';

const index = (req, res) => {
    res.status(200).sendFile(config.PUBLIC + '/index.html');
}



module.exports = {index};