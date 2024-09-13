"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Movie } from "../../../../types/movie";
import { getMovieDetails } from "@/apis/tmdbApi";

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [movie, setMovie] = useState<Movie>();
  useEffect(() => {
    if (id) {
      const fetchMovieDetails = async () => {
        try {
          const movieDetails = await getMovieDetails(id as string);
          setMovie(movieDetails);
        } catch (error) {
          console.log("Failed to load movie details.");
        }
      };

      fetchMovieDetails();
    }
  }, [id]);

  return (
    <div className="container mx-auto p-6">
      {/* Movie Details */}
      {movie ? (
        <div className="flex flex-col md:flex-row mt-6">
          {/* Poster */}
          <div className="md:w-1/3 mb-4 md:mb-0">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={300}
              height={450}
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Information Section */}
          <div className="md:w-2/3 md:ml-6">
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
            <p className="italic text-lg text-gray-600">{movie.tagline}</p>

            <p className="mt-4 text-gray-700">{movie.overview}</p>

            {/* Genres */}
            {movie.genres ? (
              <div className="flex flex-wrap mt-4">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-blue-600 text-white rounded-full px-4 py-1 mr-2 mt-2 text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            ) : (
              <></>
            )}

            {/* Additional Info */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 text-gray-700">
              <div>
                <strong>Release Date:</strong>{" "}
                {movie.release_date
                  ? new Date(movie.release_date).toLocaleDateString()
                  : "??"}
              </div>
              <div>
                <strong>Runtime:</strong> {movie.runtime} minutes
              </div>
              <div>
                <strong>Budget:</strong> $
                {movie.budget ? movie.budget.toLocaleString() : " ??"}
              </div>
              <div>
                <strong>Revenue:</strong> $
                {movie.revenue ? movie.revenue.toLocaleString() : " ??"}
              </div>
              <div>
                <strong>Votes:</strong> {movie.vote_count} (Avg:{" "}
                {movie.vote_average})
              </div>
            </div>

            {/* Production Companies */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">
                Production Companies
              </h3>
              {movie.production_companies ? (
                <div className="flex flex-wrap">
                  {movie.production_companies.map((company) => (
                    <div key={company.id} className="mr-4 mb-2">
                      <Image
                        src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                        alt={company.name as string}
                        width={100}
                        height={50}
                        className="object-contain bg-gray-200 rounded-lg p-2"
                      />
                      <p className="text-sm text-center">{company.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Page;
