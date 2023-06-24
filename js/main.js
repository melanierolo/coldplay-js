import allColdplayVideos from "../data/data.json" assert { type: "json" };

function createCard(element) {
  const card = `<div
  class="card"
>
  <div class="card__button">
    <button id="${element.id}" class="card__buttonYellow">+</button>
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

  //seleccionar todos los botonos de las cards
  const buttonsAdd = document.querySelectorAll(".card__buttonYellow");

  for (const buttonAdd of buttonsAdd) {
    //addEventListener para cada botón
    buttonAdd.addEventListener("click", function () {
      //obtener los datos de cada video añadido
      const videoColdplay = array.filter(
        (video) => video.id === parseInt(buttonAdd.id)
      );
      console.log(videoColdplay[0]);
      //Para almacenar un objeto tiene que ser string -JSON.stringify()
      const videoColdplayJson = JSON.stringify(videoColdplay[0]);
      localStorage.setItem(buttonAdd.id, videoColdplayJson);
    });
  }
}

const showCards = document.getElementById("showCards");
const coldplayVideos = allColdplayVideos.coldplayVideos;
let copiedColdplayVideos = [...coldplayVideos];

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
