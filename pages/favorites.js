function createFavoriteCard(element) {
  const card = `<div
  class="card"
>
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
    <img src="../assets/icons/youtube.png" alt="youtube logo" />
    <p>YouTube</p>
  </a>
</div>`;
  return card;
}

function renderToHtml(array) {
  //eliminamos el contenido
  showFavoriteCards.innerHTML = "";

  //pintamos el resultado
  for (let i = 0; i < array.length; i++) {
    showFavoriteCards.innerHTML += createFavoriteCard(array[i]);
  }
}

/*-------------------page Favorites-------------------------*/
const showFavoriteCards = document.getElementById("mainFavorite__cards");
const mainFavorites = document.getElementById("mainFavorites");
const favoriteVideosJson = localStorage.getItem("favoriteVideos");
const favoriteVideosObject = JSON.parse(favoriteVideosJson);

console.log("page-favorites", favoriteVideosObject);
renderToHtml(favoriteVideosObject);
