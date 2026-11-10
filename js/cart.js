const cartItems = document.querySelector("#cart-items");
const emptyCart = document.querySelector("#empty-cart");

const cart = JSON.parse(localStorage.getItem("pawfectCart")) || [];
console.log(cart);

function displayCart() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    emptyCart.hidden = false;
  } else {
    emptyCart.hidden = true;

    cart.forEach((item) => {
      const cardCart = document.createElement("article");
      cardCart.classList.add("cart-card");

      const productimage = document.createElement("img");
      productimage.src = item.image;
      productimage.alt = item.name;
      productimage.width = 200;
      productimage.classList.add("cart-product-image");

      cardCart.appendChild(productimage);
      cartItems.appendChild(cardCart); // APPENDED TO CART ITEMS

      const productName = document.createElement("h2");
      productName.textContent = item.name;
      productName.style.alignItems = productName.style.fontSize = 20;
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
      const checkoutButton = document.querySelector(".checkout-btn");

      checkoutButton.addEventListener("click", () => {
        const cartItems = JSON.parse(localStorage.getItem("pawfectCart")) || [];

        if (cartItems.length === 0) {
          alert("Your cart is empty. Please add products first.");
          return;
        }
        const currentUser = JSON.parse(localStorage.getItem("pawfectCurrentUser"));

        if (!currentUser) {
          alert("Please login or create an account before checkout.");
          window.location.href = "login.html";
          return;
        }

        window.location.href = "checkout.html";
      });
    });
  }
}
displayCart();

function updateCartCount() {
  const countBadge = document.querySelector("#cart-count");
  const cartItemsCount = document.querySelector("#cart-item-count");

  const totalItems = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  countBadge.textContent = totalItems;

  cartItemsCount.textContent = totalItems;
}
updateCartCount();

function updateCartTotal() {
  const cartTotal = document.querySelector("#cart-subtotal");
  const totalAmount = cart.reduce((total, item) => {
    const amount = Number(item.price) * item.quantity;
    return total + amount;
  }, 0);
  cartTotal.textContent = `Total amount: ${totalAmount} Ksh`;
}
updateCartTotal();
