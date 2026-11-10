const checkoutItems = document.querySelector("#checkout-items");
const checkoutForm = document.querySelector("#checkout-form");
const subtotalElement = document.querySelector("#subtotal");
const deliveryFeeElement = document.querySelector("#delivery-fee");
const totalElement = document.querySelector("#total");
const mpesaDetails = document.querySelector("#mpesa-details");
const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');

const cart = JSON.parse(localStorage.getItem("pawfectCart")) || [];


function displayCheckoutItems(){
    
    if(cart.length === 0){
        const items = document.createElement("h2")
        items.textContent = "Your cart is empty. Please add product before checkout.";
        checkoutItems.appendChild(items)

    }else{
        cart.forEach((item)=>{
            const productItems = document.createElement("div")
            productItems.classList.add("checkout-item");


            const packageName = document.createElement("h2");
            packageName.textContent = item.name;
            packageName.classList.add("checkout-item-name")
            productItems.appendChild(packageName);

            const packageImage = document.createElement("img");
            packageImage.src = item.image;
            packageImage.alt = item.name;
            packageImage.width = 200;
            packageImage.classList.add("checkout-item-image")
            productItems.appendChild(packageImage)

            const packagePrice = document.createElement("p");
            packagePrice.textContent =  `KES ${item.price.toLocaleString("en-KE")}`
            packagePrice.classList.add("checkout-item-price")
            productItems.appendChild(packagePrice);

            const packageQuantity = document.createElement("p");
            packageQuantity.textContent = `Quantity: ${item.quantity}`;
            packageQuantity.classList.add("checkout-item-quantity");
            productItems.appendChild(packageQuantity);


             checkoutItems.appendChild(productItems)

        })
    }
}displayCheckoutItems()


// SUBTOTAL CALCULATION

function subtotalCalculation(){
    const subtotalAmount = cart.reduce((total, item) =>{
        const amount = Number(item.price) * item.quantity;
        return total + amount
    },0)
    subtotalElement.textContent = `KES ${subtotalAmount.toLocaleString("en-KE")}`;
    return subtotalAmount;
}
subtotalCalculation()
const selectedCounty = document.querySelector("#county");


// DELIVERY FEE CALCULATION
function calculateDeliveryFee() {
    let deliveryFee;

    if (selectedCounty.value === "") {
        deliveryFee = 0;
    } else if (selectedCounty.value === "Nairobi") {
        deliveryFee = 400;
    } else {
        deliveryFee = 600;
    }

    deliveryFeeElement.textContent = `KES ${deliveryFee.toLocaleString("en-KE")}`;

    return deliveryFee;
}

selectedCounty.addEventListener("change", () => {
    calculateTotalAmount();
});

// TOTAL AMOUNT CALCULATION
function calculateTotalAmount(){
    const subtotalAmount = subtotalCalculation();
    const deliveryFee = calculateDeliveryFee();

    const total = subtotalAmount + deliveryFee
    totalElement.textContent = `KES ${total.toLocaleString("en-KE")}`
}
calculateTotalAmount()

const mpesaNumber = document.querySelector("#mpesa-number");
//PAYMENT METHOD
function paymentCheckoutMethod() {
    paymentMethods.forEach((method) => {
        method.addEventListener("change", () => {

            if (method.value === "mpesa") {
                mpesaDetails.hidden = false;
                mpesaNumber.required = true;

            } else {
                mpesaDetails.hidden = true;
                mpesaNumber.required = false;
                mpesaNumber.value = "";
            }

        });
    });
}

paymentCheckoutMethod();


checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();


    if (cart.length === 0) {
        alert("Your cart is empty. Please add products before checkout.");
        return;
    }

    const formData = new FormData(checkoutForm);

    const customerName = formData.get("fullName");
    const customerNumber = formData.get("phone");
    const customerEmail = formData.get("email");
    const paymentMethod = formData.get("paymentMethod");
    const mpesaNumber = formData.get("mpesaNumber") || "";

    
    const orderTotal = subtotalCalculation() + calculateDeliveryFee();

    //  Generate an order ID
    const orderId = `PF-${Date.now()}`;

    // Create the order object
    const order = {
        orderId,
        customerName,
        customerEmail,
        customerNumber,
        paymentMethod,
        mpesaNumber,
        orderTotal,
        items: cart,
        orderDate: new Date().toLocaleString(),
        status: "Pending"
    };

    const savedOrders = JSON.parse(localStorage.getItem("pawfectOrders")) || [];

    savedOrders.push(order);

    
    localStorage.setItem("pawfectOrders", JSON.stringify(savedOrders));
     

    window.location.href = "order_success.html"

    //CLEAR CART
    localStorage.removeItem("pawfectCart");

    

});
