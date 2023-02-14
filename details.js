import {getData, urlApi} from "./module/function.js";
//variables
const $container = document.getElementById("cardView");
const params = new URLSearchParams(location.search);
const id = params.get("id");
//inicializar pagina
getData(urlApi).then((data) => {
  const card = data.events.find((event) => event._id == id);
  $container.innerHTML = `<img
    src=${card.image}
    class="rounded my-4 mx-3"
    id="cardImg"
    alt=${card.name} />
    <div class="card-body" id="cardDescription">
    <h5 class="card-title">${card.name}</h5>
    <p class="card-text"><span class="fw-bold">Date:</span> ${card.date}</p>
    <p class="card-text">
      <span class="fw-bold">Description:</span> ${card.description}
    </p>
    <p class="card-text">
      <span class="fw-bold">Category:</span> ${card.category}
    </p>
    <p class="card-text"><span class="fw-bold">Place:</span> ${card.place}</p>
    <p class="card-text"><span class="fw-bold">Capacity:</span> ${
      card.capacity
    }</p>
    <p class="card-text">
      <span class="fw-bold">${
        card.assistance ? "Assistance" : "Estimate"
      }:</span> ${card.assistance ? card.assistance : card.estimate}
    </p>
    <p class="card-text"><span class="fw-bold">Price:</span> $${card.price}</p>
    </div>`;
});
