import UserCard from "./model/user-card"

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

    render() {

    }

}