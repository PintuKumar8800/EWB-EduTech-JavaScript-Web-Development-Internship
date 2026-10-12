
console.log("--- Initializing Inventory System ---");

// 1. Initial inventory
let products = [
    { name: "Laptop", price: 800 },
    { name: "Mouse", price: 25 }
];

// 2. Category using switch
function getCategory(price) {
    switch (true) {
        case price < 100:
            return "Budget";

        case price <= 200:
            return "Standard";

        default:
            return "Premium";
    }
}

// 3. Add new product
function addProduct() {
    let name = prompt("Enter product name:");

    if (name === null || name.trim() === "") {
        alert("Please enter a valid product name.");
        return;
    }

    let price = Number(prompt("Enter product price:"));

    if (!Number.isFinite(price) || price <= 0) {
        alert("Please enter a valid positive price.");
        return;
    }

    products.push({
        name: name.trim(),
        price: price
    });

    console.log(`New product added: ${name} ($${price})`);

    displayProducts();
}

// 4. Calculate total inventory value
function calculateTotal(items) {
    let total = 0;

    for (let i = 0; i < items.length; i++) {
        if (items[i].price <= 0) {
            continue;
        }

        total += items[i].price;
    }

    return total;
}

// 5. Tax and discount using arrow function
const calculateFinalPrice = (price, taxRate, discountRate) => {
    let tax = price * taxRate / 100;
    let discount = price * discountRate / 100;

    return price + tax - discount;
};

// 6. Display products using forEach()
function displayProducts() {
    let productList = document.querySelector("#productList");

    productList.innerHTML = "";

    console.log("\n--- Processing Inventory Roster ---");

    products.forEach((product) => {
        let category = getCategory(product.price);

        console.log(
            `Item: ${product.name} ($${product.price}) -> Category: ${category}`
        );

        let card = document.createElement("div");
        card.classList.add("product");

        card.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <span class="badge ${category.toLowerCase()}">
                ${category}
            </span>
        `;

        productList.appendChild(card);
    });

    updateAnalytics();
}

// 7. Update analytics
function updateAnalytics() {
    document.querySelector("#totalProducts").textContent =
        products.length;

    document.querySelector("#totalValue").textContent =
        "$" + calculateTotal(products).toFixed(2);

    // filter() selects affordable products
    let affordableProducts = products.filter(
        (product) => product.price < 200
    );

    document.querySelector("#affordableCount").textContent =
        affordableProducts.length;

    let affordableList = document.querySelector("#affordableList");

    affordableList.innerHTML = "";

    affordableProducts.forEach((product) => {
        let item = document.createElement("div");
        item.classList.add("product");

        item.textContent = `${product.name} - $${product.price}`;

        affordableList.appendChild(item);
    });

    // map() creates formatted report
    let report = products.map(
        (product) =>
            `${product.name.toUpperCase()}: $${product.price}`
    );

    let reportList = document.querySelector("#reportList");

    reportList.innerHTML = "";

    report.forEach((text) => {
        let li = document.createElement("li");
        li.textContent = text;

        reportList.appendChild(li);
    });

    console.log("\n--- Financial Analytics ---");
    console.log("Total Inventory Value: $" + calculateTotal(products));
    console.log(
        "Affordable Items:",
        affordableProducts.map((product) => product.name)
    );
    console.log("Formatted Report List:", report);

    // Example of tax and discount calculation
    console.log(
        "Laptop price after 18% tax and 10% discount: $" +
        calculateFinalPrice(800, 18, 10).toFixed(2)
    );
}

// 8. Search product using loop and break
function searchProduct() {
    let searchName = prompt("Enter product name to search:");

    if (searchName === null || searchName.trim() === "") {
        document.querySelector("#searchResult").textContent =
            "Search cancelled or empty.";
        return;
    }

    let foundProduct = null;

    for (let i = 0; i < products.length; i++) {
        if (
            products[i].name.toLowerCase() ===
            searchName.trim().toLowerCase()
        ) {
            foundProduct = products[i];
            break;
        }
    }

    let result = document.querySelector("#searchResult");

    if (foundProduct !== null) {
        result.textContent =
            `Found: ${foundProduct.name} - $${foundProduct.price}`;
    } else {
        result.textContent = "Product not found.";
    }
}

// 9. Button events
document.querySelector("#addProductBtn").addEventListener(
    "click",
    addProduct
);

document.querySelector("#searchProductBtn").addEventListener(
    "click",
    searchProduct
);

// 10. Initial display
displayProducts();
