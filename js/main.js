import allColdplayVideos from "../data/data.json" assert { type: "json" };

function createCard(element) {
  const card = `<div
  class="card"
>
  <div class="card__button">
    <button id="btnAdd" class="card__buttonYellow">+</button>
  </div>
  <div class="card__content">
    <iframe
      width="100%"
      id="player"
      type="text/html"
      src=${element.videoEmbed}
      loading="lazy"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>

    <h2 class="card__title">${element.title}</h2>
    <p class="card__subtitle">${element.year}</p>
  </div>
  <a
    class="card__icon"
    href=${element.videoUrl}
    target="_blank"
    >
    <img src="./assets/icons/youtube.png" alt="youtube logo" />
    <p>YouTube</p>
  </a>
</div>`;
  return card;
}

function search(value, arrayVideos) {
  const filtered = [...arrayVideos].filter((element) =>
    element.title.toLowerCase().includes(value)
  );
  return filtered;
}

function orderByYear(direction, array) {
  let orderedArrayVideos = [...array].sort((a, b) => {
    if (direction === "asc") {
      return a.year > b.year ? 1 : -1;
    } else {
      return a.year < b.year ? 1 : -1;
    }
  });
  return orderedArrayVideos;
}

function renderToHtml(array) {
  //eliminamos el contenido
  showCards.innerHTML = "";
  //pintamos el resultado
  for (let i = 0; i < array.length; i++) {
    showCards.innerHTML += createCard(array[i]);
  }
}

const showCards = document.getElementById("showCards");
const coldplayVideos = allColdplayVideos.coldplayVideos;
let copiedColdplayVideos = [...coldplayVideos];
console.log("coldplayVideos", coldplayVideos[0]);
console.log(allColdplayVideos);

/*------------------Render all cards----------------------- */
renderToHtml(coldplayVideos);

/*-----------------------Input search----------------------- */
const inputSearch = document.getElementById("filter__search");

inputSearch.addEventListener("input", (event) => {
  const valueInput = event.target.value.toString().toLowerCase();
  const arrayFiltered = search(valueInput, coldplayVideos);
  copiedColdplayVideos = [...arrayFiltered];
  renderToHtml(arrayFiltered);
});

/*-----------------------sort buttons----------------------- */

const buttonAscByYear = document.getElementById("ascByYear");
const buttonDescByYear = document.getElementById("descByYear");

buttonAscByYear.addEventListener("click", function () {
  const arrayOrdered = orderByYear("asc", copiedColdplayVideos);
  renderToHtml(arrayOrdered);
});

buttonDescByYear.addEventListener("click", function () {
  const arrayOrdered = orderByYear("desc", copiedColdplayVideos);
  renderToHtml(arrayOrdered);
});
