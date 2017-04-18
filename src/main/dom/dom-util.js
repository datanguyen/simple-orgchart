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
    let a = document.createElement("section");
    a.className = "card";
    a.appendChild(document.createTextNode(cardContentId));

    return a;
}

export function createContainerByTagName(tagName) {
    return document.createElement(tagName);
}

export function createCommonContainer(className = "null") {
    let divDOM = createContainerByTagName("div");

    if (className !== "null") {
        divDOM.className = className;
    }

    return divDOM;
}

export function createIcon(className = "null") {
    let iconDOM = document.createElement("span");
    iconDOM.className = className;
    iconDOM.setAttribute("aria-hidden", "true");

    return iconDOM;
}