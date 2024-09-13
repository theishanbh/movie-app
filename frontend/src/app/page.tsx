"use client";

import { searchMovie } from "@/apis/tmdbApi";
import MovieList from "@/components/MovieList";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Create an async function to fetch movies
    const fetchMovies = async () => {
      if (!query) return; // Avoid making an API call if there's no query
      try {
        const response = await searchMovie(query);
        console.log(response.results);
        setMovies(response.results);
        // setMovies(response.data.results);
      } catch (err) {
        // setError("Failed to fetch movies.");
        console.error(err);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <div className="px-10">
      <SearchBar query={query} setQuery={setQuery} />
      <MovieList movies={movies} addMovie={true} />
    </div>
  );
}
