"use client";

import { getWatchlist } from "@/apis/tmdbApi";
import MovieList from "@/components/MovieList";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { AuthContextProps } from "../../../types/context";

export default function Page() {
  const { accessToken } = useAuth() as AuthContextProps;
  // const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Create an async function to fetch movies
    const fetchMovies = async () => {
      if (!accessToken) return;
      // if (!query) return; // Avoid making an API call if there's no query
      try {
        const response = await getWatchlist(accessToken);
        console.log(response);
        setMovies(response.watchlist);
        // setMovies(response.data.results);
      } catch (err) {
        // setError("Failed to fetch movies.");
        console.error(err);
      }
    };

    fetchMovies();
  }, [accessToken]);

  return (
    <div className="px-10 mt-4">
      <MovieList movies={movies} addMovie={false} />
    </div>
  );
}
