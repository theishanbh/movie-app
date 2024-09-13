import Image from "next/image";
import { Movie } from "../../types/movie";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { AuthContextProps } from "../../types/context";
import { addToWatchList, removeFromWatchList } from "@/apis/tmdbApi";
import { useState } from "react";

export const MovieCard = ({
  movie,
  addMovie,
}: {
  movie: Movie;
  addMovie: boolean;
}) => {
  const { accessToken } = useAuth() as AuthContextProps;

  const [loading, setLoading] = useState<boolean>(false);
  //   const [error, setError] = useState<string | null>(null);
  //   const [success, setSuccess] = useState<string | null>(null);

  const handleAddToWatchList = async () => {
    setLoading(true);
    try {
      const result = await addToWatchList(accessToken as string, movie);
      //   setSuccess("Movie added to watch list!");
      console.log(result); // You can log or process the result as needed
    } catch (error) {
      //   setError("Failed to add movie to watch list.");
    } finally {
      setLoading(false);
    }
  };
  const handleRemoveFromWatchlist = async () => {
    setLoading(true);
    try {
      const result = await removeFromWatchList(accessToken as string, movie.id);
      window.location.reload();
      //   setSuccess("Movie added to watch list!");
      console.log(result); // You can log or process the result as needed
    } catch (error) {
      //   setError("Failed to add movie to watch list.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-1/3 md:w-1/4 p-2 hover:bg-slate-200">
      <div className="w-full h-96 relative rounded-lg shadow-lg ">
        <Image
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg mb-4"
          objectFit="cover"
          fill={true}
        />
      </div>
      <Link
        href={`/movie/${movie.id}`}
        className="text-sm my-2 h-8 flex items-center font-semibold overflow-elliLink href={}sis"
      >
        {movie.title}
      </Link>

      {/* Button to add the movie to watch later */}
      {addMovie ? (
        <button
          onClick={handleAddToWatchList}
          className="bg-blue-500 text-xs text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Adding..." : "Add to Watchlist"}
        </button>
      ) : (
        <button
          onClick={handleRemoveFromWatchlist}
          className="bg-red-400 text-xs text-white px-4 py-2 rounded hover:bg-red-500"
        >
          {loading ? "Removing..." : "Remove From Watchlist"}
        </button>
      )}
    </div>
  );
};
