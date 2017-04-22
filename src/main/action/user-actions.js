export const addNewCard = (card, userData = JSON.parse(sessionStorage.rawData)) => {
    userData.push(
        {
            firstName: card.userCardInfo.getFirstName(),
            lastName: card.userCardInfo.getLastName(),
            title: card.userCardInfo.getTitle(),
            department: card.userCardInfo.getDepartment(),
            project: card.userCardInfo.getProject(),
            avatar: card.userCardInfo.getAvatar(),
            employeeId: card.userCardInfo.getEmployeeId(),
            superiorId: parseInt(card.userCardInfo.getSuperiorId()),
            id: parseInt(card.id)
        }
    );
    updateData(userData);
};

export const deleteCardByCardId = (cardId, userData = JSON.parse(sessionStorage.rawData)) => {
    let subCardsTobeDeleted = userData.filter(user => user.superiorId === cardId);

    userData.splice(userData.findIndex(user => user.id === cardId), 1);
    updateData(userData);

    if (subCardsTobeDeleted.length === 0) {
        return;
    }
    subCardsTobeDeleted.forEach(user => deleteCardByCardId(user.id));
};

export const updateInfoCard = (cardId, valueToBeChanged, userData = JSON.parse(sessionStorage.rawData)) => {

    for (let [key, value] of valueToBeChanged) {
        if (key === "username") {
            let [firstName, ...lastName] = value.split(" ");
            userData.find(user => user.id === cardId)['firstName'] = firstName;
            userData.find(user => user.id === cardId)['lastName'] = lastName;
        } else {
            userData.find(user => user.id === cardId)[key] = value;
        }
    }
    updateData(userData);
};


const updateData = newData => sessionStorage.rawData = JSON.stringify(newData);