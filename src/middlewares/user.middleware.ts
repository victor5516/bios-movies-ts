import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../handlers/error.handler';
import { ResponseHandler } from '../handlers/response.handler';
import { checkSchema, validationResult } from 'express-validator';

export const createUserMiddleware = async (
    req: Request,
    _res: Response,
    next: NextFunction
) => {

await checkSchema({
    name: {
        in: ['body'],
        isString: true,
        errorMessage: 'El nombre es requerido',
    },
    email: {
        in: ['body'],
        isEmail: true,
        errorMessage: 'El email es requerido',
    },
    password: {
        in: ['body'],
        isString: true,
        errorMessage: 'La contraseña es requerida',
    },
}).run(req);

const errors = validationResult(req);
if (!errors.isEmpty()) {
    next(new ErrorHandler(400, errors.array()));
}

next();
}