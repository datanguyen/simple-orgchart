import UserCard from "./model/user-card"
import CardContainerDOM from "./dom/card-container-dom";
import CardElementDOM from "./dom/card-element-dom"
import CardBoxDOM from "./dom/card-box-dom"
import { createContainerByTagName } from "./dom/dom-util"

export default class OrgChart {

    constructor(data) {
        this.rawData = data;
        this.rootCard = this.createRootCard();
        this.cards = [];
        this.buildCardTree(this.rootCard, this.cards);
    }

    createRootCard() {
        return UserCard.mapRawDataToUserCard(this.rawData
            .find(user => user.superiorId === undefined));
    }

    buildCardTree(card, cards) {
        if (card === undefined) {
            return;
        }

        cards.push(card);
        card.addSubCards(this.getSubCardsById(card.id));
        card.getSubCards()
            .forEach((subCard) => {
                subCard.addParent(card);
                this.buildCardTree(subCard, cards);
            })
    }

    getSubCardsById(cardId) {
        return this.rawData
            .filter(user => user.superiorId === cardId)
            .map(user => UserCard.mapRawDataToUserCard(user))
    }

    createRootNode() {
        if (this.rootCard === undefined) {
            return;
        }
        let rootContainer = createContainerByTagName("ul");
        let rootDOM = new CardElementDOM(this.rootCard.id, new CardBoxDOM(this.rootCard));

        rootDOM.render().appendChild(this.buildNodeByCard(this.rootCard).render());
        rootContainer.appendChild(rootDOM.render());

        return rootContainer;
    }

    buildNodeByCard(card) {
        if (card.getSubCards().length === 0) {
            return;
        }

        return new CardContainerDOM(
            card.getSubCards()
                .map(subCard => new CardElementDOM(subCard.id, new CardBoxDOM(subCard),
                    this.buildNodeByCard(subCard)))
        );
    }

    createBreadscumbs() {
        let superRootContainerDOM = document.getElementById("root-path");
        let superRootName = "Vu Lam";

        if (superRootContainerDOM === undefined) {
            return;
        }
        let superiorCard = this.rootCard.getParent();

        if (superiorCard !== undefined) {
            superRootName = superiorCard.userCardInfo.getUsername();
            superRootContainerDOM.id = superiorCard.id;
        }

        superRootContainerDOM.textContent = `${superRootName}`;
        let textNode = document.createTextNode(` / ${this.rootCard.userCardInfo.getUsername()}`);
        superRootContainerDOM.parentNode.appendChild(textNode);
    }

    render() {
        this.createBreadscumbs();
        return this.createRootNode();
    }

}