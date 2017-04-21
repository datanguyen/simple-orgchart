
import { getDepartments } from "../model/user-util"

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

export const createCardInfoNodes = (username, department, employeeId) => {
    let usernameDOM = createListElement("username", username);
    let departmentDOM = createListElement("department", department, false);
    let employeeIdDOM = createListElement("employeeId", employeeId);
    let prefix = document.createElement("i");

    employeeIdDOM.setAttribute("href", "#");
    prefix.className = "kms-prefix";
    prefix.textContent = "@kms-technology.com";

    return {
        usernameDOM,
        departmentDOM,
        employeeIdDOM,
        prefix,
    }
};

export const createListElement = (labelClassName, value, isInput = true) => {
    let elementDOM = document.createElement("li");

    let label = document.createElement("label");
    label.className = labelClassName;
    label.innerHTML = value;

    let input;
    if (isInput) {
        input = document.createElement("input");
        input.setAttribute("value", value);
    } else {
        input = createDepartmentList(value);
    }

    elementDOM.appendChild(label);
    elementDOM.appendChild(input);
    return elementDOM;
};

export const createDepartmentList = (departmentName) => {
    let selectDOM = document.createElement("select");
    let departments = getDepartments();

    departments.forEach((department) => {
        let optionDOM = document.createElement("option");
        optionDOM.setAttribute("value", department);
        optionDOM.textContent = department;

        if (department === departmentName) {
            optionDOM.setAttribute("selected", "selected");
        }
        selectDOM.appendChild(optionDOM);
    });

    return selectDOM;
};

export const handleNodeToggle = (cardNode, minusIcon, plusIcon, isRelease = true)  => {
    if (cardNode.childNodes.length === 1) {
        return;
    }

    cardNode.lastChild.style.display = isRelease ? "flex" : "none";
    minusIcon.style.display = isRelease ? "initial" : "none";
    plusIcon.style.display = isRelease ? "none" : "initial";
};