const cardPreview = document.getElementById("card-preview");
const form = document.getElementById("form");
const backButton = document.getElementById("back-button");
const doneButton = document.getElementById("done-button");
const nameEl = document.getElementById("nome");
const numberEl = document.getElementById("numero");
const colorEl = document.getElementById("colore");
const colorButtons = document.querySelectorAll("#colors-container > button");

backButton.addEventListener("click", () => {
    document.documentElement.setAttribute("vt-direction", "back");
    window.location.replace("index.html");
});

nameEl.addEventListener("input", () => {
    cardPreview.innerText = nameEl.value.replaceAll("|", "");
});
colorEl.addEventListener("input", () => {
    cardPreview.style = `--card-color: ${colorEl.value};`;
});
for (let button of colorButtons) {
    button.addEventListener("click", () => {
        colorEl.value = button.getAttribute("data-color");
        cardPreview.style = `--card-color: ${colorEl.value};`;
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameEl.value.replaceAll("|", "").replaceAll("~", "");
    const number = numberEl.value.replaceAll("|", "").replaceAll("~", "");
    const color = colorEl.value.replaceAll("#", "");
    try {
        localStorage.setItem(`card-store-card-${Date.now()}`, `${name}|${number}|${color}`);
    } catch (ex) {
        alert("Quantità massima di tessere raggiunta.");
        return;
    }
    window.location.replace("index.html");
});

doneButton.addEventListener("click", () => {
    document.documentElement.setAttribute("vt-direction", "back");
    form.requestSubmit();
});