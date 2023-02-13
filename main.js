import {
  addCard,
  addCheckbox,
  checkBoxFilter,
  nameFilter,
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
    addCard(cardsInfo, $container);
    const category = [...new Set(cardsInfo.map((event) => event.category))];
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
      const leakedCheckBox = checkBoxFilter(cardsInfo);
      const leakedSearch = nameFilter(leakedCheckBox, searchValue);
      addCard(leakedSearch, $container);
    } catch {
      console.log(error);
    }
  }
});
$search.addEventListener("keyup", (e) => {
  searchValue = e.target.value.replaceAll(" ", "").toLowerCase();
  getData(urlApi);
  async function getData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const cardsInfo = data.events;
      const leakedSearch = nameFilter(cardsInfo, searchValue);
      const leakedCheckBox = checkBoxFilter(leakedSearch);
      addCard(leakedCheckBox, $container);
    } catch {
      console.log(error);
    }
  }
});
$search.addEventListener("submit", (e) => e.preventDefault());
