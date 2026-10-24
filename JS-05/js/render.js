export function renderBooks(books, library) {
    const list = document.querySelector("#book-list");
    const empty = document.querySelector("#empty");

    list.innerHTML = "";

    books.forEach(book => {
        const index = library.books.indexOf(book);

        const li = document.createElement("li");
        li.className = "book" + (book.read ? " read" : "");

        const info = document.createElement("div");
        info.className = "book-info";

        const title = document.createElement("div");
        title.className = "book-title";
        title.textContent = book.title;

        const author = document.createElement("div");
        author.className = "book-author";
        author.textContent = book.author;

        info.append(title, author);

        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = book.read ? "Вернуть" : "Прочитано";
        toggleBtn.addEventListener("click", () => {
            library.toggleRead(index);
            saveAndRefresh(library);
        });

        const removeBtn = document.createElement("button");
        removeBtn.className = "remove";
        removeBtn.textContent = "Удалить";
        removeBtn.addEventListener("click", () => {
            library.remove(index);
            saveAndRefresh(library);
        });

        li.append(info, toggleBtn, removeBtn);
        list.append(li);
    });

    empty.hidden = books.length > 0;
}

export function renderStats(library) {
    const read = library.books.filter(b => b.read).length;
    document.querySelector("#stats").textContent =
        `Всего: ${library.books.length} · прочитано: ${read}`;
}

export function showError(message) {
    document.querySelector("#error").textContent = message ?? "";
}