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
    console.log(cardsInfo);
  } catch {
    console.log(error);
  }
}
