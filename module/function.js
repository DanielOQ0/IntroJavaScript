//funciones
export function checkBoxFilter(list) {
  let categoryFilter = [];
  const $checkBox = document.querySelectorAll('input[type="checkbox"]:checked');
  $checkBox.forEach(
    (event, index) => (categoryFilter[index] = event.value.toLowerCase())
  );
  if (categoryFilter.length != 0) {
    return list.filter((event) =>
      categoryFilter.includes(event.category.replaceAll(" ", "").toLowerCase())
    );
  } else {
    return list;
  }
}
export function nameFilter(list, value) {
  return list.filter((event) => {
    let nameArray = event.name.toLowerCase().split(" ");
    return nameArray.find((name) => name.startsWith(value));
  });
}
export function addCheckbox(list, element) {
  element.innerHTML = "";
  let template = "";
  let i = 0;
  list.forEach((box) => {
    i++;
    template += `<div class="grow form-check form-switch">
    <input
      class="form-check-input"
      role="switch"
      type="checkbox"
      name=${box}
      id="fCheck${i}"
      value=${box.replace(" ", "")} />
    <label class="form-check-label me-3 mb-2" for="fCheck${i}"
      >${box}</label
    >
  </div>`;
  });
  element.innerHTML += template;
}
export function addCard(list, element) {
  element.innerHTML = "";
  let template = "";
  if (list.length != 0) {
    for (let card of list) {
      template += `<div class="transUp sshadow box-shadow card m-3" style="width: 18rem">
        <img
          id="cImg"
          src=${card.image}
          class="card-img-top"
          alt=${card.name} />
        <div class="card-body">
          <h5 class="card-title">${card.name}</h5>
          <p class="card-text">
            <span class="fw-bold">Date:</span> ${card.date}
          </p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <span class="fw-bold">Category:</span> ${card.category}
          </li>
          <li class="list-group-item">
            <span class="fw-bold">Capacity:</span> ${card.capacity}
          </li>
        </ul>
        <div class="card-body d-flex justify-content-between">
          <p class="card-text"><span class="fw-bold">Price: </span> $${card.price}</p>
          <a
            href="./details.html?id=${card._id}"
            class="btn btn-dark d-flex align-items-center align-items-center"
            id="btnw"
            >See More</a
          >
        </div>
      </div>`;
    }
    element.innerHTML += template;
  } else {
    element.innerHTML = `<div id="notFound">
    <h3><i class="bi bi-exclamation-square"></i> Event Not Found</h3>
  </div>`;
  }
}
export function filterDate(list, date, type) {
  return list.filter((event) =>
    eval(event.date.replaceAll("-", "") + type + date.replaceAll("-", ""))
  );
}
