
import { View, Text } from "react-native"
import { useMovies } from "../../hooks/useMovies"
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PosterCarousel } from "../../components/movies/PosterCarousel";
import { HorizontalCarousel } from "../../components/movies/HorizontalCarousel";
import { FullScreenLoader } from "../../components/loaders/FullScreenLoader";

export const HomeScreen = () => {
    const { top } = useSafeAreaInsets();

    const { isLoading, nowPlaying, popular, topRated, upcoming, popularNextPage } = useMovies();

    if (isLoading) {
        return <FullScreenLoader />
    }

    return (
        <ScrollView>
            <View style={{ marginTop: top + 20, paddingBottom: 30 }}>

                {/* carousel principal */}
                <PosterCarousel movies={nowPlaying} />

                {/* carousel populars */}
                <HorizontalCarousel
                    movies={popular}
                    title="Populars Movies"
                    loadNextPage={popularNextPage}
                />

                {/* carousel to rated */}
                <HorizontalCarousel
                    movies={topRated}
                    title="Rating"
                />

                {/* carousel Upcoming */}
                <HorizontalCarousel
                    movies={upcoming}
                    title="Upcoming"
                />

            </View>
        </ScrollView>
    )
}
