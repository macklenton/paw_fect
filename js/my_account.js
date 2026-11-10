const currentUser = JSON.parse(
    localStorage.getItem("pawfectCurrentUser")
);

if (!currentUser) {
    alert("Please login to access your account.");
    window.location.replace("login.html");
} else {

    
    const customerName = document.querySelector("#customer-name");
    const ordersList = document.querySelector("#orders-list");
    const wishlistProducts = document.querySelector("#wishlist-products");
    const logoutLink = document.querySelector("#logout-link");

    
    customerName.textContent = currentUser.fullName;

    
    function formatCurrency(amount) {
        return `KES ${Number(amount).toLocaleString("en-KE")}`;
    }

    
    function displayOrders() {

        
        const allOrders = JSON.parse(localStorage.getItem("pawfectOrders")) || [];

        
        const customerOrders = allOrders.filter((order) => {
            return (
                order.accountEmail === currentUser.email ||
                order.userId === currentUser.email
            );
        });

    
        if (customerOrders.length === 0) {
            const message = document.createElement("p");
            message.classList.add("empty-message");
            message.textContent = "You have not placed any orders yet.";

            ordersList.appendChild(message);
            return;
        }

        // DISPLAY EACH ORDER
        customerOrders.forEach((order) => {

            const orderCard = document.createElement("div");
            orderCard.classList.add("order-card");
            
            const orderHeader = document.createElement("div");
            orderHeader.classList.add("order-header");

            const orderReference = document.createElement("h3");
            orderReference.textContent = `Order ${order.orderId}`;

            const orderStatus = document.createElement("span");
            orderStatus.classList.add("order-status");
            orderStatus.textContent = order.status || "Pending";

            orderHeader.appendChild(orderReference);
            orderHeader.appendChild(orderStatus);

            
            const orderDate = document.createElement("p");
            orderDate.textContent = `Date: ${order.orderDate || "Not available"}`;

            // ORDER PRODUCTS
            const orderItems = document.createElement("div");
            orderItems.classList.add("order-items");

            order.items.forEach((item) => {

                const product = document.createElement("div");
                product.classList.add("order-product");

                const productName = document.createElement("p");
                productName.textContent = item.name;

                const productQuantity = document.createElement("p");
                productQuantity.textContent = `Quantity: ${item.quantity}`;

                product.appendChild(productName);
                product.appendChild(productQuantity);

                orderItems.appendChild(product);
            });

            // ORDER TOTAL
            const orderTotal = document.createElement("strong");
            orderTotal.textContent = `Total: ${formatCurrency(order.orderTotal)}`;

            // ADD EVERYTHING TO ORDER CARD
            orderCard.appendChild(orderHeader);
            orderCard.appendChild(orderDate);
            orderCard.appendChild(orderItems);
            orderCard.appendChild(orderTotal);

            ordersList.appendChild(orderCard);
        });
    }

    // DISPLAY CUSTOMER WISHLIST
    function displayWishlist() {

        
        const wishlistKey = `pawfectWishlist_${currentUser.email}`;

        const wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];

        
        if (wishlist.length === 0) {
            const message = document.createElement("p");
            message.classList.add("empty-message");
            message.textContent = "Your wishlist is currently empty.";

            wishlistProducts.appendChild(message);
            return;
        }

        
        wishlist.forEach((item) => {

            const productCard = document.createElement("div");
            productCard.classList.add("wishlist-card");

            const productImage = document.createElement("img");
            productImage.src = item.image;
            productImage.alt = item.name;

            const productName = document.createElement("h3");
            productName.textContent = item.name;

            const productPrice = document.createElement("p");
            productPrice.textContent = formatCurrency(item.price);

            productCard.appendChild(productImage);
            productCard.appendChild(productName);
            productCard.appendChild(productPrice);

            wishlistProducts.appendChild(productCard);
        });
    }

    // LOGOUT CUSTOMER
    logoutLink.addEventListener("click", (event) => {
        event.preventDefault();

        localStorage.removeItem("pawfectCurrentUser");

        alert("You have successfully logged out!");

        window.location.href = "index.html";
    });

    // RUN DISPLAY FUNCTIONS
    displayOrders();
    displayWishlist();
}
