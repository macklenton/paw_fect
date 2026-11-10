
const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    
    const formData = new FormData(loginForm);

    const email = formData.get("email").trim().toLowerCase();
    const password = formData.get("password");

    
    const users = JSON.parse(localStorage.getItem("pawfectUsers")) || [];

    
    const existingUser = users.find((user) => {
        return user.email === email;
    });

    
    if (!existingUser) {
        alert("Account not found. Please create an account first.");
        return;
    }


    if (existingUser.password !== password) {
        alert("Incorrect password. Please try again.");
        return;
    }

    
    localStorage.setItem(
        "pawfectCurrentUser",
        JSON.stringify(existingUser)
    );

    alert("Login successful! Welcome back.");


    window.location.href = "my_account.html";
});
