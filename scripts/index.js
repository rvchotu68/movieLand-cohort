import { handleNavClick, handleSearchClick } from "./utility.js";
import { movieNav, seriesNav, btnMovie, btnSeries } from "./imports.js";

document.addEventListener("DOMContentLoaded", () => {
  movieNav.addEventListener("click", handleNavClick);
  seriesNav.addEventListener("click", handleNavClick);
  btnMovie.addEventListener("click", handleSearchClick);
  btnSeries.addEventListener("click", handleSearchClick);
});
