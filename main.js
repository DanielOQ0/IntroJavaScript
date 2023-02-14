import {
  addCard,
  addCheckbox,
  checkBoxFilter,
  nameFilter,
  getData,
  urlApi,
} from "./module/function.js";
//variables
const $container = document.querySelector(".containerCard");
const $search = document.getElementById("search");
const $checkboxContainer = document.getElementById("checkboxCategory");
let searchValue = "";
let cardsInfo;
getData(urlApi).then((data) => {
  cardsInfo = data.events;
  addCard(cardsInfo, $container);
  const category = [...new Set(cardsInfo.map((event) => event.category))];
  addCheckbox(category, $checkboxContainer);
});
//eventos
$search.addEventListener("keyup", (e) => {
  searchValue = e.target.value.replaceAll(" ", "").toLowerCase();
  const leakedSearch = nameFilter(cardsInfo, searchValue);
  const leakedCheckBox = checkBoxFilter(leakedSearch);
  addCard(leakedCheckBox, $container);
});
$checkboxContainer.addEventListener("change", (e) => {
  const leakedCheckBox = checkBoxFilter(cardsInfo);
  const leakedSearch = nameFilter(leakedCheckBox, searchValue);
  addCard(leakedSearch, $container);
});
$search.addEventListener("submit", (e) => e.preventDefault());
