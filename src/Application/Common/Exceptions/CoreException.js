class CoreException {
    constructor(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = CoreException; // hoặc export class CoreException { ... }
