import UserCard from "./model/user-card"
import { createCardContainer, createCardContent, createCardElement,} from "./dom/dom-util"

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

        rootCardElement.appendChild(createCardContent(this._rootCard._userCardInfo.getEmployeeId()));
        rootCardElement.appendChild(this.buildNodeByCard(this._rootCard));

        return rootContainer;
    }

    buildNodeByCard(card) {
        if (card.getSubCards().length === 0) {
            return;
        }

        let container = createCardContainer();
        card.getSubCards()
            .forEach(subCard => {
                let card = createCardElement(subCard._id, container);
                card.appendChild(createCardContent(subCard._userCardInfo.getEmployeeId()));

                let subCards = this.buildNodeByCard(subCard);
                if (subCards !== undefined) {
                    card.appendChild(subCards);
                }
            });

        return container;
    }

    render() {
        return this.createRootNode();
    }

}