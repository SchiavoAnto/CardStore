/**
 * @typedef {Object} Card
 * @property {number} id
 * @property {string} name
 * @property {string} number
 * @property {string} color
 */

const cardsGrid = document.getElementById("cards-grid");
const searchBar = document.getElementById("search-bar");
/** @type {HTMLDialogElement} */
const exportDialog = document.getElementById("export-dialog");
const exportDialogDataText = document.getElementById("export-dialog-data-text");
/** @type {HTMLDialogElement} */
const importDialog = document.getElementById("import-dialog");
const importDialogInput = document.getElementById("import-dialog-input");

function loadCards(filterTerm = undefined) {
    const cards = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key === null) continue;
        if (key.startsWith("card-store-card-")) {
            const cardId = parseInt(key.split("card-store-card-")[1]);
            const card = localStorage.getItem(key);
            const parts = card.split("|");
            const cardName = parts[0];
            const cardNumber = parts[1];
            const cardColor = parts[2];
            // If filterTerm is falsy or the name actually matches
            if (!filterTerm || cardName.toLowerCase().startsWith(filterTerm.toLowerCase())) {
                cards.push(
                    {
                        id: cardId,
                        name: cardName,
                        number: cardNumber,
                        color: cardColor
                    }
                );
            }
        }
    }
    return cards;
}

/** @param {Card[]} cards */
function showCards(cards) {
    cards.sort((a, b) => {
        return a.name > b.name;
    });
    for (const card of cards) {
        const cardButton = document.createElement("button");
        cardButton.className = "card";
        cardButton.style = `--card-color: #${card.color ?? 'eee'};`;
        cardButton.innerHTML = card.name;
        cardButton.addEventListener("click", () => {
            window.location.replace(`card.html?id=${card.id}`);
        });

        cardsGrid.appendChild(cardButton);
    }
}

function importData(data) {
    const dataCards = data.split("~");
    const cards = [];
    for (const card of dataCards) {
        const parts = card.split("|");
        const cardObj = {
            id: parseInt(parts[0]),
            name: parts[1],
            number: parts[2],
            color: parts[3]
        };
        if (localStorage.getItem(`card-store-card-${cardObj.id}`) === null) {
            localStorage.setItem(`card-store-card-${cardObj.id}`, `${cardObj.name}|${cardObj.number}|${cardObj.color}`);
        }
        cards.push(cardObj);
    }
    cardsGrid.replaceChildren();
    showCards(cards);
}

function exportData() {
    const cards = loadCards();
    let data = "";
    for (const card of cards) {
        data += `${card.id}|${card.name}|${card.number}|${card.color}~`;
    }
    data = data.substring(0, data.length - 1);
    data = btoa(data);
    showExportDialog(data);
}

function showExportDialog(data) {
    exportDialogDataText.innerText = data;
    exportDialog.showModal();
}

function closeExportDialog() {
    exportDialog.close();
}

function showImportDialog() {
    importDialog.showModal();
}

/**
 * @param {boolean} willImportData
 */
function closeImportDialog(willImportData) {
    if (willImportData) {
        const data = importDialogInput.value;
        if (data) {
            const parsedData = atob(data);
            importData(parsedData);
        } else {
            alert("Inserisci dei dati validi.");
        }
    }
    importDialog.close();
    importDialogInput.value = "";
}

searchBar.addEventListener("input", () => {
    cardsGrid.replaceChildren();
    const cards = loadCards(searchBar.value.trim());
    showCards(cards);
});

/** @type {Card[]} */
const cards = loadCards();
showCards(cards);