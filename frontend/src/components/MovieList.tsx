import { Movie } from "../../types/movie";
import { MovieCard } from "./MovieCard";

export default function MovieList({
  movies,
  addMovie,
}: {
  movies: Movie[];
  addMovie: boolean;
}) {
  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap">
        {movies ? (
          movies.map((movie) => (
            <MovieCard key={movie.id} addMovie={addMovie} movie={movie} />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
