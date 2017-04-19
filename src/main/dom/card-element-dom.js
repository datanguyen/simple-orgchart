
import BaseDOM from "./base-dom"
import {createContainerByTagName} from "./dom-util"
export default class CardElementDOM extends BaseDOM {

    constructor(id, elementContentDOM, subCardContainerDOM) {
        super(createContainerByTagName("li"));

        this.containerDOM.id = id;
        this.containerDOM.appendChild(elementContentDOM.render());

        if (subCardContainerDOM !== undefined) {
            this.containerDOM.appendChild(subCardContainerDOM.render())
        }
    }
}