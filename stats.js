import {filterDate} from "./module/function.js";
//variables
const $eTable = document.getElementById("eStats");
const $uTable = document.getElementById("uStats");
const $pTable = document.getElementById("pStats");
const urlApi = "https://mindhub-xj03.onrender.com/api/amazing";
//inicializar pagina
getData(urlApi);
async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const cardsInfo = data.events;
    addRow(eStats(cardsInfo), $eTable);
    const uEvents = filterDate(cardsInfo, data.currentDate, ">");
    const pEvents = filterDate(cardsInfo, data.currentDate, "<");
    addRow(eStatsCategory(uEvents), $uTable);
    addRow(eStatsCategory(pEvents), $pTable);
  } catch {
    console.log(error);
  }
}
//Funciones
function addRow(list, element) {
  element.innerHTML = "";
  let template = "";
  list.forEach((row) => {
    template += `<tr>
                  <td>${row[0]}</td>
                  <td>${row[1]}</td>
                  <td>${row[2]}</td>
                </tr>`;
  });
  element.innerHTML += template;
}
function eStats(list) {
  const listAssistence = list.filter((event) => event.assistance);
  const highestEvent = listAssistence.sort(
    (a, b) => b.assistance / b.capacity - a.assistance / a.capacity
  )[0];
  const lowestEvent = listAssistence.sort(
    (a, b) => a.assistance / a.capacity - b.assistance / b.capacity
  )[0];
  const largerEvent = list.sort((a, b) => b.capacity - a.capacity)[0];
  return [
    [
      `${highestEvent.name} ${(
        (highestEvent.assistance / highestEvent.capacity) *
        100
      ).toFixed(1)} %`,
      `${lowestEvent.name} ${(
        (lowestEvent.assistance / lowestEvent.capacity) *
        100
      ).toFixed(1)} %`,
      `${largerEvent.name} ${largerEvent.capacity}`,
    ],
  ];
}
function eStatsCategory(list) {
  const categories = [...new Set(list.map((event) => event.category))];
  let listTable = [];
  let type = list[0].assistance ? "assistance" : "estimate";
  let digits = list[0].assistance ? 2 : 0;
  categories.forEach((category) => {
    let revenues = list
      .map((event) =>
        event.category === category ? event[type] * event.price : false
      )
      .filter(Boolean);
    let attendance = list
      .map((event) =>
        event.category === category
          ? (event[type] / event.capacity) * 100
          : false
      )
      .filter(Boolean);
    listTable.push([
      category,
      revenues.reduce((a, b) => a + b, 0),
      (attendance.reduce((a, b) => a + b, 0) / attendance.length).toFixed(
        digits
      ) + " %",
    ]);
  });
  return listTable.sort((a, b) => a[1] - b[1]);
}
