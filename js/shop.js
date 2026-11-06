const productGrid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const sortSelect = document.querySelector("#sort-products");
const noProducts = document.querySelector("#no-products");
const cartCount = document.querySelector("#cart-count");
const productCards = document.querySelectorAll(".product-card")
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
        if(isMatching){
            product.style.display ="block";

        }else{
            product.style.display ="none";
        }
        
    });
});
}
searchProducts()
