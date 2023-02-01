const container = document.querySelector(".containerCard");
let cardsInfo = data.events;
let allCards = "";
let currentDateArray = data.currentDate.split("-");
let currentDate = new Date(
  currentDateArray[0],
  currentDateArray[1] - 1,
  currentDateArray[2]
);
for (cardInfo of cardsInfo) {
  let cardDateArray = cardInfo.date.split("-");
  let cardDate = new Date(
    cardDateArray[0],
    cardDateArray[1] - 1,
    cardDateArray[2]
  );
  if (cardDate > currentDate) {
    allCards += `<div class="card m-3" style="width: 18rem">
    <img
      src=${cardInfo.image}
      class="card-img-top"
      alt=${cardInfo.name} />
    <div class="card-body">
      <h5 class="card-title">${cardInfo.name}</h5>
      <p class="card-text">
        <span class="fw-bold">Date:</span> ${cardInfo.date}
      </p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <span class="fw-bold">Category:</span> ${cardInfo.category}
      </li>
      <li class="list-group-item">
        <span class="fw-bold">Capacity:</span> ${cardInfo.capacity}
      </li>
    </ul>
    <div class="card-body d-flex justify-content-between">
      <p class="card-text"><span class="fw-bold">Price: </span> $${cardInfo.price}</p>
      <a
        href="./details.html"
        class="btn btn-dark d-flex align-items-center align-items-center"
        id="btnw"
        >See More</a
      >
    </div>
  </div>`;
  } else {
    continue;
  }
}
container.innerHTML = allCards;
