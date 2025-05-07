// Flower animation JavaScript
document.addEventListener("DOMContentLoaded", function () {
    // Get elements
    const flowersContainer = document.querySelector(".page-4 .flowers");
    const bloomButton = document.getElementById("bloom-flowers");

    // Initialize flowers in not-loaded state
    if (flowersContainer) {
        flowersContainer.classList.add("not-loaded");
    }

    // Function to make flowers bloom
    function bloomFlowers() {
        if (flowersContainer) {
            // Remove not-loaded class to start animations
            flowersContainer.classList.remove("not-loaded");

            // Add growing animation classes to elements
            const flowers = document.querySelectorAll(".flower");
            flowers.forEach((flower, index) => {
                flower.style.setProperty("--d", 0.5 + index * 0.2 + "s");
                if (!flower.classList.contains("grow-ans")) {
                    flower.classList.add("grow-ans");
                }
            });

            // Update button text and appearance
            bloomButton.textContent = "Hoa Đang Nở!";
            bloomButton.disabled = true;

            // Reset button after animation completes
            setTimeout(() => {
                bloomButton.textContent = "Làm Nở Hoa";
                bloomButton.disabled = false;
            }, 4000);
        }
    }

    // Event listener for bloom button
    if (bloomButton) {
        bloomButton.addEventListener("click", bloomFlowers);
    }

    // Auto-bloom when page 4 is shown
    const navItems = document.querySelectorAll(".nav-item");
    if (navItems) {
        navItems.forEach((item) => {
            item.addEventListener("click", function () {
                const targetPage = this.getAttribute("data-page");

                if (targetPage === "page-4") {
                    // Small delay to ensure page transition completes
                    setTimeout(bloomFlowers, 300);
                }
            });
        });
    }

    // Also check if page 4 is already active on page load
    const page4 = document.getElementById("page-4");
    if (page4 && page4.classList.contains("active")) {
        // Add a short delay to ensure everything is loaded
        setTimeout(bloomFlowers, 500);
    }
});
