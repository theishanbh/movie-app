const express = require("express");
const {
  getTrendingMovies,
  searchMovie,
  getMovieDetails,
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
} = require("../controllers/tmdbController");

const router = express.Router();

router.get("/trendingmovies", getTrendingMovies);
router.post("/searchmovie", searchMovie);
router.post("/getmoviedetails", getMovieDetails);
router.post("/getwatchlist", getWatchlist);
router.post("/addtowatchlist", addToWatchlist);
router.post("/removefromwatchlist", removeFromWatchlist);

module.exports = router;
