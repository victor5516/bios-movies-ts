import { IMovie } from "../models/movie.interface";
import { createMovieStorage, getMoviesStorage, updateMovieStorage, deleteMovieStorage } from "../storage/movie.storage";
import { ErrorHandler } from "../handlers/error.handler";


export const createMovieService = async (movie: IMovie) => {
    const newMovie = await createMovieStorage(movie);
    return newMovie;
}

export const getMoviesService = async (query: any) => {
    const filter = {};
    if(query.title) filter["title"] = query.title;
    if(query.year) filter["year"] = query.year;
    if(query.director) filter["director"] = query.director;
    if(query.description) filter["description"] = query.description;
    if(query.rating) filter["rating"] = query.rating;
    if(query.duration) filter["duration"] = query.duration;
    if(query.id) filter["_id"] = query.id;

    // query.sort  = "field:order"
    const sort = {
    };

    if(query.sort){
        const sortArray = query.sort.split(":");
        if(sortArray.length !== 2){
            return new ErrorHandler(400, "Ordenamiento incorrecto");
        }
        if(sortArray[1] !== "asc" && sortArray[1] !== "desc"){
            return new ErrorHandler(400, "Ordenamiento incorrecto");
        }
        sort[sortArray[0]] = sortArray[1];
    }


    const movies = await getMoviesStorage(filter, sort);
    return movies;
}

export const updateMovieService =async (id:string, movie: Partial<IMovie>) => {

      const updatedMovie = await updateMovieStorage(id,movie)
      return updatedMovie

}

export const deleteMovieService = async (id:string) =>{
    const movie = await deleteMovieStorage(id)

    return movie
}