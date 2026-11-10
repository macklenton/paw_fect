const savedOrders = JSON.parse(localStorage.getItem("pawfectCart")) || [];
const latestOrder = savedOrders[savedOrders.length -1];

// Select HTML elements
const orderId = document.querySelector("#order-id");
const purchasedItems = document.querySelector("#purchased-items");

const customerName = document.querySelector("#customer-name");
const customerEmail = document.querySelector("#customer-email");
const customerPhone = document.querySelector("#customer-phone");
const paymentMethod = document.querySelector("#payment-method");

const orderSubtotal = document.querySelector("#order-subtotal");
const orderDelivery = document.querySelector("#order-delivery");
const orderTotal = document.querySelector("#order-total");
const paymentNote = document.querySelector("#payment-note");



function displayPurchasedItems() {

    if (!latestOrder) {
        purchasedItems.textContent = "No order information was found.";
        return;
    }

    latestOrder.items.forEach((item) => {

        const productCard = document.createElement("div");
        productCard.classList.add("purchased-item");

        const productImage = document.createElement("img");
        productImage.src = item.image;
        productImage.alt = item.name;

        const productDetails = document.createElement("div");
        productDetails.classList.add("purchased-item-details");

        const productName = document.createElement("h3");
        productName.textContent = item.name;

        const productQuantity = document.createElement("p");
        productQuantity.textContent = `Quantity: ${item.quantity}`;

        const productPrice = document.createElement("strong");
        productPrice.textContent = formatCurrency(
            Number(item.price) * Number(item.quantity)
        );

        productDetails.appendChild(productName);
        productDetails.appendChild(productQuantity);

        productCard.appendChild(productImage);
        productCard.appendChild(productDetails);
        productCard.appendChild(productPrice);

        purchasedItems.appendChild(productCard);
    });
}
displayPurchasedItems()

