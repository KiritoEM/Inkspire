class CustomHttpError extends Error {
    public statusCode: number;
    public details: string;

    constructor(statusCode: number, message: string, details?: any) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
    }
}

export { CustomHttpError }