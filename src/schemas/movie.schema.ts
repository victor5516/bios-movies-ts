import { IMovie } from "../models/movie.interface";
import { model, Schema } from "mongoose";

const movieSchema = new Schema<IMovie>({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    director: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    image: { type: String },

});

export const Movie = model<IMovie>("Movie", movieSchema);
