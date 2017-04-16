
import BaseDOM from "./base-dom"
import {createContainerByTagName} from "./dom-util"

export default class CardContainerDOM extends BaseDOM {

    constructor(cardElementDOMs) {
        super(createContainerByTagName("ul"));

        this._cardElementDOMs = cardElementDOMs;
        this._cardElementDOMs.forEach(cardElementDOMs => this._containerDOM.appendChild(cardElementDOMs.render()));
    }

}