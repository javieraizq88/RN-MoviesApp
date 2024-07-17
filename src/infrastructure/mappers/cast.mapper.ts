import { Cast } from "../../core/models/cast.model";
import { CastDB } from "../interfaces/movie-db.responses";

export class CastMapper {

    static fromCastResponseToModel ( actor: CastDB ): Cast {
        return {
            id: actor.id,
            name: actor.name,
            character: actor.character ?? 'No character',
            avatar: actor.profile_path 
            ? `https://image.tmdb.org/t/p/w500${ actor.profile_path }`
            : `https://i.stack.imgur.com/l60Hf.png`

        }
    }

}
