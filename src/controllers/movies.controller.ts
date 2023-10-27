import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../handlers/error.handler";
import { ResponseHandler } from "../handlers/response.handler";

const movies = null

export const getMovie =  (
    _req: Request,
    _res: Response,
    next: NextFunction
    ) => {

    if(!movies){
        next(new ErrorHandler(404, "No se encontraron peliculas"));
    }
    const result = {
        movies
    };
    next(new ResponseHandler(200, result, "Peliculas encontradas"));
    }


