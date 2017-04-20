
export const createContainerByTagName = tagName => document.createElement(tagName);

export const createCommonContainer = (className = "null") => {
    let divDOM = createContainerByTagName("div");

    if (className !== "null") {
        divDOM.className = className;
    }

    return divDOM;
};

export const createIcon = (className = "null") => {
    let iconDOM = document.createElement("span");
    iconDOM.className = className;
    iconDOM.setAttribute("aria-hidden", "true");

    return iconDOM;
};

export const createCardIcons = () => {
    return {
        plusIcon: createIcon("fa fa-plus-circle"),
        minusIcon: createIcon("fa fa-minus-circle"),
        editIcon: createIcon("fa fa-pencil-square-o"),
        createPeerCardIcon: createIcon("fa fa-arrow-circle-right"),
        createSubCardIcon: createIcon("fa fa-arrow-circle-down"),
        deleteIcon: createIcon("fa fa-trash-o")
    }
};

export const createCardInfoNodes = () => {
    let userName = document.createElement("h3");
    userName.className = "username";

    let department = document.createElement("h4");
    department.className = "department";

    let employeeId = document.createElement("a");
    employeeId.className = "employeeId";
    employeeId.setAttribute("href", "#");

    let prefix = document.createElement("i");
    prefix.className = "kms-prefix";
    prefix.textContent = "@kms-technology.com";

    return {
        userName,
        department,
        employeeId,
        prefix
    }
};

export const handleNodeToggle = (cardNode, minusIcon, plusIcon, isRelease = true)  => {
    if (cardNode.childNodes.length === 1) {
        return;
    }

    cardNode.lastChild.style.display = isRelease ? "flex" : "none";
    minusIcon.style.display = isRelease ? "initial" : "none";
    plusIcon.style.display = isRelease ? "none" : "initial";
};