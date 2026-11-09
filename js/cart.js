const cartItems = document.querySelector("#cart-items");
const emptyCart = document.querySelector("#empty-cart");

const cart = JSON.parse(localStorage.getItem("pawfectCart")) || [];
console.log(cart)
 

function displayCart(){
    cartItems.innerHTML= "";

    if(cart.length === 0){
        emptyCart.hidden = false;
    }else{
        emptyCart.hidden = true;

        cart.forEach((item) =>{
            const cardCart = document.createElement("article")
            cardCart.classList.add("cart-card")

            const productimage = document.createElement("img");
            productimage.src = item.image;
            productimage.alt= item.name;
            productimage.width= 200;
            productimage.classList.add("cart-product-image")

            cardCart.appendChild(productimage)
            cartItems.appendChild(cardCart);// APPENDED TO CART ITEMS

            const productName = document.createElement("h2");
            productName.textContent = item.name;
            productName.style.alignItems = 
            productName.style.fontSize = 20;
            productName.classList.add("cart-product-name");

            cardCart.appendChild(productName);

            const productPrice = document.createElement("p");
            productPrice.textContent = `Price: ${item.price}`;
            productPrice.classList.add("cart-product-price");
            cardCart.appendChild(productPrice);

            const productQuantity = document.createElement("p");
            productQuantity.textContent = `Quantity: ${item.quantity}`;
            productQuantity.classList.add("cart-product-quantity");

            cardCart.appendChild(productQuantity);

            const buybtn = document.createElement("button");
            buybtn.textContent = "Buy Now";
            buybtn.style.backgroundColor = "#6D28D9";
            buybtn.style.color = "white"

            cardCart.appendChild(buybtn)


        })
    }
}
displayCart()