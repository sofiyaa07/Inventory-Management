export default class Part {
    constructor(name, model, location, stock, notes, storeLinks, imgSrc, threshold, PART_ID) {
        this._name = name;
        this._model = model;
        this._location = location;
        this._stock = stock;
        this._notes = notes;
        this._storeLinks = storeLinks;
        this._imgSrc = imgSrc;
        this._threshold = threshold;
        this._PART_ID = PART_ID;
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
}