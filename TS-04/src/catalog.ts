const productNames: string[] = [
    "Wireless Mouse",
    "Mechanical Keyboard",
    "27-inch Monitor",
    "USB-C Hub",
    "Laptop Stand"
];


const prices: number[] = [1500, 4500.50, 22000, 3200.99, 1800];


const availability: boolean[] = [true, true, false, true, false];


const productRows: [string, number, boolean][] = [
    ["Wireless Mouse", 1500, true],
    ["Mechanical Keyboard", 4500.50, true],
    ["27-inch Monitor", 22000, false],
    ["USB-C Hub", 3200.99, true],
    ["Laptop Stand", 1800, false]
];

const availableProducts = productRows.filter(product => product[2] === true);

const formattedProducts = availableProducts.map(product => {
    const [name, price] = product; 
    return `${name} — ${price} руб.`;
});

const totalAvailablePrice = availableProducts.reduce((sum, product) => {
    return sum + product[1]; 
}, 0);

function printCatalogStats(): void {
    console.log("Доступные товары");
    formattedProducts.forEach(str => console.log(str));
    
    console.log("Итоговая статистикa");
    console.log(`Общая стоимость доступных товаров: ${totalAvailablePrice.toFixed(2)} руб.`);
    console.log(`Количество доступных позиций: ${availableProducts.length}`);
}

printCatalogStats();

let currentSortMode: "price" | "name" = "price";
console.log(`\nТекущий режим сортировки: ${currentSortMode}`);
