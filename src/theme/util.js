// colorUtils.js

export function hexToHSL(hex) {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
      case g: h = ((b - r) / d + 2); break;
      case b: h = ((r - g) / d + 4); break;
    }
    h *= 60;
  }

  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function generatePastelFromTheme(baseColors) {
  if (!Array.isArray(baseColors) || baseColors.length === 0) {
    console.warn('No base colors provided.');
    return 'hsl(0, 0%, 80%)'; // fallback gray
  }

  const randomHex = baseColors[Math.floor(Math.random() * baseColors.length)];

  if (!randomHex || typeof randomHex !== 'string' || !randomHex.startsWith('#')) {
    console.warn('Invalid base hex color:', randomHex);
    return 'hsl(0, 0%, 80%)';
  }

  const { h } = hexToHSL(randomHex);
  const s = Math.floor(Math.random() * 15) + 20;
  const l = Math.floor(Math.random() * 10) + 65;
  return `hsl(${h}, ${s}%, ${l}%)`;
}
