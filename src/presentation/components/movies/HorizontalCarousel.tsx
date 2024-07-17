
import { useRef, useEffect } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, Text, View } from 'react-native';
import { Movie } from '../../../core/models/movie.model';
import { MoviePoster } from './MoviePoster';

interface Props {
    movies: Movie[];
    title?: string;
    loadNextPage?: () => void;
}

export const HorizontalCarousel = ({ movies, title, loadNextPage }: Props) => {

    const isLoading = useRef(false);

    useEffect(() => {
        //TODO espera 200 mseg para cambiar el estado
        setTimeout(() => {
            isLoading.current = false;
        }, 200);

    }, [ movies ])

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {

        if (isLoading.current) return;

        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;

        // TODO para saber cuanto es el final scroll
        const isEndReached = (contentOffset.x + layoutMeasurement.width + 600) >= contentSize.width;

        //TODO si no llega al maximo del scroll, no hace ningun calculo pq cupieron todas las peliculas
        if (!isEndReached) return;

        // Se debe agregar cuando el loading se va a usar
        isLoading.current = true;

        // TODO Cargar las siguientes películas
        loadNextPage && loadNextPage();  

    }


    return (
        <View
            style={{ height: title ? 260 : 220 }}
        >
            {
                title && (
                    <Text
                        style={{
                            fontSize: 30,
                            fontWeight: '300',
                            marginLeft: 10,
                            marginBottom: 10
                        }}
                    >
                        {title}
                    </Text>
                )
            }


            <FlatList
                data={movies}
                renderItem={({ item }) => (
                    <MoviePoster movie={item} width={140} height={200} />
                )}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                onScroll={onScroll}
            />


        </View>
    )
}
