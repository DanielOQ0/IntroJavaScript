import {
  addCard,
  addCheckbox,
  checkBoxFilter,
  nameFilter,
  filterDate,
  urlApi,
  getData,
} from "./module/function.js";
//variables
const $container = document.querySelector(".containerCard");
const $search = document.getElementById("search");
const $checkboxContainer = document.getElementById("checkboxCategory");
let searchValue = "";
let cardsInfo;
let currentDate;
//inicializar pagina
getData(urlApi).then((data) => {
  cardsInfo = data.events;
  currentDate = data.currentDate;
  console.log(currentDate);
  const cardsFilter = filterDate(cardsInfo, data.currentDate, "<");
  addCard(cardsFilter, $container);
  const category = [...new Set(cardsFilter.map((event) => event.category))];
  addCheckbox(category, $checkboxContainer);
});
//eventos
$checkboxContainer.addEventListener("change", (e) => {
  const cardsFilter = filterDate(cardsInfo, currentDate, "<");
  const leakedCheckBox = checkBoxFilter(cardsFilter);
  const leakedSearch = nameFilter(leakedCheckBox, searchValue);
  addCard(leakedSearch, $container);
});
$search.addEventListener("keyup", (e) => {
  const cardsFilter = filterDate(cardsInfo, currentDate, "<");
  searchValue = e.target.value.replaceAll(" ", "").toLowerCase();
  const leakedSearch = nameFilter(cardsFilter, searchValue);
  const leakedCheckBox = checkBoxFilter(leakedSearch);
  addCard(leakedCheckBox, $container);
});
$search.addEventListener("submit", (e) => e.preventDefault());
