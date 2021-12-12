import type { Color, Hex, Hsv, Rgb } from '$lib/type/types';

/**
 * Convert HSV representation to RGB HEX string.
 * Credits to http://www.raphaeljs.com
 */
function hsv2rgb(hsv: Hsv & Partial<Hex>): Color {
	let R, G, B;
	let h = (hsv.h % 360) / 60;

	const C = hsv.v * hsv.s;
	const X = C * (1 - Math.abs((h % 2) - 1));
	R = G = B = hsv.v - C;

	h = ~~h;
	R += [C, X, 0, 0, X, C][h];
	G += [X, C, C, X, 0, 0][h];
	B += [0, 0, X, C, C, X][h];

	const r = Math.round(R * 255);
	const g = Math.round(G * 255);
	const b = Math.round(B * 255);

	return {
		...hsv,
		r: r,
		g: g,
		b: b,
		hex: 'hex' in hsv ? hsv.hex : rgb2hex({ r, g, b, a: hsv.a }).hex
	};
}

/**
 * Converts RGB representation to HEX representation
 */
function rgb2hex(rgb: Rgb): Hex {
	return {
		hex:
			'#' +
			[rgb.r, rgb.g, rgb.b, Math.round(rgb.a * 255) | 0]
				.map(x => x.toString(16).padStart(2, '0'))
				.join('')
	};
}

/**
 * Converts HEX representation to RGB representation
 */
function hex2rgb(color: Hex & {a: number}): Rgb & Hex {
	const HEX = color.hex.charAt(0) === '#' ? color.hex.slice(1) : color.hex;
	if (HEX.length <= 4) {
		return {
			r: parseInt(HEX.charAt(0), 16) * 16,
			g: parseInt(HEX.charAt(1), 16) * 16,
			b: parseInt(HEX.charAt(2), 16) * 16,
			a: HEX.length === 4 ? parseInt(HEX.charAt(2), 16) / 16 : 1,
			hex: color.hex
			// hex: HEX.length === 4 || color.a === 1 ? color.hex : `${color.hex}${Math.round(color.a * 15).toString(16)}`
		};
	} else {
		return {
			r: parseInt(HEX.substr(0, 2), 16),
			g: parseInt(HEX.substr(2, 2), 16),
			b: parseInt(HEX.substr(4, 2), 16),
			a: HEX.length === 8 ? parseInt(HEX.substr(6, 2), 16) / 255 : 1,
			hex: color.hex
			// hex: HEX.length === 8 || color.a === 1 ? color.hex : `${color.hex}${Math.round(color.a * 255).toString(16).padStart(2, '0')}`
		};
	}
}

/**
 * Convert RGB representation to HSV.
 * Credits to http://www.raphaeljs.com
 */
function rgb2hsv(rgb: Rgb & Partial<Hex>): Color {
	const r = rgb.r / 255;
	const g = rgb.g / 255;
	const b = rgb.b / 255;

	const V = Math.max(r, g, b);
	const C = V - Math.min(r, g, b);
	const S = C === 0 ? 0 : C / V;
	let H =
		C === 0
			? null
			: V === r
			? (g - b) / C + (g < b ? 6 : 0)
			: V === g
			? (b - r) / C + 2
			: (r - g) / C + 4;
	H = (H % 6) * 60;
	return {
		...rgb,
		h: H,
		s: S,
		v: V,
		hex: 'hex' in rgb ? rgb.hex : rgb2hex(rgb).hex
	};
}

export default { hsv2rgb, rgb2hsv, hex2rgb };
