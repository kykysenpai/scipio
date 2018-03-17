import HttpStatus from "../config/constants/HttpStatus";
import Paths from "../config/constants/Paths";

const index = (req, res) => {
    res.status(HttpStatus.OK).sendFile(Paths.VIEWS_SUCCESS + '/index.html');
};

const profile = (req, res) => {
    res.status(HttpStatus.OK).sendFile(Paths.VIEWS_SUCCESS + '/profile.html');
};

const tables = (req, res) => {
    res.status(HttpStatus.OK).sendFile(Paths.VIEWS_SUCCESS + '/tables.html');
};

const admin = (req, res) => {
    res.status(HttpStatus.OK).sendFile(Paths.VIEWS_SUCCESS + '/admin.html');
}

export default {index, profile, tables, admin}
