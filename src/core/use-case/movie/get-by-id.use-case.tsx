
import { HttpAdapter } from '../../../config/adapters/http/http.adapter'
import { MovieBDId } from '../../../infrastructure/interfaces/movie-db.responses';
import { MovieMapper } from '../../../infrastructure/mappers/movie.mapper';
import { FullMovie } from '../../models/movie.model'

export const getMovieByIdUseCase = async (
    fetcher: HttpAdapter,
    movieId: number
): Promise<FullMovie> => {
    try {
        // fetcher
        const movie = await fetcher.get<MovieBDId>(`/${movieId}`);

        // mapeo
        const fullMovie = MovieMapper.fromMovieDBToModel(movie);
        return fullMovie;
    } catch (error) {
        throw new Error(`cannot get mnovie by id: ${movieId}`)
    }
}
