import UserCard from "../model/user-card"
import CardBoxDOM from "../dom/card-box-dom";
import CardElementDOM from "../dom/card-element-dom";
import CardContainerDOM from "../dom/card-container-dom";
import {
    addNewCard,
    deleteCardByCardId
} from "./user-actions"
import {getNewId} from "../model/user-util";

export default class DOMActions {

    constructor(cardId) {
        this.cardId = cardId;
    }

    editCardInfo(infoNode, avatarNode) {
        let { firstChild, lastChild } = avatarNode;

        lastChild.removeAttribute("disabled");
        firstChild.style.border = "1px solid red";
        firstChild.addEventListener("click", () => {
            lastChild.click();
            lastChild.addEventListener("change", (e) => {
                if (e.target.files[0]) {
                    let reader = new FileReader();
                    reader.addEventListener("load", (e) => firstChild.setAttribute("src", e.target.result));
                    reader.readAsDataURL(e.target.files[0]);
                }
            });
        });


        Array.from(infoNode.childNodes)
            .forEach(childrenNode => {
                if (childrenNode === infoNode.lastChild) {
                    return;
                }

                childrenNode.firstChild.style.display = "none";
                childrenNode.lastChild.style.display = "initial";
            })
    }

    addPeerCard() {
        let { parentNode, nextSiblingNode } = this.getFamilyNode();
        let { newUserCard, newUserCardDOM } = this.createNewUserCardDOM();

        nextSiblingNode === null ? parentNode.appendChild(newUserCardDOM.render())
            : parentNode.insertBefore(newUserCardDOM.render(), nextSiblingNode);

        addNewCard(newUserCard);
    }

    addSubCard(alreadyHasChild) {
        let { currentNode, lastChild } = this.getFamilyNode();
        let { newUserCard, newUserCardDOM, newUserCardContainerDOM } = this.createNewUserCardDOM(false);

        alreadyHasChild ? lastChild.appendChild(newUserCardDOM.render())
            : currentNode.appendChild(newUserCardContainerDOM.render());

        addNewCard(newUserCard);
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
            nextSiblingNode: currentNode.nextElementSibling,
            lastChild: currentNode.lastChild
        };
    }

    createNewUserCardDOM(isPeerCard = true) {
        let { parentNode } = this.getFamilyNode();

        let newUserId = getNewId();
        let newUserCard = new UserCard(newUserId);
        let newParentId = isPeerCard ? parentNode.parentNode.id : this.cardId;

        newUserCard.addParent({ id: newParentId});
        newUserCard.userCardInfo.setParentId(newParentId);
        let newUserCardDOM = new CardElementDOM(newUserId.toString(), new CardBoxDOM(newUserCard));

        return {
            newUserCard,
            newUserCardDOM,
            newUserCardContainerDOM: new CardContainerDOM([newUserCardDOM])
        }
    }
}
