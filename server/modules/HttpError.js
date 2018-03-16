class HttpError extends Error {
    constructor(message, statusCode, redirectRes) {
        super(message);
        this.statusCode = statusCode;
        this.redirectRes = redirectRes;
    }
}

export default HttpError;