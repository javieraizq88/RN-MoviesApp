
import {ScrollView, Text, View} from 'react-native';
import {MoviePoster} from './MoviePoster';
import { Movie } from '../../../core/models/movie.model';

interface Props {
  movies: Movie[];
  height?: number;
}

export const PosterCarousel = ({height = 440, movies}: Props) => {
  return (
    <View style={{height}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {movies.map(movie => (
          <MoviePoster 
            key={movie.id} 
            movie={ movie }
          />
        ))}
      </ScrollView>
    </View>
  );
};
