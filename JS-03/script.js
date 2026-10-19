const API_BASE = "https://bookmetadata.ru/api/v1/search/title";

const searchBtn = document.querySelector("#search-btn");
const queryInput = document.querySelector("#query");
const statusEl = document.querySelector("#status");
const listEl = document.querySelector("#list");

async function searchBooks() {
    const query = queryInput.value.trim();

    if (!query) {
        statusEl.textContent = "Введите название книги.";
        return;
    }

    statusEl.textContent = "Загрузка...";
    searchBtn.disabled = true;
    listEl.replaceChildren();

    try {
        const params = new URLSearchParams({ q: query });
        const response = await fetch(`${API_BASE}?${params}`);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
            statusEl.textContent = "Книги не найдены.";
            return;
        }

        for (const book of data) {
            const card = document.createElement("div");
            card.className = "card";

            const title = document.createElement("h2");
            title.textContent = book.Title || "Без названия";

            const meta = document.createElement("p");
            meta.textContent = `Автор: ${book.AuthorName || "не указан"} | ISBN: ${book.ISBN || "—"}`;

            card.append(title, meta);
            listEl.append(card);
        }

        statusEl.textContent = `Найдено книг: ${data.length}`;

    } catch (error) {

        statusEl.textContent = "Не удалось загрузить данные. Попробуйте ещё раз.";
        console.error(error);
    } finally {
        searchBtn.disabled = false;
    }
}

searchBtn.addEventListener("click", searchBooks);