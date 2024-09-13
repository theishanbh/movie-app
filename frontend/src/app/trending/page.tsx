"use client";

import { getTrendingMovies } from "@/apis/tmdbApi";
import MovieList from "@/components/MovieList";
import { useEffect, useState } from "react";

export default function Page() {
  // const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Create an async function to fetch movies
    const fetchMovies = async () => {
      // if (!query) return; // Avoid making an API call if there's no query
      try {
        const response = await getTrendingMovies();
        console.log(response.results);
        setMovies(response.results);
        // setMovies(response.data.results);
      } catch (err) {
        // setError("Failed to fetch movies.");
        console.error(err);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="px-10 mt-4">
      <MovieList movies={movies} addMovie={true} />
    </div>
  );
}
