export default class UserActions {

    static addNewCard(card, userData = JSON.parse(sessionStorage.rawData)) {
        userData.push(
            {
                firstName: card._userCardInfo.getFirstName(),
                lastName: card._userCardInfo.getLastName(),
                title: card._userCardInfo.getTitle(),
                department: card._userCardInfo.getDepartment(),
                project: card._userCardInfo.getProject(),
                avatar: card._userCardInfo.getAvatar(),
                employeeId: card._userCardInfo.getEmployeeId(),
                superiorId: parseInt(card._userCardInfo.getSuperiorId()),
                id: card._id
            }
        );
        UserActions.updateData(userData);
    }

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