
import { FullMovie, Movie } from "../../core/models/movie.model"
import type { Result, MovieBDId } from "../interfaces/movie-db.responses"


export class MovieMapper {

    // TODO creo una nueva interface desde la interface Result q llegan los datos de la BBDD
    static fromMovieDBResultToModel(result: Result): Movie {
        return {
            id: result.id,
            title: result.title,
            description: result.overview,
            releaseDate: new Date(result.release_date), // TODO string lo transformo a fecha
            rating: result.vote_average,
            poster: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
            background: `https://image.tmdb.org/t/p/w500${result.backdrop_path}`,
        }
    }

    static fromMovieDBToModel(movie: MovieBDId): FullMovie {
        return {
            id: movie.id,
            title: movie.title,
            description: movie.overview,
            releaseDate: new Date(movie.release_date), // TODO string lo transformo a fecha
            rating: movie.vote_average,
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            background: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
            genres: movie.genres.map(genre => genre.name),
            duration: movie.runtime,
            budget: movie.budget,
            originalTitle: movie.original_title,
            productionCompanies: movie.production_companies.map(company => company.name),

        }
    }
}
