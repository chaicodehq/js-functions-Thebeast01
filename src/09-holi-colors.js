/**
 * 🎨 Holi Color Mixer - Pure Functions
 *
 * Holi ka festival hai! Rang mix karne hain. Lekin PURE FUNCTIONS use
 * karne hain — matlab:
 *   1. Input ko KABHI modify mat karo (no mutation)
 *   2. Same input pe HAMESHA same output aaye
 *   3. Koi side effects nahi (no console.log, no external state changes)
 *
 * Har color object: { name: string, r: number, g: number, b: number }
 *   where r, g, b are 0-255 (RGB values)
 *
 * Functions:
 *
 *   1. mixColors(color1, color2)
 *      - Mix two colors by averaging their RGB values
 *      - New name: `${color1.name}-${color2.name}`
 *      - Round RGB values to integers
 *      - MUST NOT modify color1 or color2
 *      - Agar either color null/invalid, return null
 *
 *   2. adjustBrightness(color, factor)
 *      - Multiply each RGB by factor, clamp to 0-255 range
 *      - Round to integers using Math.round
 *      - Name stays same
 *      - MUST NOT modify original color
 *      - Agar color null or factor not number, return null
 *
 *   3. addToPalette(palette, color)
 *      - Return NEW array with color added at end
 *      - MUST NOT modify original palette array
 *      - Agar palette not array, return [color]
 *      - Agar color null/invalid, return copy of palette
 *
 *   4. removeFromPalette(palette, colorName)
 *      - Return NEW array without the color with that name
 *      - MUST NOT modify original palette
 *      - Agar palette not array, return []
 *
 *   5. mergePalettes(palette1, palette2)
 *      - Merge two palettes into NEW array
 *      - No duplicate names (keep first occurrence)
 *      - MUST NOT modify either original palette
 *      - Agar either not array, treat as empty array
 *
 * Hint: Use spread operator [...arr], Object spread {...obj} to create
 *   copies. NEVER use push, splice, or direct property assignment on inputs.
 *
 * @example
 *   const red = { name: "red", r: 255, g: 0, b: 0 };
 *   const blue = { name: "blue", r: 0, g: 0, b: 255 };
 *   mixColors(red, blue)
 *   // => { name: "red-blue", r: 128, g: 0, b: 128 }
 *   // red and blue objects are UNCHANGED
 */
export function mixColors(color1, color2) {
    if (
        !color1 || !color2 ||
        typeof color1 !== "object" ||
        typeof color2 !== "object"
    ) {
        return null;
    }

    const avg = (a, b) => Math.round((a + b) / 2);

    return {
        name: `${color1.name}-${color2.name}`,
        r: avg(color1.r, color2.r),
        g: avg(color1.g, color2.g),
        b: avg(color1.b, color2.b)
    };
}

export function adjustBrightness(color, factor) {
    if (
        !color ||
        typeof color !== "object" ||
        typeof factor !== "number"
    ) {
        return null;
    }

    const clamp = value =>
        Math.min(255, Math.max(0, Math.round(value)));

    return {
        ...color,
        r: clamp(color.r * factor),
        g: clamp(color.g * factor),
        b: clamp(color.b * factor)
    };
}

export function addToPalette(palette, color) {
    if (!Array.isArray(palette)) {
        return color ? [color] : [];
    }

    if (!color || typeof color !== "object") {
        return [...palette];
    }

    return [...palette, color];
}

export function removeFromPalette(palette, colorName) {
    if (!Array.isArray(palette)) {
        return [];
    }

    return palette.filter(color => color.name !== colorName);
}

export function mergePalettes(palette1, palette2) {
    const p1 = Array.isArray(palette1) ? palette1 : [];
    const p2 = Array.isArray(palette2) ? palette2 : [];

    const combined = [...p1, ...p2];

    const seen = new Set();

    return combined.filter(color => {
        if (seen.has(color.name)) {
            return false;
        }
        seen.add(color.name);
        return true;
    });
}
