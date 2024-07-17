
import { useEffect, useState } from "react"

import * as UseCases from "../../core/use-case";
import { movieDBFetcher } from "../../config/adapters/movieDB.adapter"
import { Movie } from "../../core/models/movie.model";

// 1) se crean los state y setState de lo que viene en Movie
// 2) se deja corriendo el loading mientras carga la data de los endPoints
// 3) se hacen todas las peticiones a la vez de movieDBFetcher
// 4) se espera la respuesta de cada una de ellas
// 5) los valores se agregan los valores en unaa const temporales
// 6) se cambia el state
// 7) se saca el loading pq ya cargaron las peliculas


let popularPageNumber = 1; // TODO por defecto carga la pagina 1

export const useMovies = () => {
    // 1) se crean los state y setState de lo que viene en Movie
    const [isLoading, setIsLoading] = useState(true); // TODO cuando se muestre, empieza a cargar
    const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
    const [popular, setPopular] = useState<Movie[]>([]);
    const [topRated, setTopRated] = useState<Movie[]>([]);
    const [upcoming, setUpcoming] = useState<Movie[]>([]);

    // 2) se deja corriendo el loading mientras carga la data de los endPoints
    useEffect(() => {
        initialLoad();
    }, []);

    const initialLoad = async () => {

        // 3) se hacen todas las peticiones a la vez de movieDBFetcher
        const nowPlayingPromise = UseCases.moviesNowPlayingUseCase(movieDBFetcher);
        const popularPromise = UseCases.moviesPopularUseCase(movieDBFetcher);
        const topRatedPromise = UseCases.moviesTopRatedUseCase(movieDBFetcher);
        const upcomingPromise = UseCases.moviesUpcomingUseCase(movieDBFetcher);

        // TODO haga todas las peticiones a la vez
        const [
            nowPlayingMovies,
            popularMovies,
            topRatedMovies,
            upcomingMovies,

        ] = await Promise.all([
            // 4) se espera la respuesta de cada una de ellas
            nowPlayingPromise,
            popularPromise,
            topRatedPromise,
            upcomingPromise,
        ]);
        // 5) los valores se agregan los valores en unaa const temporales
        // 6) se cambia el state
        setNowPlaying(nowPlayingMovies);
        setPopular(popularMovies);
        setTopRated(topRatedMovies);
        setUpcoming(upcomingMovies);

        // 7) se saca el loading pq ya cargaron las peliculas
        setIsLoading(false)

    }
    return {
        isLoading,
        nowPlaying,
        popular,
        topRated,
        upcoming,

        // Methods

        popularNextPage: async () => {
            //TODO cuando yo lo llame, aumentara el valor del numero de la pagina actual 
            popularPageNumber++;
            //TODO devuelve las peliculas de la peticion
            const popularMovies = await UseCases.moviesPopularUseCase( movieDBFetcher, {
                page: popularPageNumber,
            });
            //TODO actualiza el State y se agregas las nuevas peliculas
            setPopular( prev => [...prev, ...popularMovies ] );


        }
    };
}
