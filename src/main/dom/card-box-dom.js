import BaseDOM from './base-dom'
import DOMActions from '../action/dom-actions'
import {
  createContainerByTagName,
  createCommonContainer,
  createCardIcons,
  createCardInfoNodes,
  handleNodeToggle,
  handleDragEnd
} from './dom-util'
import { updateInfoCard } from '../action/user-actions'

export default class CardBox extends BaseDOM {

  constructor (card) {
    super(createContainerByTagName('section'))
    this.containerDOM.className = 'card'
    this.card = card
    this.domActions = new DOMActions(this.card.id)
    this.childrenNode = {
      avatarNode: CardBox.buildAvatarNode(),
      infoNode: this.buildInfoNode(),
      actionNode: this.buildActionNode(),
      toggleNode: this.buildToggleNode()
    }
  }

  render () {
    let { avatarNode, infoNode, actionNode, toggleNode } = this.childrenNode
    this.containerDOM.appendChild(avatarNode)
    this.containerDOM.appendChild(infoNode)
    this.containerDOM.appendChild(actionNode)
    this.containerDOM.appendChild(toggleNode)

    this.containerDOM.addEventListener('click', () => {
      this.containerDOM.style.backgroundColor = '#f4f2f2'
      actionNode.style.display = 'initial'

      document.body.addEventListener('click', e => this.storeInformation(e))
    });
    this.containerDOM.addEventListener('dblclick', () => this.domActions.changeRootCard())
    this.activateDnD()

    return this.containerDOM
  }

  buildInfoNode () {
    let infoNode = createContainerByTagName('ul')
    let { usernameDOM, departmentDOM, employeeIdDOM, prefix } = createCardInfoNodes(this.card.userCardInfo.getUsername(),
      this.card.userCardInfo.getDepartment(), this.card.userCardInfo.getEmployeeId())

    infoNode.className = 'card__info'
    infoNode.appendChild(usernameDOM)
    infoNode.appendChild(departmentDOM)
    infoNode.appendChild(employeeIdDOM)
    infoNode.appendChild(prefix)

    return infoNode
  }

  buildActionNode () {
    let actionNode = createCommonContainer('card__action')
    let { editIcon, createPeerCardIcon, createSubCardIcon, deleteIcon } = createCardIcons()

    editIcon.addEventListener('click', () => this.domActions.editCardInfo(this.childrenNode.infoNode,
      this.childrenNode.avatarNode))
    createPeerCardIcon.addEventListener('click', () => this.domActions.addPeerCard())
    createSubCardIcon.addEventListener('click', () => this.domActions.addSubCard(this.card.getSubCards().length > 0))
    deleteIcon.addEventListener('click', () => {
      let confirm = window.confirm('Are your sure to delete this card ?')
      if (confirm === true) {
        this.domActions.deleteCard()
      }
    })

    actionNode.appendChild(editIcon)
    actionNode.appendChild(createSubCardIcon)

    if (this.card.parent !== undefined) {
      actionNode.appendChild(createPeerCardIcon)
      actionNode.appendChild(deleteIcon)
    }

    return actionNode
  }

  buildToggleNode () {
    let toggleNode = createCommonContainer('card__toggle')
    let { plusIcon, minusIcon } = createCardIcons()

    minusIcon.addEventListener('click', () => handleNodeToggle(this.containerDOM.parentNode, minusIcon, plusIcon, false))
    plusIcon.addEventListener('click', () => handleNodeToggle(this.containerDOM.parentNode, minusIcon, plusIcon))
    this.card.getSubCards().length === 0 ? minusIcon.style.display = 'none' : plusIcon.style.display = 'none'

    toggleNode.appendChild(plusIcon)
    toggleNode.appendChild(minusIcon)
    return toggleNode
  }

  activateDnD () {
    this.containerDOM.setAttribute('draggable', 'true')
    this.containerDOM.addEventListener('drag', () => this.containerDOM.style.border = '2px dashed blue')
    this.containerDOM.addEventListener('dragstart', (e) => e.dataTransfer.setData('id', this.card.id))
    this.containerDOM.addEventListener('dragleave', (e) => handleDragEnd(e, this.containerDOM, false))
    this.containerDOM.addEventListener('dragend', (e) => handleDragEnd(e, this.containerDOM))
    this.containerDOM.addEventListener('dragover', (e) => {
      e.preventDefault()
      if (e.target === this.containerDOM || this.containerDOM.contains(e.target)) {
        this.containerDOM.style.border = '2px dashed blue'
      }
    })

    this.containerDOM.addEventListener('drop', (e) => {
      e.preventDefault()
      let cardId = e.dataTransfer.getData('id')
      let draggedCard = document.getElementById(cardId)

      if (cardId === this.card.id.toString()) {
        return
      }

      this.domActions.dropCard(draggedCard, this.card.getSubCards().length > 0)
      document.getElementById('msg').innerHTML = ''
    })
  }

  static buildAvatarNode () {
    let avaContainer = createCommonContainer('card__avatar')

    let avatar = document.createElement('img')
    avatar.src = 'images/avatar.png'
    avaContainer.appendChild(avatar)

    let button = document.createElement('input')
    button.setAttribute('type', 'file')
    button.className = 'button_change-avatar'
    button.setAttribute('disabled', 'disabled')

    avaContainer.appendChild(button)
    return avaContainer
  }

  storeInformation (e) {
    let { avatarNode, infoNode, actionNode, toggleNode } = this.childrenNode

    if (toggleNode.contains(e.target) || !this.containerDOM.contains(e.target)) {
      let infoChangedByName = new Map()
      this.containerDOM.style.backgroundColor = 'white'
      actionNode.style.display = 'none'
      avatarNode.firstChild.style.border = '1px solid black'
      avatarNode.lastChild.setAttribute('disabled', 'disabled')

      Array.from(infoNode.childNodes)
        .forEach(childNode => {
          if (childNode === infoNode.lastChild) {
            return
          }
          let {firstChild: label, lastChild: input} = childNode
          label.style.display = 'initial'
          input.style.display = 'none'

          if (label.textContent !== input.value) {
            label.innerHTML = input.value
            infoChangedByName.set(label.getAttribute('for'), input.value)
          }
        })

      if (infoChangedByName.size !== 0) {
        updateInfoCard(this.card.id, infoChangedByName)
      }
    }
  }
}