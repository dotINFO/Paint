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

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }


    public toString() {
        return '(' + this.X + ', ' + this.Y + ')';
    }
}
