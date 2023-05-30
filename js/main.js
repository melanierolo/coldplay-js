import { coldplayVideos } from "../data/data.js";
console.log(coldplayVideos);

function createCard(element) {
  console.log(element);
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

const showCards = document.getElementById("showCards");

for (let i = 0; i < coldplayVideos.length; i++) {
  showCards.innerHTML += createCard(coldplayVideos[i]);
}
