import BaseDOM from "./base-dom"
import DOMActions from "../action/dom-actions"
import {
    createContainerByTagName,
    createCommonContainer,
    createCardIcons,
    createCardInfoNodes,
    handleNodeToggle
} from "./dom-util"

export default class CardBox extends BaseDOM {

    constructor(card) {
        super(createContainerByTagName("section"));
        this.containerDOM.className = "card";

        this.card = card;
        this.domActions = new DOMActions(this.card.id);



        this.childrenNode = {
            avatarNode: this.buildAvatarNode(),
            infoNode: this.buildInfoNode(),
            actionNode: this.buildActionNode(),
            toggleNode: this.buildToggleNode()
        }

    }

    render() {
        this.containerDOM.appendChild(this.childrenNode.avatarNode);
        this.containerDOM.appendChild(this.childrenNode.infoNode);
        this.containerDOM.appendChild(this.childrenNode.actionNode);
        this.containerDOM.appendChild(this.childrenNode.toggleNode);

        this.containerDOM.addEventListener("click", () => {
            this.containerDOM.style.backgroundColor = "#f4f2f2";
            this.childrenNode.actionNode.style.display = "initial";

            document.body.addEventListener("click", (e) => {
                if (this.childrenNode.toggleNode.contains(e.target) || !this.containerDOM.contains(e.target)) {
                    this.containerDOM.style.backgroundColor = "white";
                    this.childrenNode.actionNode.style.display = "none";
                }
            })
        });

        return this.containerDOM;
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
        let {userName, department, employeeId, prefix} = createCardInfoNodes();

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
        let {editIcon, createPeerCardIcon, createSubCardIcon, deleteIcon} = createCardIcons();

        editIcon.addEventListener("click", () => this.domActions.editCardInfo());
        createPeerCardIcon.addEventListener("click", () => this.domActions.addPeerCard());
        createSubCardIcon.addEventListener("click", () => this.domActions.addSubCard(this.card.getSubCards().length > 0));
        deleteIcon.addEventListener("click", () => {
            let confirm = window.confirm("Are your sure to delete this card ?");
            if (confirm === true) {
                this.domActions.deleteCard();
            }
        });

        actionNode.appendChild(editIcon);
        actionNode.appendChild(createSubCardIcon);

        if (this.card.parent !== undefined) {
            actionNode.appendChild(createPeerCardIcon);
            actionNode.appendChild(deleteIcon);
        }

        return actionNode;
    }

    buildToggleNode() {
        let toggleNode = createCommonContainer("toggle");
        let {plusIcon, minusIcon} = createCardIcons();

        minusIcon.addEventListener("click", () => handleNodeToggle(this.containerDOM.parentNode, minusIcon, plusIcon, false));
        plusIcon.addEventListener("click", () => handleNodeToggle(this.containerDOM.parentNode, minusIcon, plusIcon));
        this.card.getSubCards().length === 0 ? minusIcon.style.display = "none" : plusIcon.style.display = "none";

        toggleNode.appendChild(plusIcon);
        toggleNode.appendChild(minusIcon);
        return toggleNode;
    }
}