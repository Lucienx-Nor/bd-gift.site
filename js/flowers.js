document.addEventListener("DOMContentLoaded", function () {
    // Lấy các phần tử cần thiết
    const nightFlowers = document.querySelector(".night-flowers");
    const bloomButton = document.getElementById("bloom-flowers");
    const page4 = document.getElementById("page-4");

    // Hàm tạo ánh sáng lấp lánh ngẫu nhiên (tùy chọn)
    function createRandomSparkles() {
        // Có thể bỏ qua nếu không cần
        console.log("Hiệu ứng lấp lánh được tạo");
    }

    // Hàm làm nở hoa
    function bloomFlowers() {
        if (nightFlowers) {
            // Loại bỏ class not-loaded để bắt đầu animation
            nightFlowers.classList.remove("not-loaded");

            // Cập nhật trạng thái nút
            if (bloomButton) {
                bloomButton.textContent = "Hoa Đang Nở!";
                bloomButton.disabled = true;

                // Đặt lại nút sau khi hoàn thành animation
                setTimeout(() => {
                    bloomButton.textContent = "Làm Nở Hoa";
                    bloomButton.disabled = false;
                }, 4000);
            }

            // Thêm hiệu ứng lấp lánh (nếu cần)
            try {
                createRandomSparkles();
            } catch (error) {
                console.log("Không thể tạo hiệu ứng lấp lánh");
            }
        }
    }

    // Xử lý nút làm nở hoa
    if (bloomButton) {
        bloomButton.addEventListener("click", bloomFlowers);
    }

    // Thêm listener cho các nút điều hướng
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach((item) => {
        item.addEventListener("click", function () {
            const targetPage = this.getAttribute("data-page");

            // Nếu đang chuyển đến trang 4
            if (targetPage === "page-4") {
                // Chờ một chút để chuyển trang hoàn tất rồi mới hiển thị hoa
                setTimeout(bloomFlowers, 300);
            } else {
                // Nếu rời khỏi trang 4, đặt lại trạng thái not-loaded
                if (nightFlowers) {
                    nightFlowers.classList.add("not-loaded");
                }
            }
        });
    });

    // Kiểm tra nếu trang 4 là trang đang hoạt động khi tải trang
    const isPage4Active =
        window.location.hash === "#page-4" ||
        (page4 && page4.classList.contains("active"));

    if (isPage4Active) {
        setTimeout(bloomFlowers, 500);
    }
});
