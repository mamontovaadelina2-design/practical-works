interface SupplierContact {
    email?: string;
    phone?: string;
}
 
interface Supplier {
    name: string;
    country: string;
    contact?: SupplierContact;
}

interface Product{
    readonly id:number,
    name:string, 
    category: string,
    price:number,
    isAvailable: boolean,
    tags: string[], 
    supplier: Supplier,
    description?:string
}

const products: Product[] = [
    {
        id: 1,
        name: "Сыр Гауда",
        category: "Молочные продукты",
        price: 890,
        isAvailable: true,
        tags: ["сыр", "гауда", "твёрдый"],
        supplier: {
            name: "FarmFresh",
            country: "Нидерланды",
            contact: {
                email: "sales@farmfresh.nl",
                phone: "+31 20 123 4567"
            }
        },
        description: "Полутвёрдый сыр с ореховым вкусом, выдержка 6 месяцев"
    },
    {
        id: 2,
        name: "Хлеб Бородинский",
        category: "Хлебобулочные изделия",
        price: 120,
        isAvailable: true,
        tags: ["хлеб", "ржаной", "бородинский"],
        supplier: {
            name: "Пекарня №1",
            country: "Россия",
            contact: {
                email: "zakaz@pekarnya1.ru"
            }
        }
    },
    {
        id: 3,
        name: "Кофе Arabica Ethiopia",
        category: "Напитки",
        price: 1450,
        isAvailable: false,
        tags: ["кофе", "арабика", "эфиопия", "зерновой"],
        supplier: {
            name: "CoffeeBean Co.",
            country: "Эфиопия"
        },
        description: "Зерновой кофе с цветочными нотами и цитрусовой кислотностью"
    },
    {
        id: 4,
        name: "Мёд Липовый",
        category: "Сладости",
        price: 650,
        isAvailable: true,
        tags: ["мёд", "липовый", "натуральный"],
        supplier: {
            name: "Пасека Алтая",
            country: "Россия",
            contact: {
                email: "honey@altai-paseka.ru",
                phone: "+7 902 123 45 67"
            }
        },
        description: "Натуральный липовый мёд с мягким ароматом"
    },
    {
        id: 5,
        name: "Оливковое масло Extra Virgin",
        category: "Масла и соусы",
        price: 1290,
        isAvailable: true,
        tags: ["масло", "оливковое", "extra virgin"],
        supplier: {
            name: "Olivia",
            country: "Италия",
            contact: {
                phone: "+39 06 1234 5678"
            }
        }
    },
    {
        id: 6,
        name: "Шоколад тёмный 85%",
        category: "Сладости",
        price: 380,
        isAvailable: false,
        tags: ["шоколад", "тёмный", "какао"],
        supplier: {
            name: "CacaoLove",
            country: "Бельгия",
            contact: {
                email: "info@cacaolove.be"
            }
        },
        description: "Тёмный шоколад с содержанием какао 85%, без сахара"
    }
];

const affordableProducts:Product[] = products.filter(
    (product)=>product.isAvailable === true
)

const productNames: string[] = products.map((product) => product.name);

function findProduct(id:number){
    const fin = products.find((product)=>product.id===id)

    if(fin==undefined){
        console.log(`ТОвар с ID: ${id} не найден`)

        return
    }
    console.log(`Найден товар: ${fin.name}`)
    }


console.log("описани товаров: ")
for (const product of products) {
    if (product.description !== undefined) {
        console.log(`${product.name}: ${product.description}`)
    } else {
        console.log(`${product.name}: (описание отсутствует)`)
    }
}

console.log("Контактные данные поставщика: ")

for (const product of products) {
    const supplier = product.supplier;
    let contactInfo = "контакты не указаны";

    if (supplier.contact !== undefined) {
        const parts: string[] = [];

        if (supplier.contact.email !== undefined) {
            parts.push(`email: ${supplier.contact.email}`)
        }

        if (supplier.contact.phone !== undefined) {
            parts.push(`тел: ${supplier.contact.phone}`)
        }

        if (parts.length > 0) {
            contactInfo = parts.join(", ")
        }
    }

    console.log(`${supplier.name} (${supplier.country}): ${contactInfo}`)
}

console.log("Доступныые товары: ")
console.log(affordableProducts)

console.log("название товаров: ")
console.log(productNames)

console.log("Поиск товаров по ID: ")
findProduct(4)

