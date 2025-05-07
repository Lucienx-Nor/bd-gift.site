/**
 * utils.js - Utility functions for the birthday card
 */

/**
 * Adjusts the brightness of a color
 * @param {string} hex - The hex color code
 * @param {number} percent - The brightness percent (100 is original, <100 is darker, >100 is lighter)
 * @returns {string} - The adjusted hex color
 */
export function adjustColorBrightness(hex, percent) {
    // Chuyển từ hex sang rgb
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);

    // Điều chỉnh độ sáng
    r = Math.round(r * (percent / 100));
    g = Math.round(g * (percent / 100));
    b = Math.round(b * (percent / 100));

    // Giới hạn giá trị
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));

    // Chuyển lại thành hex
    return `#${r.toString(16).padStart(2, "0")}${g
        .toString(16)
        .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

/**
 * Gets the hue value from a hex color
 * @param {string} hexColor - The hex color code
 * @returns {number} - The hue value (0-360)
 */
export function getHue(hexColor) {
    // Chuyển mã hex thành RGB
    let r = 0,
        g = 0,
        b = 0;

    if (hexColor.startsWith("#")) {
        const hex = hexColor.substring(1);
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
    } else if (hexColor.startsWith("rgb")) {
        const rgbMatch = hexColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (rgbMatch) {
            r = parseInt(rgbMatch[1]);
            g = parseInt(rgbMatch[2]);
            b = parseInt(rgbMatch[3]);
        }
    }

    // Chuyển RGB thành HSL
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;

    if (max === min) {
        h = 0; // achromatic
    } else {
        const d = max - min;
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return h * 360;
}
