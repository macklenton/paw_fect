
const products = [
    {
        id: "1",
        name: "Premium Puppy Food",
        pet: "Dog",
        category: "Dog Food",
        age: "Young",
        price: 1800,
        image: "images/puppyfood1.jpg",
        description: "Nutritious food specially formulated to support healthy growth and development in puppies."
    },
    {
        id: "2",
        name: "Premium Dog Food",
        pet: "Dog",
        category: "Dog Food",
        age: "Senior",
        price: 2000,
        image: "images/foodDog2.avif",
        description: "A balanced meal designed to support your dog's daily nutritional needs."
    },
    {
        id: "3",
        name: "Adult Cat Food",
        pet: "Cat",
        category: "Cat Food",
        age: "Adult",
        price: 1400,
        image: "images/catfood1.jpg",
        description: "Balanced everyday nutrition to help keep adult cats healthy and active."
    },
    {
        id: "4",
        name: "Kitten Food",
        pet: "Cat",
        category: "Cat Food",
        age: "Young",
        price: 1400,
        image: "images/catfood2.jpg",
        description: "Nutritious food designed to support the growth and development of young kittens."
    },
    {
        id: "5",
        name: "Interactive Dog Toy",
        pet: "Dog",
        category: "Dog Toys",
        age: "Young",
        price: 850,
        image: "images/toy1.jpg",
        description: "An entertaining toy designed to keep your dog active, curious and engaged."
    },
    {
        id: "6",
        name: "Interactive Cat Toy",
        pet: "Cat",
        category: "Cat Toys",
        age: "All Ages",
        price: 850,
        image: "images/toy3.jpg",
        description: "A fun interactive toy that encourages your cat to play and stay active."
    },
    {
        id: "7",
        name: "Bird Seed Mix",
        pet: "Bird",
        category: "Bird Food",
        age: "Adult",
        price: 2150,
        image: "images/birdfood1.jpg",
        description: "A seed mix suitable for pet birds as part of a balanced feeding routine."
    },
    {
        id: "8",
        name: "Bird Seed Mix",
        pet: "Bird",
        category: "Bird Food",
        age: "All Ages",
        price: 1000,
        image: "images/birdfood2.jpg",
        description: "A seed mix for pet birds, suitable for everyday feeding."
    },
    {
        id: "9",
        name: "Fish Seed Mix",
        pet: "Fish",
        category: "Fish Food",
        age: "All Ages",
        price: 650,
        image: "images/fishfood1.jpg",
        description: "Fish food designed to support the everyday feeding needs of pet fish."
    },
    {
        id: "10",
        name: "Fish Seed Mix",
        pet: "Fish",
        category: "Fish Food",
        age: "All Ages",
        price: 700,
        image: "images/fishfood2.jpg",
        description: "A convenient fish food mix for everyday feeding."
    },
    {
        id: "11",
        name: "7 Piece Grooming Tools",
        pet: "Dog",
        category: "Grooming Tools",
        age: "All Ages",
        price: 5200,
        image: "images/grooming2.jpg",
        description: "A seven-piece grooming tool set to help maintain your pet's coat."
    },
    {
        id: "12",
        name: "Shaving Tools",
        pet: "Dog",
        category: "Grooming Tools",
        age: "Senior",
        price: 3200,
        image: "images/grooming1.jpg",
        description: "Grooming tools designed to help with your pet's coat maintenance."
    },
    {
        id: "13",
        name: "Nutritious Food For Small Pets",
        pet: "Small Pet",
        category: "Small Pet Food",
        age: "All Ages",
        price: 1200,
        image: "images/smallpetfood1.jpg",
        description: "A nutritious food option for small pets."
    },
    {
        id: "14",
        name: "Nutritious Food For Small Pets",
        pet: "Small Pet",
        category: "Small Pet Food",
        age: "All Ages",
        price: 3200,
        image: "images/smallpetfood2.jpg",
        description: "A food option designed to support the nutritional needs of small pets."
    },
    {
        id: "15",
        name: "Comfortable Dog Bed",
        pet: "Dog",
        category: "Pet Beds",
        age: "All Ages",
        price: 3200,
        image: "images/bed1.jpg",
        description: "A soft and comfortable resting space for your dog."
    },
    {
        id: "16",
        name: "Comfortable Cat Bed",
        pet: "Cat",
        category: "Pet Beds",
        age: "All Ages",
        price: 3200,
        image: "images/bed2.jpg",
        description: "A cosy resting space designed for your cat."
    },
    {
        id: "17",
        name: "Food Plate",
        pet: "Dog",
        category: "Pet Food Plate",
        age: "All Ages",
        price: 1100,
        image: "images/accessories1.jpg",
        description: "A practical food plate for serving meals to your pet dog."
    },
    {
        id: "18",
        name: "Food Storage",
        pet: "Dog",
        category: "Pet Accessories",
        age: "All Ages",
        price: 5100,
        image: "images/accessories2.jpg",
        description: "A portable storage container for keeping your pet's food."
    },
    {
        id: "19",
        name: "Hamster Exercise Wheel",
        pet: "Small Pet",
        category: "Small Pet Toys",
        age: "All Ages",
        price: 1100,
        image: "images/hamsterwheel.jpg",
        description: "An exercise wheel designed to give pet hamsters an opportunity to stay active."
    }
];


// GET PRODUCT ID
const productID = new URLSearchParams(window.location.search);
const productId = productID.get("id");


// FIND SELECTED PRODUCT
const selectedProduct = products.find((product) => {
    return product.id === productId;
});


const productDetails = document.querySelector("#product-details");
const notFound = document.querySelector("#product-not-found");


// DISPLAY PRODUCT DETAILS
if (selectedProduct) {
    document.querySelector("#product-image").src = selectedProduct.image;
    document.querySelector("#product-image").alt = selectedProduct.name;

    document.querySelector("#product-name").textContent = selectedProduct.name;
    document.querySelector("#product-category").textContent = selectedProduct.category;
    document.querySelector("#product-description").textContent = selectedProduct.description;
    document.querySelector("#product-price").textContent =
        `KES ${selectedProduct.price.toLocaleString("en-KE")}`;

    document.querySelector("#product-pet").textContent = selectedProduct.pet;
    document.querySelector("#product-age").textContent = selectedProduct.age;
} else {
    productDetails.hidden = true;
    notFound.hidden = false;
}


// BUY NOW FUNCTION
const buyNowButton = document.querySelector("#buy-now");

buyNowButton.addEventListener("click", () => {
    if (!selectedProduct) {
        return;
    }

    const quantityInput = document.querySelector("#quantity");
    const quantity = Number(quantityInput.value);

    if (!Number.isInteger(quantity) || quantity < 1) {
        alert("Please enter a valid quantity.");
        return;
    }

    
    const cart = JSON.parse(localStorage.getItem("pawfectCart")) || [];

    
    const existingProduct = cart.find((item) => {
        return item.id === selectedProduct.id;
    });

    
    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        const cartItem = {
            id: selectedProduct.id,
            name: selectedProduct.name,
            price: selectedProduct.price,
            image: selectedProduct.image,
            quantity: quantity
        };

        cart.push(cartItem);
    }

    
    localStorage.setItem("pawfectCart", JSON.stringify(cart));

    
    window.location.href = "cart.html";
});



function openProductDetails() {
    productCards.forEach((product) => {
        product.addEventListener("click", (event) => {

            // Ignore clicks on wishlist and Add to Cart buttons
            if (
                event.target.closest(".wishlist-btn") ||
                event.target.closest(".add-cart-btn")
            ) {
                return;
            }

            const productId = product.dataset.id;

            window.location.href = `product.html?id=${productId}`;
        });
    });
}

openProductDetails();

