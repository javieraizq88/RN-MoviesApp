
import { THE_MOVIE_DB_KEY } from "@env";
import { AxiosAdapter } from "./http/axios.adapter";


//TODO crea ruta para tener las peliculas en espanol 
export const movieDBFetcher = new AxiosAdapter({
    baseUrl: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: THE_MOVIE_DB_KEY ?? 'no api key',
        language: 'es'
    }

})
