
const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Collect user information
    const formData = new FormData(signupForm);

    const fullName = formData.get("fullName").trim();
    const email = formData.get("email").trim().toLowerCase();
    const phone = formData.get("phone").trim();
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    
    const users = JSON.parse(localStorage.getItem("pawfectUsers")) || [];

    
    const existingUser = users.find((user) => {
        return user.email === email;
    });

    if (existingUser) {
        alert("An account with this email already exists!");
        return;
    }

    
    const newUser = {
        fullName,
        email,
        phone,
        password
    };

    // Save user 
    users.push(newUser);

    localStorage.setItem("pawfectUsers", JSON.stringify(users));

    alert("Account created successfully!");

    window.location.href = "shop.html";
});
