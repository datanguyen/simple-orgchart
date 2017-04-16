
export default class BaseDOM {

    constructor(containerDOM) {
        this._containerDOM = containerDOM;
    }

    render() {
        return this._containerDOM;
    }
}