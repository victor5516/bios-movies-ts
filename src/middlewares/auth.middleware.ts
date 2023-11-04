import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../handlers/error.handler";
import { verify } from "jsonwebtoken";



export const verifyTokenMiddleware = async (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const token = req.header('auth-token');
    if(!token)
        next(new ErrorHandler(401, "Acceso denegado"));
    try{
        const tokenPayload = verify(token, process.env.TOKEN_SECRET);
        req.body.user = tokenPayload;
        next();
    }catch(err){
        next(new ErrorHandler(401, "Acceso denegado"));
    }
}