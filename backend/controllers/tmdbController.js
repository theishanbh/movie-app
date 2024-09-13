const axios = require("axios");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.getTrendingMovies = async (req, res) => {
  const BASE_URL = "https://api.themoviedb.org/3/trending/movie/week";
  try {
    const response = await axios(BASE_URL, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + process.env.TMDB_API_KEY,
      },
    });
    return res.json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error });
  }
};

exports.searchMovie = async (req, res) => {
  try {
    const { search } = req.body;
    const response = await axios(
      `https://api.themoviedb.org/3/search/movie?query=${search}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + process.env.TMDB_API_KEY,
        },
      }
    );
    return res.json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error });
  }
};

exports.getMovieDetails = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.body;
    console.log(id);
    const response = await axios(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + process.env.TMDB_API_KEY,
        },
      }
    );
    return res.json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error });
  }
};

exports.getWatchlist = async (req, res) => {
  const { accessToken } = req.body;
  try {
    jwt.verify(
      accessToken,
      process.env.JWT_SECRET,
      async (err, decodedUser) => {
        console.log("decoded user : ", decodedUser);
        const id = decodedUser.id;
        const user = await User.findById(id);
        if (!user) {
          console.log("User not found");
          return;
        }
        const watchlist = user.watchlist;
        return res.json({ watchlist });
      }
    );
  } catch (err) {
    console.log(err);
  }
};

exports.addToWatchlist = async (req, res) => {
  const { accessToken, newItem } = req.body;
  try {
    jwt.verify(
      accessToken,
      process.env.JWT_SECRET,
      async (err, decodedUser) => {
        console.log("decoded user : ", decodedUser);
        const id = decodedUser.id;
        const user = await User.findById(id);
        if (!user) {
          console.log("User not found");
          return;
        }
        // Check if the newItem is already in the watchlist
        const isItemInWatchlist = user.watchlist.some(
          (item) => item.id === newItem.id
        );

        if (isItemInWatchlist) {
          console.log("Item already in watchlist");
          return res
            .status(400)
            .json({ success: false, message: "Item already in watchlist" });
        }
        user.watchlist.push(newItem);
        await user.save();
        return res.json();
      }
    );
  } catch (err) {
    console.log(err);
  }
};

exports.removeFromWatchlist = async (req, res) => {
  const { accessToken, id } = req.body; // itemId refers to the ID of the movie to be removed

  try {
    jwt.verify(
      accessToken,
      process.env.JWT_SECRET,
      async (err, decodedUser) => {
        if (err) {
          return res.status(403).json({ message: "Invalid or expired token" });
        }

        console.log("decoded user : ", decodedUser);

        const userId = decodedUser.id;
        const user = await User.findById(userId);

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        // Find and remove the item from the watchlist
        const updatedWatchlist = user.watchlist.filter(
          (item) => item.id !== id
        );

        if (updatedWatchlist.length === user.watchlist.length) {
          return res
            .status(404)
            .json({ message: "Item not found in watchlist" });
        }

        // Update the user's watchlist
        user.watchlist = updatedWatchlist;

        // Save the updated user document
        await user.save();

        console.log(user);

        return res.status(200).json({
          message: "Item removed from watchlist",
          watchlist: user.watchlist,
        });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};
