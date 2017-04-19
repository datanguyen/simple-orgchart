import UserActions from "./user-actions"
import UserCard from "../model/user-card"
import CardBoxDOM from "../dom/card-box-dom";
import CardElementDOM from "../dom/card-element-dom";
import UserUtil from "../model/user-util";

export default class DOMActions {

    constructor(cardId) {
        this._cardId = cardId;
    }

    editCardInfo() {
        console.log("Edit Card" + this._cardId);
    }

    addPeerCard() {
        let { parentNode, nextSiblingNode } = this.getFamilyNode();
        let newPeerCardId = parseInt(UserUtil.getMaxId()) + 1;
        let newPeerUserCard = new UserCard(newPeerCardId);

        newPeerUserCard._userCardInfo.setParentId(parentNode.parentNode.id);
        let newPeerCardElementDOM = new CardElementDOM(newPeerCardId, new CardBoxDOM(newPeerUserCard));

        nextSiblingNode === null
            ? parentNode.appendChild(newPeerCardElementDOM.render())
            : parentNode.insertBefore(newPeerCardElementDOM.render(), nextSiblingNode);

        UserActions.addNewCard(newPeerUserCard);
    }

    addSubCard() {
        console.log("Add Sub Card " + this._cardId);
    }

    deleteCard() {
        let { currentNode, parentNode } = this.getFamilyNode();
        parentNode.removeChild(currentNode);

        UserActions.deleteCardByCardId(this._cardId);
    }

    getFamilyNode() {
        let currentNode = document.getElementById(this._cardId);

        return {
            currentNode,
            parentNode: currentNode.parentNode,
            nextSiblingNode: currentNode.nextElementSibling
        };
    }
}
