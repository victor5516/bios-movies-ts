import { ISecureUser, IUser } from "../models/user.interface";
import { createUserStorage, getUserStorage, getUserByEmailStorage } from "../storage/user.storage";
import { ErrorHandler } from "../handlers/error.handler";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

const comparePassword = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword);
}

export const createUserService = async (user: IUser) => {
    const { email } = user;
    const userByEmail = await getUserByEmailStorage(email);
    if(userByEmail)
        return new ErrorHandler(400, "El usuario ya existe");

    const hashedPassword = await hashPassword(user.password);

    user.password = hashedPassword;
    const newUser = await createUserStorage(user);
    if(newUser instanceof ErrorHandler)
        return newUser;

    const serializedUser: ISecureUser = {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email
    };
    return serializedUser;
}

export const getUserService = async () => {
    const users = await getUserStorage();
    if(users instanceof ErrorHandler)
        return users;

    const serializedUsers: ISecureUser[] = users.map(user => {

        return {
            _id: user._id,
            name: user.name,
            email: user.email
        };
    });
    return serializedUsers;
}

export const loginService = async (email: string, password: string) => {
    const user = await getUserByEmailStorage(email)
    if(user instanceof ErrorHandler)
        return user;
    if(!user)
        return new ErrorHandler(400, "email o contraseña incorrectos");

    const isPasswordValid = await comparePassword(password, user.password);

    if(!isPasswordValid)
        return new ErrorHandler(400, "email o contraseña incorrectos");

    const token = sign({
        _id: user._id,
        name: user.name,
        email: user.email
    }, process.env.TOKEN_SECRET);

    return token;
}

