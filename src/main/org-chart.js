import UserCard from "./model/user-card"
import { createCardContainer, createCardContent, createCardElement,} from "./dom/dom-util"
import CardContainerDOM from "./dom/card-container-dom";
import CardElementDOM from "./dom/card-element-dom"
import CardContentDOM from "./dom/card-content-dom"

export default class OrgChart {

    constructor(data) {
        this._rawData = data;
        this._rootCard = this.createRootCard();
        this._cards = [];
        this.buildCardTree(this._rootCard, this._cards);
    }

    createRootCard() {
        return this._rawData
            .filter(user => user.superiorId === undefined)
            .map(user => UserCard.mapRawDataToUserCard(user))[0]
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
                .map(subCard => new CardElementDOM(subCard._id, new CardContentDOM(subCard),
                    this.buildNodeByCard(subCard)))
        );
    }

    render() {
        return this.createRootNode();
    }

}