import { NextFunction, Request, Response } from "express";

export class ErrorHandler extends Error {
    statusCode: number;
    constructor(statusCode: number, message: any){
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}


export const handleError = (
    err: ErrorHandler,
    _req: Request,
    res: Response,
    _next: NextFunction
    ) => {
        let { statusCode = 500, message } = err;

        if(!(err instanceof ErrorHandler)){
            message = "Ocurrió un error en el servidor ⛔";
        }
        console.log(err);
        res.status(statusCode).json({
            status: "ERROR",
            statusCode,
            message
        });
    }

