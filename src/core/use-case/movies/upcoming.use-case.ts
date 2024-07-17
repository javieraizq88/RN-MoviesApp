

import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { UpcomingResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import { Movie } from "../../models/movie.model";

// TODO trae las peliculas populares
export const moviesUpcomingUseCase = async (fetcher: HttpAdapter): Promise<Movie[]> => {

    try {
        const upcoming = await fetcher.get<UpcomingResponse>('/upcoming');
        return upcoming.results.map( MovieMapper.fromMovieDBResultToModel );


    } catch (error) {
        console.log(error);
        throw new Error('Error fetching movies - UpcomingUseCase');
    }
}
