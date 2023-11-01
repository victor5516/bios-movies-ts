import { NextFunction, Request, Response } from "express";
import { checkSchema, validationResult } from "express-validator";
import { ErrorHandler } from "../handlers/error.handler";


export const createMovieMiddleware = async (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    await checkSchema({
        title: {
            in: ["body"],
            isString: true,
            errorMessage: "El titulo es requerido",
        },
        description: {
            in: ["body"],
            isString: true,
            errorMessage: "La descripcion es requerida",
        },
        duration: {
            in: ["body"],
            isString: true,
            errorMessage: "La duracion es requerida",
        },
        director: {
            in: ["body"],
            isString: true,
            errorMessage: "El director es requerido",
        },
        rating:
        {
            in: ["body"],
            isNumeric: true,
            errorMessage: "El rating es requerido",
        },
        year:
        {
            in: ["body"],
            isNumeric: true,
            errorMessage: "El año es requerido",
        },
        }).run(req);

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            next(new ErrorHandler(400, errors.array()));
        }

        next();

}