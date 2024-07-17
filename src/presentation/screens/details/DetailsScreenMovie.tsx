
import { StackScreenProps } from "@react-navigation/stack";
import { View, Text } from "react-native";
import { RootStackParams } from "../../navigators/NavigationMovie";
import { useMovie } from "../../hooks/useMovie";
import { MovieHeader } from "../../components/movie/MovieHeader";
import { MovieDetails } from "../../components/movie/MovieDetails";
import { ScrollView } from "react-native-gesture-handler";
import { FullScreenLoader } from "../../components/loaders/FullScreenLoader";


interface Props extends StackScreenProps<RootStackParams, 'Details'> { }

export const DetailScreen = ({ route }: Props) => {

    const { movieId } = route.params;
    // const { movieId } = useRoute().params;
    const { isLoading, movie, cast } = useMovie(movieId);

    if ( isLoading ) {
        return <FullScreenLoader />
    }

    return (
        <ScrollView>
            {/* header */}
            <MovieHeader
                originalTitle={movie!.originalTitle}
                poster={movie!.poster}
                title={movie!.title}
            />

            {/* detalles */}
            <MovieDetails
                rating={movie!.rating}
                genres={movie!.genres}
                description={movie!.description}
                budget={movie!.budget}
                cast= { cast! }
            />
        </ScrollView>
    )
}
