
class ErrorApp extends Error {

    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'ErrorApp';
    }
}


module.exports = ErrorApp;