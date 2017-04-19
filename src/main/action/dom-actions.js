import UserActions from "./user-actions"

export default class DOMActions {
    static deleteCard(cardId) {
        let cardToBeDeleted =  document.getElementById(cardId);
        cardToBeDeleted.parentNode.removeChild(cardToBeDeleted);

        UserActions.deleteCardByCardId(cardId);
    }
}
