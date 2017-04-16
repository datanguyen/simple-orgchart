export function createCardContainer() {
    return document.createElement("ul");
}

export function createCardElement(cardId, parentNode) {
    let cardElement = document.createElement("li");
    cardElement.id = cardId;
    parentNode.appendChild(cardElement);

    return cardElement;
}

export function createCardContent(cardContentId) {
    let a = document.createElement("a");
    a.appendChild(document.createTextNode(cardContentId));

    return a;
}

export function createContainerByTagName(tagName) {
    return document.createElement(tagName);
}