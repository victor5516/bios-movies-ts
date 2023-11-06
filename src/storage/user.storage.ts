import { ISecureUser, IUser } from "../models/user.interface";
import User from "../schemas/user.schema";
import { ErrorHandler } from "../handlers/error.handler";

export const  createUserStorage = async (user: IUser) => {
    const newUser = new User(user);
    try{
    const savedUser = await newUser.save();
    return savedUser;
    }catch(err){
        return new ErrorHandler(500, "Error al crear usuario");
    }

}

export const getUserStorage = async (): Promise<ISecureUser[] | ErrorHandler> => {
    try {
        const users = await User.find();
        return users;
    } catch (err) {
        return new ErrorHandler(500, "Error al obtener usuarios");
    }
}

export const getUserByEmailStorage = async (email: string): Promise<IUser | ErrorHandler> => {

    try {
        const user: IUser = await User.findOne({ email });
        return user;
    } catch (err) {
        return new ErrorHandler(500, "Error al obtener usuario");
    }
}

export const updateUserStorage = async (id: string, user: Partial<IUser>): Promise<IUser | ErrorHandler> => {

    try{
        const updateUser: IUser = await User.findByIdAndUpdate(id, user, {new: true});
        return updateUser;
    }
    catch(err){
        return new ErrorHandler(500, "Error al actualizar usuario");
    }
}

export const deleteUserStorage = async (id: string): Promise<IUser | ErrorHandler> => {

        try{
            const user: IUser = await User.findByIdAndDelete(id);
            return user;
        }
        catch(err){
            return new ErrorHandler(500, "Error al eliminar usuario");
        }
}