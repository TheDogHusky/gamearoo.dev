document.addEventListener("DOMContentLoaded", () => {
    const dropdowns = document.getElementsByClassName("dropdown-button-container");
    const staffCards = document.getElementsByClassName("staff-card");
    const navMobileButton = document.querySelector(".nav-mobile-button");
    const navItems = document.querySelector(".nav-items");
    const navCloseButton = document.querySelector(".nav-close-button");

    for (let i = 0; i < dropdowns.length; i++) {
        const dropdown = dropdowns[i];
        dropdown.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const content = document.getElementById(dropdown.getAttribute("ui-target"));
            content.classList.toggle("show");
        });
    }

    for (let i = 0; i < staffCards.length; i++) {
        const card = staffCards[i];
        const statusContainer = card.querySelector(".custom-status");
        if (!statusContainer) continue;
        statusContainer.innerHTML = statusContainer.innerHTML.substring(0, 50) + "...";
    }

    navMobileButton.addEventListener("click", (e) => {
        e.preventDefault();
        navItems.classList.toggle("show");
        navMobileButton.classList.toggle("active");
    });

    navCloseButton.addEventListener("click", (e) => {
        e.preventDefault();
        navItems.classList.toggle("show");
        navMobileButton.classList.toggle("active");
    });
});

window.addEventListener("click", event => {
    if (!event.target.matches(".dropdown-button")) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove("show");
            }
        }
    }
});