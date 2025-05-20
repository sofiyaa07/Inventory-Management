export default class Part {
    // Track the number of part instances
    static numParts = 0;

    constructor(name, model, location, stock, notes, storeLinks, imgSrc, threshold) {
        this._name = name;
        this._model = model;
        this._location = location;
        this._stock = stock;
        this._notes = notes;
        this._storeLinks = storeLinks;
        this._imgSrc = imgSrc;
        this._threshold = threshold;

        // Part counter
        Part.numParts++;
        this._PART_ID = Part.numParts;

    }

    get name() {
        return this._name;
    }

    get model() {
        return this._model;
    }

    get location() {
        return this._location;
    }

    get stock() {
        return this._stock;
    }

    get notes() {
        return this._notes;
    }

    get storeLinks() {
        return this._storeLinks;
    }

    get imgSrc() {
        return this._imgSrc;
    }

    get threshold() {
        return this._threshold;
    }

    get PART_ID() {
        return this._PART_ID;
    }

    set name(na) {
        this._name = na;
    }

    set model(m) {
        this._model = m;
    }

    set location(lo) {
        this._location = lo;
    }

    set stock(num) {
        this._stock += num;
    }

    set notes(no) {
        this._notes = no;
    }

    set storeLinks(li) {
        this._storeLinks = li;
    }

    set imgSrc(img) {
        this._imgSrc = img;
    }

    set threshold(t) {
        this._threshold = t;
    }

}