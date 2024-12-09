class HttpException extends Error {
    public statusCode: number;
    public details: string;
    public errors: any;
    public message: string;

    constructor(statusCode: number, message: string, details?: any, errors?: any) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        this.errors = errors
        this.message = message;
    }
}

export { HttpException }