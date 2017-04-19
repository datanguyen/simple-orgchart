
import BaseDOM from "./base-dom"
import {createContainerByTagName} from "./dom-util"
export default class CardElementDOM extends BaseDOM {

    constructor(id, elementContentDOM, subCardContainerDOM) {
        super(createContainerByTagName("li"));

        this._containerDOM.id = id;
        this._containerDOM.appendChild(elementContentDOM.render());

        if (subCardContainerDOM !== undefined) {
            this._containerDOM.appendChild(subCardContainerDOM.render())
        }
    }
}