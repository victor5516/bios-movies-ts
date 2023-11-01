import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../handlers/error.handler";
import { ResponseHandler } from "../handlers/response.handler";
import { IMovie } from "../models/movie.interface";
import { createMovieService, getMoviesService, updateMovieService, deleteMovieService } from "../services/movie.service";



export const getMovie = async (
    req: Request,
    _res: Response,
    next: NextFunction
    ) => {

    const query = req.query;
    const movies = await getMoviesService(query);
    if(movies instanceof ErrorHandler)
        next(movies);


    if(!movies)
        next(new ErrorHandler(404, "No se encontraron peliculas"));

    const result = {
        movies
    };
        next(new ResponseHandler(200, result, "Peliculas encontradas"));
    }

export const createMovie = async (
    req: Request,
    _res: Response,
    next: NextFunction
    )=> {

    const movie: IMovie = req.body;

    const newMovie = await createMovieService(movie);
    if(newMovie instanceof ErrorHandler)
        next(newMovie);

    next(new ResponseHandler(201, newMovie, "Pelicula creada"));
}

export const updateMovie= async (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const id:string = req.params.id
    const movie:Partial<IMovie> = req.body

    const updatedMovie = await updateMovieService(id, movie)
    if(!updatedMovie)
        next(new ErrorHandler(404, "No se encontraron peliculas"));


    if(updatedMovie instanceof ErrorHandler)
        next(updatedMovie)

    next(new ResponseHandler(200, updatedMovie, "Pelicula actualizada correctamente"))

}

export const deleteMovie  =async (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const id: string = req.params.id
    const movie = await deleteMovieService(id)
    if(!movie)
        next(new ErrorHandler(404, "No se encontro la pelica"))
    if(movie instanceof ErrorHandler)
        next(movie)

        next(new ResponseHandler(200, movie, "Pelicula eliminada correctamente"))


}


