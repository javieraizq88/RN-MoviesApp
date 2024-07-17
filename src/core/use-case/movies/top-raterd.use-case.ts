

import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { TopRatedResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import { Movie } from "../../models/movie.model";

// TODO trae las peliculas populares
export const moviesTopRatedUseCase = async (fetcher: HttpAdapter): Promise<Movie[]> => {

    try {
        const topRated = await fetcher.get<TopRatedResponse>('/top_rated');
        return topRated.results.map( MovieMapper.fromMovieDBResultToModel );


    } catch (error) {
        console.log(error);
        throw new Error('Error fetching movies - moviesTopRatedUseCase');
    }
}
