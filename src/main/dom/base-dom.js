
export default class BaseDOM {

    constructor(containerDOM) {
        this.containerDOM = containerDOM;
    }

    render() {
        return this.containerDOM;
    }
}