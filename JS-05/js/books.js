export class Book {
    constructor(title, author, read = false) {
        this.title = title.trim();
        this.author = author.trim();
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }

    matches(query) {
        const q = query.trim().toLowerCase();
        if (q === "") return true;
        return (
            this.title.toLowerCase().includes(q) ||
            this.author.toLowerCase().includes(q)
        );
    }

    toData() {
        return { title: this.title, author: this.author, read: this.read };
    }
}

export class Library {
    constructor() {
        this.books = [];
    }

    add(book) {
        this.books.push(book);
    }

    remove(index) {
        this.books.splice(index, 1);
    }

    toggleRead(index) {
        this.books[index].toggleRead();
    }

    find(query) {
        return this.books.filter(book => book.matches(query));
    }

    toData() {
        return this.books.map(book => book.toData());
    }

    loadFromData(data) {
        for (const item of data) {
            this.books.push(new Book(item.title, item.author, item.read));
        }
    }
}

const KEY = "library:books";

export function saveLibrary(library) {
    localStorage.setItem(KEY, JSON.stringify(library.toData()));
}

export function loadLibraryData() {
    const text = localStorage.getItem(KEY);
    if (!text) return [];

    try {
        const data = JSON.parse(text);
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}