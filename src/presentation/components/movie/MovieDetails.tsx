
import { FlatList, Text, View } from 'react-native'
import { Formatter } from '../../../config/helpers/formatter';
import { Cast } from '../../../core/models/cast.model';
import { CastActor } from '../cast/CastActor';

interface Props {
    // movie: FullMovie; // TODO -> en vez de llamar a todas las propiedades, se llama a las q voy a usar
    rating: number;
    genres: string[];
    description: string;
    budget: number;
    cast: Cast[];
}


export const MovieDetails = ({ rating, genres, description, budget, cast }: Props) => {
    return (
        <>
            <View style={{ marginHorizontal: 20 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text>{rating}</Text>

                    <Text style={{ marginLeft: 5 }} > - {genres.join(', ')}</Text>
                </View>

                <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold' }} >Historia</Text>
                <Text style={{ fontSize: 16 }}>{description}</Text>

                <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold' }} >Presupuesto</Text>
                <Text style={{ fontSize: 16 }}>{Formatter.currency(budget)}</Text>
            </View>


            {/* casting */}
            <View style={{ marginTop: 10, marginBottom: 50 }} >
                <Text style={{
                    marginVertical: 10,
                    marginHorizontal: 20,
                    fontSize: 23,
                    fontWeight: 'bold',
                }} >
                    Actores
                </Text>

                <FlatList
                    data={cast}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <CastActor actor={item} />}
                />

            </View>

        </>
    )
}
