export class Point {
    private x: number;
    private y: number;

    static get Zero(): Point {
        return new Point(0, 0);
    }

    get X(): number {
        return this.x;
    }

    get Y(): number {
        return this.y;
    }

    public static fromPoint(pt: Point): Point {
        return new Point(pt.X, pt.Y);
    }

    /**
     * Creates an instance of Point.
     * 
     * @param {number} x X component
     * @param {number} y Y component
     */
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * Moves the point by offset
     * 
     * @param {number} x offset on X component
     * @param {number} y offset on Y component
     * @returns this (modified)
     */
    public moveBy(x: number, y: number) {
        this.x += x;
        this.y += y;
        return this;
    }

    /**
     * Check if two points are the same
     * 
     * @param {Point} point the comparison term
     * @returns {boolean} true if equal, false otherwise
     */
    public equals(point: Point): boolean {
        return this.x == point.x && this.y == point.y;
    }

    /**
     * Finds a point between this and Point passed
     * 
     * @param {Point} point
     * @returns {Point} the mid point
     */
    public midPointFrom(point: Point): Point {
        return this.lerp(point);
    }

    private lerp(point: Point, t?: number): Point {
        if (typeof t === 'undefined') {
            t = 0.5;
        }

        t = Math.max(Math.min(1, t), 0);
        return new Point(this.x + (point.X - this.x) * t, this.y + (point.Y - this.y) * t);
    }

    public toString() {
        return '(' + this.X + ', ' + this.Y + ')';
    }
}
