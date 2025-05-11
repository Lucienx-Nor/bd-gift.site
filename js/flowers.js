/**
 * Xử lý hiệu ứng hoa và cánh hoa bay - phiên bản toàn trang
 */

// Biến theo dõi trạng thái (khai báo ngoài để tất cả hàm có thể truy cập)
let isFlowerAnimationActive = false;
let petalInterval;
let bubbleInterval;
let sparkleInterval; // Thêm biến mới cho tia sáng
let flyingPetalsContainer;

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

    // Tạo container cho cánh hoa bay - Đặt nó vào trang 4 thay vì bouquet-container
    function createFlyingPetalsContainer() {
        // Kiểm tra xem container đã tồn tại chưa
        if (!document.getElementById("flying-petals")) {
            flyingPetalsContainer = document.createElement("div");
            flyingPetalsContainer.id = "flying-petals";
            flyingPetalsContainer.style.position = "absolute";
            flyingPetalsContainer.style.top = "0";
            flyingPetalsContainer.style.left = "0";
            flyingPetalsContainer.style.width = "100%";
            flyingPetalsContainer.style.height = "100%";
            flyingPetalsContainer.style.pointerEvents = "none";
            flyingPetalsContainer.style.zIndex = "1000"; // Tăng z-index để ở trên mọi thứ
            flyingPetalsContainer.style.overflow = "hidden";

            // Thêm vào page-4 thay vì bouquet-container
            if (page4) {
                // Đảm bảo page4 có position relative nếu chưa có
                const pageStyle = window.getComputedStyle(page4);
                if (pageStyle.position === "static") {
                    page4.style.position = "relative";
                }
                page4.appendChild(flyingPetalsContainer);
            }
        } else {
            flyingPetalsContainer = document.getElementById("flying-petals");
        }

        return flyingPetalsContainer;
    }

    // Tạo cánh hoa bay ngẫu nhiên cải tiến - bay khắp trang
    function createFlyingPetal() {
        // Lấy container hoặc tạo mới nếu chưa có
        const container =
            flyingPetalsContainer || createFlyingPetalsContainer();

        // Tạo cánh hoa mới
        const petal = document.createElement("div");
        petal.className = "flying-petal";

        // Thêm kích thước ngẫu nhiên (thêm size-4)
        const sizeClass = `size-${Math.floor(Math.random() * 4) + 1}`;
        petal.classList.add(sizeClass);

        // Thêm màu sắc ngẫu nhiên (thêm color-4 và color-5)
        const colorClass = `color-${Math.floor(Math.random() * 5) + 1}`;
        petal.classList.add(colorClass);

        // Thêm hình dạng ngẫu nhiên
        const shapeClass = `shape-${Math.floor(Math.random() * 4) + 1}`;
        petal.classList.add(shapeClass);

        // Vị trí ban đầu - mở rộng khu vực xuất phát khắp trang thay vì chỉ ở khu vực hoa
        const startLeft = Math.random() * 100; // 0-100% của chiều rộng trang
        const startTop = Math.random() * 60; // 0-60% của chiều cao trang
        petal.style.left = `${startLeft}%`;
        petal.style.top = `${startTop}%`;

        // Định nghĩa đường đi ngẫu nhiên cho cánh hoa
        // Điểm 1
        const tx1 = Math.random() * 100 - 50; // Di chuyển ngang rộng hơn
        const ty1 = 20 + Math.random() * 60; // Di chuyển xuống - phạm vi rộng hơn
        const tr1 = Math.random() * 720 - 360; // Xoay nhiều hơn: -360 đến 360 độ

        // Điểm 2
        const tx2 = tx1 + (Math.random() * 100 - 50);
        const ty2 = ty1 + (30 + Math.random() * 70);
        const tr2 = tr1 + (Math.random() * 720 - 360);

        // Điểm 3
        const tx3 = tx2 + (Math.random() * 100 - 50);
        const ty3 = ty2 + (40 + Math.random() * 80);
        const tr3 = tr2 + (Math.random() * 720 - 360);

        // Điểm 4
        const tx4 = tx3 + (Math.random() * 100 - 50);
        const ty4 = ty3 + (50 + Math.random() * 100);
        const tr4 = tr3 + (Math.random() * 720 - 360);

        // Đặt các biến CSS tùy chỉnh cho animation
        petal.style.setProperty("--tx-1", `${tx1}px`);
        petal.style.setProperty("--ty-1", `${ty1}px`);
        petal.style.setProperty("--tr-1", `${tr1}deg`);

        petal.style.setProperty("--tx-2", `${tx2}px`);
        petal.style.setProperty("--ty-2", `${ty2}px`);
        petal.style.setProperty("--tr-2", `${tr2}deg`);

        petal.style.setProperty("--tx-3", `${tx3}px`);
        petal.style.setProperty("--ty-3", `${ty3}px`);
        petal.style.setProperty("--tr-3", `${tr3}deg`);

        petal.style.setProperty("--tx-4", `${tx4}px`);
        petal.style.setProperty("--ty-4", `${ty4}px`);
        petal.style.setProperty("--tr-4", `${tr4}deg`);

        // Thêm hiệu ứng phấp phới mạnh hơn
        const flutterX1 = Math.random() * 30 - 15; // -15px đến 15px (mạnh hơn)
        const flutterY1 = Math.random() * 30 - 15; // -15px đến 15px (mạnh hơn)
        const flutterR1 = Math.random() * 60 - 30; // -30deg đến 30deg (mạnh hơn)
        const flutterS1 = 0.7 + Math.random() * 0.6; // 0.7 đến 1.3 scale (mạnh hơn)

        const flutterX2 = Math.random() * 30 - 15;
        const flutterY2 = Math.random() * 30 - 15;
        const flutterR2 = Math.random() * 60 - 30;
        const flutterS2 = 0.7 + Math.random() * 0.6;

        petal.style.setProperty("--flutter-x1", `${flutterX1}px`);
        petal.style.setProperty("--flutter-y1", `${flutterY1}px`);
        petal.style.setProperty("--flutter-r1", `${flutterR1}deg`);
        petal.style.setProperty("--flutter-s1", flutterS1);

        petal.style.setProperty("--flutter-x2", `${flutterX2}px`);
        petal.style.setProperty("--flutter-y2", `${flutterY2}px`);
        petal.style.setProperty("--flutter-r2", `${flutterR2}deg`);
        petal.style.setProperty("--flutter-s2", flutterS2);

        // Tốc độ animation phấp phới nhanh hơn
        const flutterSpeed = 1 + Math.random() * 2; // 1-3s

        // Thời gian animation ngẫu nhiên
        const duration = 8 + Math.random() * 10; // 8-18s (thời gian dài hơn để di chuyển qua nhiều phần của trang)
        petal.style.animationDuration = `${duration}s, ${flutterSpeed}s`; // Hoạt ảnh chính và phấp phới

        // Độ trễ ngẫu nhiên cho hoạt ảnh phấp phới
        petal.style.animationDelay = `0s, ${Math.random() * 3}s`;

        // Thêm cánh hoa vào container
        container.appendChild(petal);

        // Xóa cánh hoa sau khi animation kết thúc
        setTimeout(() => {
            if (petal.parentNode) {
                petal.parentNode.removeChild(petal);
            }
        }, duration * 1000);
    }

    // Tạo hiệu ứng bong bóng ánh sáng cải tiến
    function createLightBubble() {
        // Lấy container hoặc tạo mới nếu chưa có
        const container =
            flyingPetalsContainer || createFlyingPetalsContainer();

        // Tạo bong bóng ánh sáng
        const bubble = document.createElement("div");
        bubble.className = "light-bubble";

        // Thêm kích thước và màu sắc ngẫu nhiên
        const sizeClass = `size-${Math.floor(Math.random() * 3) + 1}`;
        bubble.classList.add(sizeClass);

        const colorClass = `color-${Math.floor(Math.random() * 3) + 1}`;
        bubble.classList.add(colorClass);

        // Vị trí ngẫu nhiên khắp trang
        const startLeft = Math.random() * 100; // 0-100% của chiều rộng trang
        const startTop = 20 + Math.random() * 70; // 20-90% của chiều cao
        bubble.style.left = `${startLeft}%`;
        bubble.style.top = `${startTop}%`;

        // Đường đi ngẫu nhiên hướng lên trên và zig-zag rộng hơn
        const bx = Math.random() * 200 - 100; // -100 đến 100px
        const by = -(100 + Math.random() * 150); // -100 đến -250px

        // Đặt biến CSS tùy chỉnh
        bubble.style.setProperty("--bx", `${bx}px`);
        bubble.style.setProperty("--by", `${by}px`);

        // Thời gian animation ngẫu nhiên
        const duration = 4 + Math.random() * 8; // 4-12s
        bubble.style.animationDuration = `${duration}s, 2s`; // Hoạt ảnh chính và nhịp đập

        // Độ trễ ngẫu nhiên cho hoạt ảnh nhịp đập
        bubble.style.animationDelay = `0s, ${Math.random() * 2}s`;

        // Thêm bong bóng vào container
        container.appendChild(bubble);

        // Xóa bong bóng sau khi animation kết thúc
        setTimeout(() => {
            if (bubble.parentNode) {
                bubble.parentNode.removeChild(bubble);
            }
        }, duration * 1000);
    }

    // Tạo hiệu ứng tia sáng nhỏ
    function createSparkle() {
        // Lấy container hoặc tạo mới nếu chưa có
        const container =
            flyingPetalsContainer || createFlyingPetalsContainer();

        // Tạo tia sáng mới
        const sparkle = document.createElement("div");
        sparkle.className = "sparkle";

        // Vị trí ngẫu nhiên - khắp trang
        const startLeft = Math.random() * 100; // 0-100% của chiều rộng
        const startTop = Math.random() * 100; // 0-100% của chiều cao
        sparkle.style.left = `${startLeft}%`;
        sparkle.style.top = `${startTop}%`;

        // Thêm tia sáng vào container
        container.appendChild(sparkle);

        // Xóa tia sáng sau khi animation kết thúc
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1500); // Thời gian hoạt ảnh là 1.5s
    }

    // Bắt đầu hiệu ứng cánh hoa bay - nhiều hơn, dày đặc hơn
    function startFlyingPetalsEffect() {
        if (!isFlowerAnimationActive) {
            isFlowerAnimationActive = true;

            // Tạo container nếu chưa có
            createFlyingPetalsContainer();

            // Tạo cánh hoa mới mỗi 120ms (nhiều hơn, nhanh hơn)
            petalInterval = setInterval(createFlyingPetal, 120);

            // Tạo bong bóng ánh sáng mỗi 300ms (nhiều hơn)
            bubbleInterval = setInterval(createLightBubble, 300);

            // Tạo tia sáng mỗi 200ms (nhiều hơn)
            sparkleInterval = setInterval(createSparkle, 200);

            // Tạo sẵn nhiều cánh hoa và bong bóng để hiển thị ngay lập tức
            for (let i = 0; i < 35; i++) {
                // Tăng từ 15 lên 35
                // Tạo với độ trễ để không xuất hiện cùng lúc
                setTimeout(() => {
                    createFlyingPetal();
                    if (i % 2 === 0) {
                        createLightBubble();
                    }
                    if (i % 3 === 0) {
                        createSparkle();
                    }
                }, i * 50); // Tạo mỗi cánh hoa cách nhau 50ms (nhanh hơn)
            }
        }
    }

    // Dừng hiệu ứng cánh hoa bay
    function stopFlyingPetalsEffect() {
        if (isFlowerAnimationActive) {
            isFlowerAnimationActive = false;

            // Xóa các interval
            clearInterval(petalInterval);
            clearInterval(bubbleInterval);
            clearInterval(sparkleInterval);

            // Làm sạch container
            if (flyingPetalsContainer) {
                flyingPetalsContainer.innerHTML = "";
            }
        }
    }

    // Hàm làm nở hoa với hiệu ứng cánh hoa bay
    function bloomFlowers() {
        if (nightFlowers) {
            // Loại bỏ class not-loaded để bắt đầu animation
            nightFlowers.classList.remove("not-loaded");

            // Bắt đầu hiệu ứng cánh hoa bay
            startFlyingPetalsEffect();

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
                // Nếu rời khỏi trang 4, đặt lại trạng thái not-loaded và dừng hiệu ứng
                stopFlyingPetalsEffect();
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
