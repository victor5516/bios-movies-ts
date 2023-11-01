import { IMovie } from "../models/movie.interface";
import { Movie } from "../schemas/movie.schema";
import { ErrorHandler } from "../handlers/error.handler";

export const createMovieStorage = async (movie: IMovie) => {
  const newMovie = new Movie(movie);
  try {
    await newMovie.save();
    return newMovie;
  } catch (err) {
    return new ErrorHandler(500, "Error al crear pelicula");
  }
};


export const getMoviesStorage = async (filter:any, sort:any) => {
    try {
        const movies = await Movie.find(filter).sort(sort);
        return movies;
    } catch (err) {
        return new ErrorHandler(500, "Error al obtener peliculas");
    }
}

export const updateMovieStorage = async(id:string, movie:Partial<IMovie>)=>{
    try {
        const updateMovie: IMovie = await Movie.findByIdAndUpdate(id,movie, {new: true})
        return updateMovie

    } catch (error) {
        return new ErrorHandler(500, "Error al actualizar peliculas")
    }
}

export const deleteMovieStorage = async(id:string)=>{

    try {
        const movie = await Movie.findByIdAndDelete(id)
        return movie
    } catch (error) {
        return new ErrorHandler(500, "Error al eliminar Pelicula")

    }
}



