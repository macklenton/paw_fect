const checkoutItems = document.querySelector("#checkout-items");
const checkoutForm = document.querySelector("#checkout-form");
const subtotalElement = document.querySelector("#subtotal");
const deliveryFeeElement = document.querySelector("#delivery-fee");
const totalElement = document.querySelector("#total");
const mpesaDetails = document.querySelector("#mpesa-details");


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