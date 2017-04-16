
import BaseDOM from "./base-dom"
import {createContainerByTagName} from "./dom-util"
export default class CardContent extends BaseDOM {

    constructor(card) {
        super(createContainerByTagName("a"));

        let textNode = document.createTextNode(card._userCardInfo.getUsername());
        this._containerDOM.appendChild(textNode);
    }
}