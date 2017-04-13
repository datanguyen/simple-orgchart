
import UserInfo from "./user-info"

export default class UserCard {

    constructor(id, ...userInfo) {
        this._userCardInfo = new UserInfo(...userInfo);
        this._id = id;
        this._subCards = [];
    }

    addParent(parent) {
        this._parent = parent;
    }

    addSubCard(subCard) {
        this._subCards.push(subCard)
    }

    addSubCards(subCards) {
        subCards.forEach(subCard => this.addSubCard(subCard))
    }

    removeSubCard(subCardId) {
        let userCardId = this._subCards.indexOf(this._subCards.filter(card => card.id === subCardId));

    }

    getSubCards() {
        return this._subCards;
    }

    static mapRawDataToUserCard(user) {
        return new UserCard(user.id, user.firstName, user.lastName, user.title, user.department,
          user.project, user.avatar, user.employeeId)
    }

}