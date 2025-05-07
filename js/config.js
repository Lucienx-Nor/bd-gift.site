/**
 * config.js - Configuration and constants for the birthday card
 */

// Firework configurations
export const FIREWORK_TYPES = [
    "circular", // Hình tròn cổ điển
    "spiral", // Xoắn ốc
    "heart", // Hình trái tim
    "star", // Hình ngôi sao
    "burst", // Bùng nổ
    "palm", // Cây cọ
    "ring", // Vòng tròn
    "chrysanthemum", // Hoa cúc
    "crossette", // Tia chéo
    "willow", // Cây liễu rủ
    "cascade", // Thác nước (mới)
    "peony", // Hoa mẫu đơn (mới)
    "galaxy", // Hình thiên hà (mới)
    "crown", // Hình vương miện (mới)
    "glitter", // Lấp lánh (mới)
];

// Vibrant colors for fireworks
export const VIBRANT_COLORS = [
    "#FF5252",
    "#FFD54F",
    "#64B5F6",
    "#f8a5c2",
    "#a29bfe",
    "#74b9ff",
    "#ff9ff3",
    "#55efc4",
    "#fdcb6e",
    "#fab1a0",
    "#ff6b6b",
    "#48dbfb",
    "#1dd1a1",
    "#00d2d3",
    "#54a0ff",
    "#5f27cd",
    "#c8d6e5",
    "#576574",
    "#FF9AA2",
    "#FFB7B2",
    "#FFDAC1",
    "#E2F0CB",
    "#B5EAD7",
    "#C7CEEA",
    "#F1C0E8",
    "#CFBAF0",
    "#A3C4F3",
    "#90DBF4",
    "#8EECF5",
    "#98F5E1",
    "#ffbe0b",
    "#fb5607",
    "#ff006e",
    "#8338ec",
    "#3a86ff",
    "#38b000",
    "#FF81AE",
    "#FF9E80",
    "#80D8FF",
    "#B388FF",
    "#EA80FC",
    "#AEF4A4",
    "#FF1744",
    "#F50057",
    "#D500F9",
    "#651FFF",
    "#3D5AFE",
    "#2979FF",
    "#00B0FF",
    "#00E5FF",
    "#1DE9B6",
    "#00E676",
    "#76FF03",
    "#C6FF00",
    "#FFEA00",
    "#FFC400",
    "#FF9100",
    "#FF3D00",
    "#FF6D00",
    "#FFD600",
    "#FFE57F",
    "#C5E1A5",
    "#B2DFDB",
    "#B2EBF2",
    "#BBDEFB",
    "#D1C4E9",
    "#E1BEE7",
    "#F8BBD0",
    "#FFCDD2",
    "#FFE0B2",
    "#FFCCBC",
    "#D7CCC8",
    "#FED2D2",
    "#FED7E2",
    "#FAE8FF",
    "#E9D8FD",
    "#D6BCFA",
    "#B794F4",
];

// Flower colors configuration
export const FLOWER_COLORS = {
    rose: ["#f8a5c2", "#ff9ff3", "#ff85a2", "#ff77a9", "#f368e0", "#ff0080"], // Các sắc hồng
    bluebell: [
        "#74b9ff",
        "#5c95ff",
        "#6488ea",
        "#7fa9f9",
        "#0984e3",
        "#4287f5",
    ], // Các sắc xanh dương
    tulip: ["#a29bfe", "#8c7ae6", "#9980FA", "#b19cd9", "#6c5ce7", "#8e44ad"], // Các sắc tím
    daisy: ["#55efc4", "#00d2d3", "#2ecc71", "#1abc9c", "#20bf6b", "#0fb9b1"], // Các sắc xanh lá
    sunflower: [
        "#fdcb6e",
        "#ffeaa7",
        "#f1c40f",
        "#f39c12",
        "#feca57",
        "#fed330",
    ], // Các sắc vàng
    poppy: ["#fab1a0", "#ff9a76", "#ff7675", "#e74c3c", "#eb3b5a", "#e66767"], // Các sắc đỏ, cam
    orchid: ["#e056fd", "#be2edd", "#d568f2", "#b33de4", "#9818d6", "#8854d0"], // Lan (mới)
    carnation: [
        "#ff5e57",
        "#ff3f34",
        "#ff4d4d",
        "#ff3838",
        "#ff5252",
        "#ff3131",
    ], // Cẩm chướng (mới)
    lily: ["#ffffff", "#f5f6fa", "#dfe4ea", "#ced6e0", "#a4b0be", "#eaeaea"], // Hoa loa kèn (mới)
    peony: ["#ff9ff3", "#f78fb3", "#f8a5c2", "#f38fb3", "#fd79a8", "#e84393"], // Mẫu đơn (mới)
};

// Flower positions configuration
export const FLOWER_POSITIONS = [
    { bottom: 400, left: -100 }, // Hoa bên trái xa nhất, cao nhất
    { bottom: 370, left: -40 }, // Hoa bên trái, hơi thấp hơn
    { bottom: 370, left: 40 }, // Hoa bên phải, cùng độ cao với hoa trái
    { bottom: 340, left: 100 }, // Hoa bên phải xa nhất, thấp nhất
];
