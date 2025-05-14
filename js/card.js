/**
 * @typedef {Object} Card
 * @property {number} id
 * @property {string} name
 * @property {string} number
 * @property {string} color
 */

const titleEl = document.getElementById("title");
const cardPreviewEl = document.getElementById("card-preview");
const backButton = document.getElementById("back-button");
const deleteButton = document.getElementById("delete-button");
const params = new URLSearchParams(window.location.search);
const cardId = params.get("id");

const cardInfo = localStorage.getItem(`card-store-card-${cardId}`);
const parts = cardInfo.split("|");
const cardName = parts[0];
const cardNumber = parts[1];
const cardColor = parts[2];

backButton.addEventListener("click", () => {
    document.documentElement.setAttribute("vt-direction", "back");
    window.location.replace("index.html");
});

titleEl.innerText = cardName;
cardPreviewEl.style = `--card-color: #${cardColor}`;
JsBarcode("#barcode", cardNumber, {
    background: `#${cardColor}`,
    textMargin: 16
});

deleteButton.addEventListener("click", () => {
    if (confirm("Vuoi davvero eliminare questa tessera?")) {
        localStorage.removeItem(`card-store-card-${cardId}`);
        document.documentElement.setAttribute("vt-direction", "back");
        window.location.replace("index.html");
    }
});