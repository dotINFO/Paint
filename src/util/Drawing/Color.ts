export class Color {

    // Color in string representations 
    private _hexColor: string;
    private _rgbColor: string;

    // Color components
    private _R: number;
    private _G: number;
    private _B: number;
    private _alpha: number;

    constructor(r: number, g: number, b: number, alpha?: number) {
        this._R = r;
        this._G = g;
        this._B = b;
        this._alpha = alpha || 1;
    }

    /**
     * The color in the format #rrggbb
     */
    get HexString(): string {
        let r = this.R.toString(16),
            b = this.B.toString(16),
            g = this.G.toString(16);

        return `#${r.length == 1 ? "0" + r : r}${g.length == 1 ? "0" + g : g}${b.length == 1 ? "0" + b : b}`;
    }

    /**
     * The color in the format rgb(r,g,b)
     */
    get RGBString(): string {
        return `rgb(${this.R}, ${this.G}, ${this.B})`;
    }

    get RGBAString(): string {
        return `rgba(${this.R}, ${this.G}, ${this.B}, ${this.alpha})`;
    }

    /**
     * Red component
     */
    get R(): number {
        return this._R;
    }

    /**
     * Green component
     */
    get G(): number {
        return this._G;
    }

    /**
     * Blue component
     */
    get B(): number {
        return this._B;
    }

    set alpha(alpha: number) {
        if (0 <= alpha && alpha <= 1)
            this._alpha = alpha;
    }

    get alpha() {
        return this._alpha;
    }

    public getRGBAString(alpha: number): string {
        return `rgba(${this.R}, ${this.G}, ${this.B}, ${alpha})`;
    }

    public equals(color: Color, tolerance?: number) {
        if (!tolerance) tolerance = 0;

        return Math.abs(this.R - color.R) <= tolerance &&
            Math.abs(this.G - color.G) <= tolerance &&
            Math.abs(this.B - color.B) <= tolerance
    }

    /* Static colors.
     * Given that Color is a read-only type, we initialize once for all the
     * static variables (_White, _Black, ...) and provide a reference to them
     * through a read-only property.
     */
    static get White(): Color { return Color.fromHEX("#FFFFFF") }
    static get Black(): Color { return Color.fromHEX("#000000") }


    public static fromHEX(hex: string) {
        let color = hex.substring(1, 7),
            r = parseInt(color.substring(0, 2), 16),
            g = parseInt(color.substring(2, 4), 16),
            b = parseInt(color.substring(4, 6), 16);
        return new Color(r, g, b);
    }

    public static fromRGB(rgb: string) {
        var nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(rgb),
            r = parseInt(nums[2], 10),
            g = parseInt(nums[3], 10),
            b = parseInt(nums[4], 10);

        return new Color(r, g, b);
    }
}