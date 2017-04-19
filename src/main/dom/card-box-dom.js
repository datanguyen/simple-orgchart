import BaseDOM from "./base-dom"
import DOMActions from "../action/dom-actions"
import {
    createContainerByTagName,
    createCommonContainer,
    createCardIcons,
    createCardInfoNodes
} from "./dom-util"

export default class CardBox extends BaseDOM {

    constructor(card) {
        super(createContainerByTagName("section"));
        this.containerDOM.className = "card";

        this.card = card;
        this.domActions = new DOMActions(this.card.id);

        this.containerDOM.appendChild(this.buildAvatarNode());
        this.containerDOM.appendChild(this.buildInfoNode());
        this.containerDOM.appendChild(this.buildActionNode());
        this.containerDOM.appendChild(this.buildToggleNode());

        this.containerDOM.addEventListener("click", () => {
            this.containerDOM.style.backgroundColor = "#f4f2f2";

            let actionDOM = Array.from(this.containerDOM.childNodes)
                .filter(children => children.className === "action")[0];

            actionDOM.style.display = "initial";
            document.body.addEventListener("click", (e) => {
                let target = e.target;
                if (target !== this.containerDOM) {
                    this.containerDOM.style.backgroundColor = "white";
                    actionDOM.style.display = "none";
                }
            })

        })

    }

    buildAvatarNode() {
        let avaContainer = createCommonContainer("avatar");

        let avatar = document.createElement("img");
        avatar.src = `images/${this.card.userCardInfo.getAvatar()}`;
        avaContainer.appendChild(avatar);

        return avaContainer;
    }

    buildInfoNode() {
        let infoNode = createCommonContainer("info");
        let { userName, department, employeeId, prefix } = createCardInfoNodes();

        userName.textContent = this.card.userCardInfo.getUsername();
        department.textContent = this.card.userCardInfo.getDepartment();
        employeeId.textContent = this.card.userCardInfo.getEmployeeId();

        infoNode.appendChild(userName);
        infoNode.appendChild(department);
        infoNode.appendChild(employeeId);
        infoNode.appendChild(prefix);

        return infoNode;
    }

    buildActionNode() {
        let actionNode = createCommonContainer("action");
        let { editIcon, createPeerCardIcon, createSubCardIcon, deleteIcon } = createCardIcons();

        editIcon.addEventListener("click", () => this.domActions.editCardInfo());
        createPeerCardIcon.addEventListener("click", () => this.domActions.addPeerCard());
        createSubCardIcon.addEventListener("click", () => this.domActions.addSubCard());
        deleteIcon.addEventListener("click", () => {
            let confirm = window.confirm("Are your sure to delete this card ?");
            if (confirm === true) {
                this.domActions.deleteCard();
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
        let { plusIcon, minusIcon } = createCardIcons();

        this.card.getSubCards().length === 0 ? minusIcon.style.display = "none" : plusIcon.style.display = "none";

        minusIcon.addEventListener("click", () => {
            let card = document.getElementById(this.card.id);
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