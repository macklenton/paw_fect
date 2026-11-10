const savedOrders = JSON.parse(localStorage.getItem("pawfectOrders")) || [];
const latestOrder = savedOrders[savedOrders.length - 1];


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



function formatCurrency(amount) {
    return `KES ${Number(amount).toLocaleString("en-KE")}`;
}


// Display products
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


// Display order information
function displayOrderInformation() {

    if (!latestOrder) {
        document.querySelector(".success-container").textContent =
            "No recent order was found. Please return to the shop.";
        return;
    }

    orderId.textContent = latestOrder.orderId;

    customerName.textContent = latestOrder.customerName;
    customerEmail.textContent = latestOrder.customerEmail;
    customerPhone.textContent = latestOrder.customerNumber;

    paymentMethod.textContent =
        latestOrder.paymentMethod === "mpesa"
            ? "M-Pesa"
            : "Cash on Delivery";

    
    const subtotal = latestOrder.items.reduce((total, item) => {
        return total + Number(item.price) * Number(item.quantity);
    }, 0);

    
    const deliveryFee = Number(latestOrder.orderTotal) - subtotal;

    orderSubtotal.textContent = formatCurrency(subtotal);
    orderDelivery.textContent = formatCurrency(deliveryFee);
    orderTotal.textContent = formatCurrency(latestOrder.orderTotal);

    
    if (latestOrder.paymentMethod === "mpesa") {
        paymentNote.textContent =
            "M-Pesa payment has not been verified. Follow the payment instructions provided by the store.";
    } else {
        paymentNote.textContent =
            "Payment is due upon delivery.";
    }

    displayPurchasedItems();
}



displayOrderInformation();
