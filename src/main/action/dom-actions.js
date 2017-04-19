import UserCard from "../model/user-card"
import CardBoxDOM from "../dom/card-box-dom";
import CardElementDOM from "../dom/card-element-dom";
import {
    addNewCard,
    deleteCardByCardId
} from "./user-actions"
import { getMaxId } from "../model/user-util";

export default class DOMActions {

    constructor(cardId) {
        this.cardId = cardId;
    }

    editCardInfo() {
        console.log("Edit Card" + this.cardId);
    }

    addPeerCard() {
        let { parentNode, nextSiblingNode } = this.getFamilyNode();
        let newPeerCardId = parseInt(getMaxId()) + 1;
        let newPeerUserCard = new UserCard(newPeerCardId);

        newPeerUserCard.userCardInfo.setParentId(parentNode.parentNode.id);
        let newPeerCardElementDOM = new CardElementDOM(newPeerCardId, new CardBoxDOM(newPeerUserCard));

        nextSiblingNode === null ? parentNode.appendChild(newPeerCardElementDOM.render())
            : parentNode.insertBefore(newPeerCardElementDOM.render(), nextSiblingNode);

        addNewCard(newPeerUserCard);
    }

    addSubCard() {
        console.log("Add Sub Card " + this.cardId);
    }

    deleteCard() {
        let { currentNode, parentNode } = this.getFamilyNode();
        parentNode.removeChild(currentNode);
        deleteCardByCardId(this.cardId);
    }

    getFamilyNode() {
        let currentNode = document.getElementById(this.cardId);

        return {
            currentNode,
            parentNode: currentNode.parentNode,
            nextSiblingNode: currentNode.nextElementSibling
        };
    }
}
