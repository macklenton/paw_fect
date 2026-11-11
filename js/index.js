
const bestSeller = document.querySelector(".best-sellers");
const productGrid = document.querySelector(".product-grid");
const shopButton = document.querySelector(".hero-button");


// BEST SELLER PRODUCTS
const bestSellerProducts = [
    {
        id: "home-dog-food",
        name: "Premium Dog Food",
        price: 1500,
        image: "images/foodDog1.jpg",
        category: "Food",
        pet: "Dog"
    },
    {
        id: "home-cat-food",
        name: "Premium Cat Food",
        price: 1000,
        image: "images/catfood1.jpg",
        category: "Food",
        pet: "Cat"
    },
    {
        id: "food-dog",
        name: "Dog food",
        price: 1500,
        image: "images/foodDog2.avif",
        category: "Food",
        pet: "Dog"
    },
    {
        id: "home-bird-food",
        name: "Premium Bird Food",
        price: 1500,
        image: "images/birdfood1.jpg",
        category: "Food",
        pet: "Bird"
    }
];


// HERO BUTTON
shopButton.addEventListener("click", () => {
    window.location.href = "shop.html";
});


// DISPLAY BEST SELLERS
function displayBestSellers() {
    productGrid.innerHTML = "";

    bestSellerProducts.forEach((product) => {

        const productCard = document.createElement("article");
        productCard.classList.add("product-card");

        const productImage = document.createElement("img");
        productImage.src = product.image;
        productImage.alt = product.name;
        productImage.classList.add("product-image");

        const productInfo = document.createElement("div");
        productInfo.classList.add("product-info");

        const productName = document.createElement("h3");
        productName.textContent = product.name;

        const productCategory = document.createElement("p");
        productCategory.textContent = `${product.pet}  ${product.category}`;
        productCategory.classList.add("product-category");

        const productPrice = document.createElement("p");
        productPrice.textContent =
            `KES ${product.price.toLocaleString("en-KE")}`;
        productPrice.classList.add("product-price");

        const buyNowButton = document.createElement("button");
        buyNowButton.type = "button";
        buyNowButton.textContent = "Buy Now";
        buyNowButton.classList.add("buy-now-btn");

        buyNowButton.addEventListener("click", () => {
            addToCart(product);
        });

        productInfo.appendChild(productName);
        productInfo.appendChild(productCategory);
        productInfo.appendChild(productPrice);
        productInfo.appendChild(buyNowButton);

        productCard.appendChild(productImage);
        productCard.appendChild(productInfo);

        productGrid.appendChild(productCard);
    });
}


// ADD PRODUCT TO CART
function addToCart(product) {

    const cart = JSON.parse(localStorage.getItem("pawfectCart")) || [];

    const existingProduct = cart.find((item) => {
        return item.id === product.id;
    });

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        };

        cart.push(cartItem);
    }

    localStorage.setItem("pawfectCart", JSON.stringify(cart));

    window.location.href = "cart.html";
}


// SHOP BY PET BUTTONS
const petButtons = document.querySelectorAll(".pet-card");

petButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedPet = button.dataset.petFilter;

        window.location.href =
            `shop.html?pet=${encodeURIComponent(selectedPet)}`;
    });
});


// TOP CATEGORY BUTTONS
const categoryButtons = document.querySelectorAll(".category-card");

categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedCategory = button.dataset.categoryFilter;

        window.location.href =
            `shop.html?category=${encodeURIComponent(selectedCategory)}`;
    });
});


// INITIALIZE HOMEPAGE
displayBestSellers();
