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

function createDeleteButton() {
  const containerButton = document.getElementById("conteiner-button");
  containerButton.innerHTML += `<button id="button-delete" class="buttonDelete">Eliminar todos los videos</button>`;

  const deleteButton = document.getElementById("button-delete");
  deleteButton.addEventListener("click", () => {
    Swal.fire({
      title: "¿Estás seguro de elimnar todos los videos?",
      icon: "warning",
      confirmButtonText: "Aceptar",
      showCancelButton: true,
      showCancelButtonText: "Cancelar",
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        localStorage.removeItem("favoriteVideos");
        showFavoriteCards.innerHTML = `<p>No existen videos en tu lista.<p>`;
        containerButton.innerHTML = "";
      }
    });
  });
}

function renderToHtml(array) {
  console.log("page-favorites", array);

  if (array && array.length !== 0) {
    //eliminamos el contenido
    showFavoriteCards.innerHTML = "";

    //pintamos el resultado
    for (let i = 0; i < array.length; i++) {
      showFavoriteCards.innerHTML += createFavoriteCard(array[i]);
    }
    createDeleteButton();
  } else {
    showFavoriteCards.innerHTML = `<p>No existen videos en tu lista.<p>`;
  }
}

/*-------------------page Favorites-------------------------*/
const showFavoriteCards = document.getElementById("mainFavorite__cards");
const mainFavorites = document.getElementById("mainFavorites");
const favoriteVideosJson = localStorage.getItem("favoriteVideos");
const favoriteVideosObject = JSON.parse(favoriteVideosJson);

renderToHtml(favoriteVideosObject);
