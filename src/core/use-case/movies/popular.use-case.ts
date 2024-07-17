

import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { PopularsMoviesDBResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import { Movie } from "../../models/movie.model";


interface Options {
    page?: number;
    limit?: number;
}

// TODO trae las peliculas populares
export const moviesPopularUseCase = async ( fetcher: HttpAdapter, options?: Options ): Promise<Movie[]> => {

    try {
        const popularMovie = await fetcher.get<PopularsMoviesDBResponse>('/popular', {
            params: {
                page: options?.page ?? 1 // TODO si no lo usa, es la pagina 1
            }
        }
        
        );
        return popularMovie.results.map( MovieMapper.fromMovieDBResultToModel );


    } catch (error) {
        console.log(error);
        throw new Error('Error fetching movies - moviesPopularUseCase');
    }
}
