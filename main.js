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
const cardsInfo = data.events;
let searchValue = "";
//inicializar pagina
addCard(cardsInfo, $container);
const category = [...new Set(cardsInfo.map((event) => event.category))];
addCheckbox(category, $checkboxContainer);
//eventos
$checkboxContainer.addEventListener("change", (e) => {
  const leakedCheckBox = checkBoxFilter(cardsInfo);
  const leakedSearch = nameFilter(leakedCheckBox, searchValue);
  addCard(leakedSearch, $container);
});
$search.addEventListener("keyup", (e) => {
  searchValue = e.target.value.replaceAll(" ", "").toLowerCase();
  const leakedSearch = nameFilter(cardsInfo, searchValue);
  const leakedCheckBox = checkBoxFilter(leakedSearch);
  addCard(leakedCheckBox, $container);
});
$search.addEventListener("submit", (e) => e.preventDefault());
