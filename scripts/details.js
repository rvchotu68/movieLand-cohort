import { movieNav, seriesNav } from "./imports.js";
import { handleNavClick } from "./utility.js";

document.addEventListener("click", () => {
  movieNav.addEventListener("click", handleNavClick);
  seriesNav.addEventListener("click", handleNavClick);
});
