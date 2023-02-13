import {
  addCard,
  addCheckbox,
  checkBoxFilter,
  nameFilter,
  filterDate,
} from "./module/function.js";
//variables
const $container = document.querySelector(".containerCard");
const $search = document.getElementById("search");
const $checkboxContainer = document.getElementById("checkboxCategory");
const urlApi = "https://mindhub-xj03.onrender.com/api/amazing";
let searchValue = "";
//inicializar pagina
getData(urlApi);
async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const cardsInfo = data.events;
    const cardsFilter = filterDate(cardsInfo, data.currentDate, "<");
    addCard(cardsFilter, $container);
    const category = [...new Set(cardsFilter.map((event) => event.category))];
    addCheckbox(category, $checkboxContainer);
  } catch {
    console.log(error);
  }
}
//eventos
$checkboxContainer.addEventListener("change", (e) => {
  getData(urlApi);
  async function getData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const cardsInfo = data.events;
      const cardsFilter = filterDate(cardsInfo, data.currentDate, "<");
      const leakedCheckBox = checkBoxFilter(cardsFilter);
      const leakedSearch = nameFilter(leakedCheckBox, searchValue);
      addCard(leakedSearch, $container);
    } catch {
      console.log(error);
    }
  }
});
$search.addEventListener("keyup", (e) => {
  getData(urlApi);
  async function getData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const cardsInfo = data.events;
      const cardsFilter = filterDate(cardsInfo, data.currentDate, "<");
      searchValue = e.target.value.replaceAll(" ", "").toLowerCase();
      const leakedSearch = nameFilter(cardsFilter, searchValue);
      const leakedCheckBox = checkBoxFilter(leakedSearch);
      addCard(leakedCheckBox, $container);
    } catch {
      console.log(error);
    }
  }
});
$search.addEventListener("submit", (e) => e.preventDefault());
