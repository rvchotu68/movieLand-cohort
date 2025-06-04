import { seriesIP, movieIP, listContainer } from "./imports.js";
import { fetchList } from "./server.js";

export const handleNavClick = (e) => {
  console.log(e.target.dataset.name);
  const params = new URLSearchParams(window.location.search);

  params.set("type", e.target.dataset.name);
  const path = "/list.html";
  window.location.href = `${path}?${params.toString()}`;
};

export const handleSearchClick = (e) => {
  console.log(e.currentTarget.dataset.name);
  const name = e.currentTarget.dataset.name;
  const params = new URLSearchParams(window.location.search);
  params.set("type", name);
  if (name === "movie") params.set("title", movieIP.value);
  else params.set("title", seriesIP.value);
  const path = "/details.html";
  window.location.href = `${path}?${params.toString()}`;
};

export const handleScroll = async (type) => {
  console.log("Scrolling");

  console.log(window.innerHeight, window.scrollY, document.body.offsetHeight);

  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
    const data = await fetchList(type);
    renderList(data);
  }
};

export const handleListClick = (e) => {
  console.log(e.currentTarget.dataset.name, e.currentTarget.id);
  const params = new URLSearchParams(window.location.search);
  params.set("type", e.currentTarget.dataset.name);
  params.set("id", e.currentTarget.id);
  const url = "/details.html";
  window.location.href = `${url}?${params.toString()}`;
};

const renderCard = (data, type) => {
  const card = document.createElement("section");
  console.log(data);
  const {
    backdrop_path,
    id,
    original_language,
    original_title,
    popularity,
    poster_path,
    release_date,
    first_air_date,
    vote_average,
    name,
  } = data;
  card.classList.add(
    "list",
    "w-[250px]",
    "bg-white",
    "relative",
    "p-1",
    "h-[350px]",
    "rounded-md",
    "cursor-pointer"
  );
  card.setAttribute("id", id);

  card.addEventListener("click", handleListClick);
  card.dataset.name = type;

  const bg_url = backdrop_path
    ? `https://image.tmdb.org/t/p/w780${backdrop_path}`
    : "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const poster_url = poster_path
    ? `https://image.tmdb.org/t/p/original${poster_path}`
    : "https://images.unsplash.com/photo-1584824388173-4df14ba64472?q=80&w=3648&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  card.innerHTML = `
    
          <div class="list__backdrop h-[200px]">
            <img
              src=${bg_url}
              alt="backdrop"
              class="rounded-md h-full"
            />
          </div>
          <div
            class="list__profile absolute left-2.5 top-[190px] z-10 flex items-center gap-2.5 justify-center mx-2"
          >
            <div class="list__poster h-[90px] rounded-md">
              <img
                src=${poster_url}
                alt="poster"
                class="rounded-md object-cover object-center h-full"
              />
            </div>
            <p class="text-[14px] font-semibold ">${original_title || name}</p>
          </div>
          <div class="list__desc mt-[80px]">
            <div class="titles">
              <ul class="flex text-[12px] justify-between text-neutral-900">
                <li>Popularity</li>
                <li>Lang</li>
                <li>Rating</li>
                <li>Release Date</li>
              </ul>
            </div>
            <div class="values">
              <ul class="flex text-[10px] justify-between text-neutral-400">
                <li>${popularity}</li>
                <li>${original_language}</li>
                <li>${vote_average}</li>
                <li>${release_date || first_air_date}</li>
              </ul>
            </div>
          </div>
  `;

  return card;
};

export const renderList = (data) => {
  console.log("list");
  console.log(data);
  data.results.forEach((item) => {
    const card = renderCard(item, data.type);
    listContainer.append(card);
  });
};
