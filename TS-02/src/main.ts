const productName: string = "Wireless mouse";
const unitPrice: number = 2500;
let quantity: number = 3;

const total = unitPrice * quantity;

const output = document.querySelector("#result");
if (output !== null) {
    output.textContent = `${productName}: ${total} руб.`;
}

console.log(`${productName}: ${total} руб.`);