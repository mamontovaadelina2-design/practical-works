import { Book, Library, saveLibrary, loadLibraryData } from "./books.js";
import { renderBooks, renderStats, showError } from "./render.js";

const library = new Library();
library.loadFromData(loadLibraryData());

const form = document.querySelector("#book-form");
const searchInput = document.querySelector("#search-input");

function saveAndRefresh(lib) {
    saveLibrary(lib);
    refresh();
}

function refresh() {
    const found = library.find(searchInput.value);
    renderBooks(found, library);
    renderStats(library);
}

form.addEventListener("submit", event => {
    event.preventDefault();

    const title = document.querySelector("#title-input").value;
    const author = document.querySelector("#author-input").value;

    if (title.trim() === "") {
        showError("Введите название книги");
        return;
    }
    if (author.trim() === "") {
        showError("Введите автора");
        return;
    }

    const book = new Book(title, author);
    library.add(book);
    showError("");

    form.reset();
    saveAndRefresh(library);
});

searchInput.addEventListener("input", refresh);

refresh();