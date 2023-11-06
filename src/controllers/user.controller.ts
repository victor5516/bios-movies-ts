import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../handlers/error.handler";
import { ResponseHandler } from "../handlers/response.handler";
import { IUser } from "../models/user.interface";
import { createUserService, getUserService, loginService, updateUserService, deleteUserService } from "../services/user.service";

export const createUser = async (
    req: Request,
    _res: Response,
    next: NextFunction
    )=> {
        const user: IUser = req.body;
        const newUser = await createUserService(user);
        if(newUser instanceof ErrorHandler)
            next(newUser);
        next(new ResponseHandler(201, newUser, "Usuario creado"));
    }

export const getUsers = async (

    _req: Request,
    _res: Response,
    next: NextFunction
) => {
    const users = await getUserService();
    if(users instanceof ErrorHandler)
        next(users);
    if(!users)
        next(new ErrorHandler(404, "No se encontraron usuarios"));

    next(new ResponseHandler(200, users, "Usuarios encontrados"));
}

export const login = async (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
        const { email, password } = req.body;
        const token = await loginService(email, password);
        if(token instanceof ErrorHandler)
            next(token);
        const response = {
            token,
            email
        }

        next(new ResponseHandler(200, response, "Login exitoso"));
    }
export const updateUser = async (
    req: Request,
    _res: Response,
    next: NextFunction
    )=> {
        const id = req.params.id;
        const user: Partial<IUser> = req.body;
        const updatedUser = await updateUserService(id, user);
        if(updatedUser instanceof ErrorHandler)
            next(updatedUser);
        next(new ResponseHandler(200, updatedUser, "Usuario actualizado"));
    }


export const deleteUser = async (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const id = req.params.id;
    const user = await deleteUserService(id);
    if(user instanceof ErrorHandler)
        next(user);
    next(new ResponseHandler(200, user, "Usuario eliminado"));
}
