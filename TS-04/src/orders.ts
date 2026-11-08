interface OrderItem {
    id: number;
    title: string;
    unitPrice: number;
    quantity: number;
}

interface Order {
    id: number;
    customer: string;
    items: OrderItem[];
    discountPercent?: number;
}

type PriceFormatter = (value: number) => string;

const orders: Order[] = [
    {
        id: 101,
        customer: "Иван",
        items: [
            { id: 1, title: "Мышка", unitPrice: 1500, quantity: 2 },
            { id: 2, title: "Клавиатура", unitPrice: 3500, quantity: 1 }
        ],
        discountPercent: 10
    },
    {
        id: 102,
        customer: "Анна",
        items: [
            { id: 3, title: "Монитор", unitPrice: 15000, quantity: 1 },
            { id: 4, title: "Кабель HDMI", unitPrice: 500, quantity: 3 }
        ]
    },
    {
        id: 103,
        customer: "Олег",
        items: [
            { id: 5, title: "Ноутбук", unitPrice: 60000, quantity: 1 },
            { id: 6, title: "Коврик", unitPrice: 800, quantity: 1 }
        ],
        discountPercent: 5
    }
];

function calculateItemTotal(item: OrderItem): number {
    return item.unitPrice * item.quantity;
}

function calculateSubtotal(items: OrderItem[]): number {
    return items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
}

function applyDiscount(subtotal: number, percent: number = 0): number {
    if (percent < 0 || percent > 100) {
        throw new Error("Скидка должна быть от 0 до 100%");
    }
    return subtotal - (subtotal * percent / 100);
}

function formatPrice(value: number, currency: string = "RUB"): string {
    return `${value.toFixed(2)} ${currency}`;
}

function formatOrder(order: Order, formatter: PriceFormatter = formatPrice): string {
    const subtotal = calculateSubtotal(order.items);
    const finalPrice = applyDiscount(subtotal, order.discountPercent);
    return `Заказ #${order.id} (${order.customer}): ${formatter(finalPrice)}`;
}

function selectItems(items: OrderItem[], predicate: (item: OrderItem) => boolean): OrderItem[] {
    return items.filter(predicate);
}

const isExpensive = (item: OrderItem): boolean => item.unitPrice > 2000;
const hasManyItems = (item: OrderItem): boolean => item.quantity > 1;


console.log("Сводка заказов: ");
orders.forEach(order => {
    if (order.id === 102) {
        const customFormatter: PriceFormatter = (val) => `${(val / 90).toFixed(2)} USD`;
        console.log(formatOrder(order, customFormatter));
    } else {
        console.log(formatOrder(order));
    }
});

console.log("выборка позиций: ");
const firstOrderItems = orders[0].items; 
console.log("Дороже 2000 руб:", selectItems(firstOrderItems, isExpensive).map(i => i.title));
console.log("Количество > 1:", selectItems(firstOrderItems, hasManyItems).map(i => i.title));

console.log("названия: ");
const allTitles: string[] = orders.flatMap(order => order.items.map(item => item.title));
console.log(allTitles);

console.log("поиск по ID: ");
const foundItem = orders[1].items.find(item => item.id === 4);

if (foundItem !== undefined) {
    console.log(`Найдено: ${foundItem.title}, цена: ${foundItem.unitPrice}`);
} else {
    console.log("Позиция не найдена");
}

const missingItem = orders[1].items.find(item => item.id === 999);
if (missingItem === undefined) {
    console.log("Позиция с id 999 не найдена (обработано без ошибок)");
}