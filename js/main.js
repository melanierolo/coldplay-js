import { coldplayVideos } from "../data/data.js";

function createCard(element) {
  const card = `<div
  class="card"
>
  <div class="card__content">
    <iframe
      width="100%"
      id="player"
      type="text/html"
      src=${element.videoUrl}
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

function orderByYear(direction) {
  let showCards = document.getElementById("showCards");

  //eliminamos el contenido
  showCards.innerHTML = "";

  let orderedArrayVideos = copiedColdplayVideos.sort((a, b) => {
    console.log(a);
    console.log(b);
    if (direction === "asc") {
      return a.year > b.year ? 1 : -1;
    } else {
      return a.year < b.year ? 1 : -1;
    }
  });
  console.log(orderedArrayVideos);
  //pintamos el resultado
  orderedArrayVideos.map((video) => (showCards.innerHTML += createCard(video)));
}

const showCards = document.getElementById("showCards");
let copiedColdplayVideos = [...coldplayVideos];
const buttonAscByYear = document.getElementById("ascByYear");
const buttonDescByYear = document.getElementById("descByYear");
buttonAscByYear.addEventListener("click", function () {
  orderByYear("asc");
});
buttonDescByYear.addEventListener("click", function () {
  orderByYear("desc");
});

for (let i = 0; i < coldplayVideos.length; i++) {
  showCards.innerHTML += createCard(coldplayVideos[i]);
}
