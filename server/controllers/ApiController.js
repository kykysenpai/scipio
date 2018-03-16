import HttpStatus from "../config/constants/HttpStatus";

const get = (req, res) => {
        res.status(HttpStatus.OK).send({
            '/api': {
                get: 'returns a JSON describing all the API has to offer'
            },
            '/api/auth': {
                post: 'should received a post with parameters username and password in the body, will put a cookie in the response if the credentials were valid'
            }
        });
    };

export default {get}