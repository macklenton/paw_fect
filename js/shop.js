const productGrid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const sortSelect = document.querySelector("#sort-products");
const noProducts = document.querySelector("#no-products");
const cartCount = document.querySelector("#cart-count");
const productCards = document.querySelectorAll(".product-card");
const petFilters = document.querySelectorAll('input[name="pet"]');
const categoryFilters = document.querySelectorAll('input[name="category"]');
const priceFilters = document.querySelectorAll('input[name="price"]');
const ageFilters = document.querySelectorAll('input[name="age"]');
const  clearFilters = document.querySelector("#clear-filters");


console.log(productCards);
console.log(productCards.length)
console.log(searchInput);
console.log(searchButton);
console.log(productCards);


productCards.forEach((product)=>{
    console.log(product.dataset.name);
    console.log(product.dataset.price);
})


function searchProducts(){
    searchButton.addEventListener('click', ()=>{
    const searchTerm =  searchInput.value.trim().toLowerCase();
    const searchItem = Array.from(productCards).filter((product)=>{
        const matchSearch = product.dataset.name.toLowerCase().includes(searchTerm)
        return matchSearch;

    })
    productCards.forEach((product)=>{
        const isMatching = product.dataset.name.toLowerCase().includes(searchTerm);
        if(isMatching && matchCategor){
            product.style.display ="block";

        }else{
            product.style.display ="none";
        }
        
    });
});
}
searchProducts()
// GET AVAILABLE CATEGORIES
let selectedCategory = "All";

const getCategory = [
    "All",
    ...new Set(
        Array.from(productCards).map((product) => product.dataset.category)
    )
];
// FILTER BY PET 
function filterPet(product){
    const selectedPet = Array.from(petFilters)
    .filter((pet) => pet.checked)
    .map((pet)=> pet.value)

    const productPet = product.dataset.pet;

    if(selectedPet.length === 0){
        return true;
    }else{
        return selectedPet.includes(productPet)
    }
}


// FILTER BY PRICE
function filterPrice(product) {
    const selectedPrice = Array.from(priceFilters)
        .find((price) => price.checked)?.value;

    const productPrice = Number(product.dataset.price);

    if (selectedPrice === "all") {
        return true;
    } else if (selectedPrice === "0-1000") {
        return productPrice >= 0 && productPrice < 1000;
    } else if (selectedPrice === "1000-3000") {
        return productPrice >= 1000 && productPrice < 3000;
    } else if (selectedPrice === "3000-5000") {
        return productPrice >= 3000 && productPrice <= 5000;
    } else if (selectedPrice === "5000+") {
        return productPrice > 5000;
    }

    return false;
}


// FILTER BY AGE
function filterAge(product) {
    const selectedAges = Array.from(ageFilters)
        .filter((age) => age.checked)
        .map((age) => age.value);

    const productAge = product.dataset.age;

    if (selectedAges.length === 0) {
        return true;
    }

    if (selectedAges.includes("all-ages")) {
        return true;
    }

    return selectedAges.includes(productAge);
}


// COMBINE ALL FILTERS
function filterProducts() {

    const searchTerm = searchInput.value.trim().toLowerCase();

    const selectedCategories = Array.from(categoryFilters)
        .filter((category) => category.checked)
        .map((category) => category.value);

    productCards.forEach((product) => {

        // SEARCH
        const matchSearch = product.dataset.name
            .toLowerCase()
            .includes(searchTerm);

        //CATEGORY
        const matchCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(product.dataset.category);

        // PRICE
        const matchPrice = filterPrice(product);

        //PET
         const matchPet = filterPet(product);

        // AGE
        const matchAge = filterAge(product);

        const shouldShow =
            matchSearch &&
            matchCategory &&
            matchPrice &&
            matchPet &&
            matchAge;

        // DISPLAY PRODUCT
        product.style.display = shouldShow ? "" : "none";
    });

}


// EVENT LISTENERS

searchButton.addEventListener("click", filterProducts);

categoryFilters.forEach((category) => {
    category.addEventListener("change", filterProducts);
});

priceFilters.forEach((price) => {
    price.addEventListener("change", filterProducts);
});

ageFilters.forEach((age) => {
    age.addEventListener("change", filterProducts);
});
petFilters.forEach((pet)=>{
    pet.addEventListener("change", filterProducts)
});

// CLEAR ALL FILTER FUNCTION
function filterClear(product){
    clearFilters.addEventListener("click", ()=>{
        searchInput.value = "";

        categoryFilters.forEach((category) =>{
            category.checked = false;
        });

        petFilters.forEach((pet) =>{
            pet.checked = false;
        })
        
        ageFilters.forEach((age) =>{
            age.checked = false;
        })


    const allPrice = Array.from(priceFilters)
    .find((price) => price.value === "all")

    if(allPrice){
        allPrice.checked = true;
    }

    filterProducts()
    });
}
filterClear()