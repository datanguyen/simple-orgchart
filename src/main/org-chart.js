import UserCard from "./model/user-card"
import { createCardContainer, createCardContent, createCardElement,} from "./dom/dom-util"
import CardContainerDOM from "./dom/card-container-dom";
import CardElementDOM from "./dom/card-element-dom"
import CardBoxDOM from "./dom/card-box-dom"

export default class OrgChart {

    constructor(data) {
        this._rawData = data;
        this._rootCard = this.createRootCard();
        this._cards = [];
        this.buildCardTree(this._rootCard, this._cards);
    }

    createRootCard() {
        return UserCard.mapRawDataToUserCard(this._rawData
            .find((user) => user.superiorId === undefined));
    }

    buildCardTree(card, cards) {
        if (card === undefined) {
            return;
        }

        cards.push(card);
        card.addSubCards(this.getSubCardsById(card._id));
        card.getSubCards()
            .forEach(subCard => {
                subCard.addParent(card);
                this.buildCardTree(subCard, cards);
            })
    }

    getSubCardsById(cardId) {
        return this._rawData
            .filter(user => user.superiorId === cardId)
            .map(user => UserCard.mapRawDataToUserCard(user))
    }

    createRootNode() {
        if (this._rootCard === undefined) {
            return;
        }
        let rootContainer = createCardContainer();
        let rootCardElement = createCardElement(this._rootCard._id, rootContainer);

        rootCardElement.appendChild(createCardContent(this._rootCard._userCardInfo.getUsername()));
        rootCardElement.appendChild(this.buildNodeByCard(this._rootCard).render());

        return rootContainer;
    }

    buildNodeByCard(card) {
        if (card.getSubCards().length === 0) {
            return;
        }

        return new CardContainerDOM(
            card.getSubCards()
                .map(subCard => new CardElementDOM(subCard._id, new CardBoxDOM(subCard),
                    this.buildNodeByCard(subCard)))
        );
    }

    createBreadscumbs() {
        let superRootContainerDOM = document.getElementById("root-path");
        let superRootName = "Vu Lam";

        if (superRootContainerDOM === undefined) {
            return;
        }
        let superiorCard = this._rootCard.getParent();

        if (superiorCard !== undefined) {
            superRootName = superiorCard._userCardInfo.getUsername();
            superRootContainerDOM.id = superiorCard._id;
        }

        superRootContainerDOM.textContent = `${superRootName}`;
        let textNode = document.createTextNode(` / ${this._rootCard._userCardInfo.getUsername()}`);
        superRootContainerDOM.parentNode.appendChild(textNode);
    }

    render() {
        this.createBreadscumbs();
        return this.createRootNode();
    }

}