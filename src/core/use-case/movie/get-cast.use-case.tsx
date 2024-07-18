
import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { CastResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { CastMapper } from "../../../infrastructure/mappers/cast.mapper";
import { Cast } from "../../models/cast.model";

export const getMovieGetCastUseCase = async (
    fetcher: HttpAdapter,
    movieId: number
): Promise<Cast[]> => {
    try {
        // fetcher
        const { cast } = await fetcher.get<CastResponse>(`/${movieId}/credits`);

        // mapeo
        // const actors = cast.map( (actor) => CastMapper.fromCastResponseToModel(actor) ); // TODO => es lo mismo q la linea de abajo
        const actors = cast.map(CastMapper.fromCastResponseToModel);

        return actors;

    } catch (error) {
        throw new Error(`Cant get movie cast: ${movieId}`)
    }
}
