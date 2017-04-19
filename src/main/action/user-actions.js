

export default class UserActions {

    static deleteCardByCardId(cardId, userData = JSON.parse(sessionStorage.rawData)) {
        let subCardsTobeDeleted = userData.filter((user) => user.superiorId === cardId);

        userData.splice(userData.findIndex((user) => user.id === cardId), 1);
        UserActions.updateData(userData);

        if (subCardsTobeDeleted.length === 0) {
            return;
        }
        subCardsTobeDeleted.forEach((user) => UserActions.deleteCardByCardId(user.id));
    }


    static updateData(newData) {
        sessionStorage.rawData = JSON.stringify(newData);
    }
}