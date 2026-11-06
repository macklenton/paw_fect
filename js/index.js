const bestSeller = document.querySelector(".best-sellers");
const productGrid = document.querySelector(".product-grid");
const shopButton = document.querySelector(".hero-button");

shopButton.addEventListener('click', ()=>{
    window.location.href = 'shop.html'
});
const bestSellerProducts = [
    {
        name : "Premium Dog Food",
        price: 1500,
        image: "images/foodDog1.jpg",
        category: "Food",
        pet: "Dog"
    },
    {
        name : "Premium Cat Food",
        price: 1000,
        image: "images/catfood1.jpg",
        category: "Food",
        pet: "Cat"
    },
    {
        name : "Pet Tracker",
        price: 1500,
        image: "images/tracker1.jpg",
        category: "Accessories",
        pet: "Dog"
    },
    {
        name : "Premium Bird Food",
        price: 1500,
        image: "images/birdfood1.jpg",
        category: "Food",
        pet: "Bird"
    }
];

console.log(productGrid);
console.log(bestSellerProducts);

bestSellerProducts.forEach((product)=>{
    const productCard = document.createElement("div");
    productCard.classList.add("product-card")

    const productName = document.createElement("h3");
    productName.textContent = product.name;
    productCard.appendChild(productName);
    productGrid.appendChild(productCard)

    const productImg = document.createElement("img");
    productImg.src = product.image;
    productImg.width = 180;
    productImg.style.textAlign ="center"
    productCard.appendChild(productImg);

    const productCategory = document.createElement("p");
    productCategory.textContent = product.category;
    productCategory.style.fontSize = "18px";
    productCategory.style.fontWeight= "600"
    productCategory.style.textAlign ="center"

    productCard.appendChild(productCategory);

    const productPrice = document.createElement("p");
    productPrice.textContent = product.price;
    productPrice.style.fontSize = "18px";
    productPrice.style.fontWeight= "600"
    productPrice.style.textAlign ="center"
    productCard.appendChild(productPrice);

    const productPet = document.createElement("p");
    productPet.style.fontSize = "18px";
    productPet.style.fontWeight= "600"
    productPet.style.textAlign ="center"
    productPet.textContent = product.pet;
    productCard.appendChild(productPet);


});