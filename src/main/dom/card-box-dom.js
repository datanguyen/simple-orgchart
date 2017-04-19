import BaseDOM from "./base-dom"
import DOMActions from "../action/dom-actions"
import {createContainerByTagName, createCommonContainer, createIcon} from "./dom-util"

export default class CardBox extends BaseDOM {

    constructor(card) {
        super(createContainerByTagName("section"));
        this._containerDOM.className = "card";

        this._card = card;
        this._domActions = new DOMActions(this._card._id);

        this._containerDOM.appendChild(this.buildAvatarNode());
        this._containerDOM.appendChild(this.buildInfoNode());
        this._containerDOM.appendChild(this.buildActionNode());
        this._containerDOM.appendChild(this.buildToggleNode());

        this._containerDOM.addEventListener("click", () => {
            this._containerDOM.style.backgroundColor = "#f4f2f2";

            let actionDOM = Array.from(this._containerDOM.childNodes)
                .filter(children => children.className === "action")[0];

            actionDOM.style.display = "initial";
            document.body.addEventListener("click", (e) => {
                let target = e.target;
                if (target !== this._containerDOM) {
                    this._containerDOM.style.backgroundColor = "white";
                    actionDOM.style.display = "none";
                }
            })

        })

    }

    buildAvatarNode() {
        let avaContainer = createCommonContainer("avatar");

        let avatar = document.createElement("img");
        avatar.src = `images/${this._card._userCardInfo.getAvatar()}`;
        avaContainer.appendChild(avatar);

        return avaContainer;
    }

    buildInfoNode() {
        let infoNode = createCommonContainer("info");

        let userName = document.createElement("h3");
        userName.className = "username";
        userName.textContent = this._card._userCardInfo.getUsername();

        let department = document.createElement("h4");
        department.className = "department";
        department.textContent = this._card._userCardInfo.getDepartment();

        let employeeId = document.createElement("a");
        employeeId.className = "employeeId";
        employeeId.setAttribute("href", "#");
        employeeId.textContent = this._card._userCardInfo.getEmployeeId();

        let prefix = document.createElement("i");
        prefix.className = "kms-prefix";
        prefix.textContent = "@kms-technology.com";

        infoNode.appendChild(userName);
        infoNode.appendChild(department);
        infoNode.appendChild(employeeId);
        infoNode.appendChild(prefix);

        return infoNode;
    }

    buildActionNode() {
        let actionNode = createCommonContainer("action");
        let editIcon = createIcon("fa fa-pencil-square-o");
        let createPeerCardIcon = createIcon("fa fa-arrow-circle-right");
        let createSubCardIcon = createIcon("fa fa-arrow-circle-down");
        let deleteIcon = createIcon("fa fa-trash-o");

        editIcon.addEventListener("click", () => this._domActions.editCardInfo());
        createPeerCardIcon.addEventListener("click", () => this._domActions.addPeerCard());
        createSubCardIcon.addEventListener("click", () => this._domActions.addSubCard());
        deleteIcon.addEventListener("click", () => {
            let confirm = window.confirm("Are your sure to delete this card ?");
            if (confirm === true) {
                this._domActions.deleteCard();
            }
        });

        actionNode.appendChild(editIcon);
        actionNode.appendChild(createPeerCardIcon);
        actionNode.appendChild(createSubCardIcon);
        actionNode.appendChild(deleteIcon);

        return actionNode;
    }

    buildToggleNode() {
        let toggleNode = createCommonContainer("toggle");
        let plusIcon = createIcon("fa fa-plus-circle");
        let minusIcon = createIcon("fa fa-minus-circle");

        if (this._card.getSubCards().length === 0) {
            minusIcon.style.display = "none";
        } else {
            plusIcon.style.display = "none";
        }

        minusIcon.addEventListener("click", () => {
            let card = document.getElementById(this._card._id);
            let subCards = card.lastChild;

            subCards.style.display = "none";
            minusIcon.style.display = "none";
            plusIcon.style.display = "initial";

            plusIcon.addEventListener("click", () => {
                subCards.style.display = "flex";
                minusIcon.style.display = "initial";
                plusIcon.style.display = "none"
            })
        });

        toggleNode.appendChild(plusIcon);
        toggleNode.appendChild(minusIcon);
        return toggleNode;
    }
}