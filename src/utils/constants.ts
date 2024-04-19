
const API_KEY = process.env.REACT_APP_API_KEY

console.log("api key : ", API_KEY)

const API_ENDPOINTS = {
  TRENDING_MOVIES: `https://www.omdbapi.com/?apikey=${API_KEY}&type=movie&s=Stars&r=json&plot=full`,
  MOVIES: `https://www.omdbapi.com/?apikey=${API_KEY}&type=movie&r=json`,
  SERIES: `https://www.omdbapi.com/?apikey=${API_KEY}&type=series&r=json`,
};

const SEARCH_ENDPOINTS = {
  MULTI_SEARCH: `https://www.omdbapi.com/?apikey=${API_KEY}&type=movie&r=json`,
};

const GET_DETAILS = {
  BASE_URL: `https://www.omdbapi.com/?apikey=${API_KEY}&type=movie&r=json`,
};

const DB_NAMES = {
  BOOKMAKRS: "BOOKMARKS_V1",
  TRENDING_MOVIES: "TRENDING_MOVIES_V1",
  MOVIES: "MOVIES_V1",
  SERIES: "SERIES_V1",
};

const MEDIA_TYPES = {
  MOVIE: "movie",
  SERIE: "tv",
};

export { API_ENDPOINTS, SEARCH_ENDPOINTS, DB_NAMES, MEDIA_TYPES, GET_DETAILS };
