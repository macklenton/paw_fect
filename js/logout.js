
const logoutLink = document.querySelector("#logout-link");

logoutLink.addEventListener("click", (event) => {
    event.preventDefault();

    
    localStorage.removeItem("pawfectCurrentUser");

    alert("You have successfully logged out!");

    
    window.location.href = "index.html";
});


