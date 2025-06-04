import { fetchList } from "./server.js";
import { movieNav, seriesNav } from "./imports.js";
import { handleNavClick, handleScroll, renderList } from "./utility.js";

document.addEventListener("DOMContentLoaded", async () => {
  movieNav.addEventListener("click", handleNavClick);
  seriesNav.addEventListener("click", handleNavClick);

  window.addEventListener("scroll", () => {
    handleScroll(params.get("type"));
  });
  const params = new URLSearchParams(window.location.search);
  const data = await fetchList(params.get("type"));
  renderList(data);
});
