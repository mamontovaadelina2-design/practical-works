interface Product {
    id: number
    title: string
    price: number
}

type CatalogState =
    | { status: "idle" }
    | { status: "loading"; startedAt: number }
    | { status: "success"; products: Product[]; loadedAt: number }
    | { status: "error"; message: string; retryable: boolean }

function assertNever(value: never): never {
    throw new Error(`Необработанный вариант: ${value}`);
}

function getStateMessage(state: CatalogState): string {
    switch (state.status) {
        case "idle":
            return "Каталог ожидает загрузки"

        case "loading":
            return "Загрузка началась"

        case "success": {
            const total = state.products.reduce((sum, p) => sum + p.price, 0)
            return `Загружено товаров: ${state.products.length}, общая стоимость: ${total}`
        }

        case "error":
            return `Ошибка: ${state.message}`

        default:
            return assertNever(state)
    }
}

const products: Product[] = [
    { id: 1, title: "Клавиатура", price: 2500 },
    { id: 2, title: "Мышь", price: 1200 },
    { id: 3, title: "Монитор", price: 18000 },
]

const idleState: CatalogState = { status: "idle" };
const loadingState: CatalogState = { status: "loading", startedAt: Date.now() };
const successState: CatalogState = {
    status: "success",
    products,
    loadedAt: Date.now(),
}
const errorState: CatalogState = {
    status: "error",
    message: "Сервер недоступен",
    retryable: true,
}

console.log(getStateMessage(idleState))
console.log(getStateMessage(loadingState))
console.log(getStateMessage(successState))
console.log(getStateMessage(errorState))


function formatValue(value: string | number): string {
    if (typeof value === "string") {
        return value.trim().toUpperCase()
    }
    return value.toFixed(2)
}

console.log(formatValue(125))

interface Book {
    title: string;
    pages: number;
}

interface VideoCourse {
    title: string;
    durationMinutes: number;
}

type LearningMaterial = Book | VideoCourse;

function describeMaterial(item: LearningMaterial): string {
    if ("pages" in item) {
        return `${item.title}: ${item.pages} страниц`
    }
    return `${item.title}: ${item.durationMinutes} минут`
}

console.log(describeMaterial({ title: "TypeScript", pages: 320 }))
console.log(describeMaterial({ title: "TS на практике", durationMinutes: 90 }))