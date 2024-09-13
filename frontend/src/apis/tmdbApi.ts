import { Movie } from "../../types/movie";

export async function getTrendingMovies() {
  try {
    const res = await fetch("http://localhost:5000/api/trendingmovies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return error;
  }
}

export async function searchMovie(search: string) {
  try {
    const res = await fetch("http://localhost:5000/api/searchmovie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search,
      }),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return error;
  }
}

export async function getMovieDetails(id: string) {
  try {
    const res = await fetch("http://localhost:5000/api/getmoviedetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return error;
  }
}

export async function getWatchlist(accessToken: string) {
  try {
    const res = await fetch("http://localhost:5000/api/getwatchlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken,
      }),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return error;
  }
}

export async function addToWatchList(accessToken: string, newItem: Movie) {
  try {
    const res = await fetch("http://localhost:5000/api/addtowatchlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken,
        newItem,
      }),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return error;
  }
}

export async function removeFromWatchList(accessToken: string, id: number) {
  try {
    const res = await fetch("http://localhost:5000/api/removefromwatchlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken,
        id,
      }),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return error;
  }
}
