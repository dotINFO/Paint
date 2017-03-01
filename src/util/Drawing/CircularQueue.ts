export class CircularQueue<T> {
    private _queue: T[];
    private _length = 0;
    private _size = 0;
    private _top = -1;

    public get length() {
        return this._length;
    }

    public get size() {
        return this._size;
    }

    constructor(length: number) {
        this._length = length;
        this._queue = new Array(this._length);
    }

    public pop(): T {
        var ret = null;;

        if (this._size > 0) {
            ret = this._queue[this._top];
            this._top = (this._top - 1 + this._length) % this.length;
            this._size--;
        }

        return ret;
    }

    public push(el: T) {
        this._top = (++this._top) % this._length;
        this._queue[this._top] = el;

        if (this._size < this._length)
            this._size++;
    }

    public clear() {
        this._size = 0;
    }
}