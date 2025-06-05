import { updateMovies } from "./storage.js";
import { toggleLoader } from "./utility.js";

const SERVER_URL =
  "https://api.themoviedb.org/3/discover/${type}?page=${pgno}&include_video=true";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/";

const server = {
  movie_pg: 1,
  tv_pg: 1,
  backdrop: "w780",
  poster: "original",
};
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWNiYTc2MzBjYzI4MmIyMmFlN2MzOTRlMjJlM2ZlYSIsIm5iZiI6MTY4NTQ2NDM1NS4xNjk5OTk4LCJzdWIiOiI2NDc2MjUyM2MyODIzYTAxMDZkZmVjNWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WOvLsVy66xEninUYsCC6qGN3n7yfFLq1Nr1EH0hhJrE",
  },
};

export const fetchList = async (type) => {
  toggleLoader();
  let pn = type === "movie" ? server.movie_pg : server.tv_pg;

  let url = SERVER_URL.replace(/\${pgno}/, pn);
  url = url.replace(/\${type}/, type);

  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data.results);
  //   updateMovies(data.results);
  if (type === "movie") server.movie_pg = server.movie_pg + 1;
  else server.tv_pg = server.tv_pg + 1;
  data.type = type;
  toggleLoader();
  return data;
};
