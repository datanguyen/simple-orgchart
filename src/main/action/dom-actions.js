import OrgChart from '../org-chart'
import UserCard from '../model/user-card'
import CardBoxDOM from '../dom/card-box-dom'
import CardElementDOM from '../dom/card-element-dom'
import CardContainerDOM from '../dom/card-container-dom'
import {
  addNewCard,
  deleteCardByCardId,
  updateInfoCard
} from './user-actions'
import { getNewId } from '../model/user-util'

export default class DOMActions {

  constructor (cardId) {
    this.cardId = cardId
  }

  editCardInfo (infoNode, avatarNode) {
    let { firstChild: avatarFirstChild, lastChild: avatarLastChild } = avatarNode

    avatarLastChild.removeAttribute('disabled')
    avatarFirstChild.style.border = '1px dashed blue'
    avatarFirstChild.addEventListener('click', () => {
      avatarLastChild.click()
      avatarLastChild.addEventListener('change', (e) => {
        e.preventDefault()
        if (e.target.files[0]) {
          avatarFirstChild.setAttribute('src', URL.createObjectURL(e.target.files[0]))
        }
      })
    })

    Array.from(infoNode.childNodes)
      .forEach(childrenNode => {
        if (childrenNode === infoNode.lastChild) {
          return
        }
        childrenNode.firstChild.style.display = 'none'
        childrenNode.lastChild.style.display = 'initial'
      })
  }

  addPeerCard () {
    let { parentNode: cardContainer, nextSiblingNode: nextCardElement } = this.getFamilyNode()
    let { newUserCard, newUserCardDOM } = this.createNewUserCardDOM()

    nextCardElement === null ? cardContainer.appendChild(newUserCardDOM.render())
      : cardContainer.insertBefore(newUserCardDOM.render(), nextCardElement)

    addNewCard(newUserCard)
  }

  addSubCard (alreadyHasChild) {
    let { currentNode: cardElement, lastChild: subCardsContainer } = this.getFamilyNode()
    let { newUserCard, newUserCardDOM, newUserCardContainerDOM } = this.createNewUserCardDOM(false)

    alreadyHasChild ? subCardsContainer.appendChild(newUserCardDOM.render())
      : cardElement.appendChild(newUserCardContainerDOM.render())

    addNewCard(newUserCard)
  }

  deleteCard() {
    let { currentNode: cardElement, parentNode: cardContainer } = this.getFamilyNode()
    cardContainer.removeChild(cardElement)
    deleteCardByCardId(this.cardId)
  }

  dropCard (draggedCard, alreadyHasChild) {
    let { currentNode: cardElement, firstChild: cardBox, lastChild: subCardsContainer } = this.getFamilyNode()

    cardBox.style.border = '2px solid #b5b5b5'
    if (draggedCard.contains(cardBox)) {
      window.alert('ERROR!!! A subordinate card cannot be a superior card of its own parent card.')
      return
    }

    if (alreadyHasChild) {
      subCardsContainer.appendChild(draggedCard)
    } else {
      let newSubsCardContainer = document.createElement('ul')
      newSubsCardContainer.className = 'org-chart__card-container'
      newSubsCardContainer.appendChild(draggedCard)
      cardElement.appendChild(newSubsCardContainer)
    }

    let valueChanged = new Map()
    valueChanged.set('superiorId', this.cardId)
    updateInfoCard(parseInt(draggedCard.id), valueChanged)
  }

  changeRootCard () {
    let orgChartDOM = document.getElementById('orgChart')
    orgChartDOM.innerHTML = ''
    orgChartDOM.appendChild((new OrgChart(JSON.parse(sessionStorage.rawData), this.cardId).render()))
  }

  getFamilyNode () {
    let currentNode = document.getElementById(this.cardId)

    return {
      currentNode,
      parentNode: currentNode.parentNode,
      nextSiblingNode: currentNode.nextElementSibling,
      firstChild: currentNode.firstChild,
      lastChild: currentNode.lastChild
    }
  }

  createNewUserCardDOM (isPeerCard = true) {
    let { parentNode } = this.getFamilyNode()

    let newUserId = getNewId()
    let newUserCard = new UserCard(newUserId)
    let newParentId = isPeerCard ? parentNode.parentNode.id : this.cardId

    newUserCard.addParent({id: newParentId})
    newUserCard.userCardInfo.setParentId(newParentId)
    let newUserCardDOM = new CardElementDOM(newUserId.toString(), new CardBoxDOM(newUserCard))

    return {
      newUserCard,
      newUserCardDOM,
      newUserCardContainerDOM: new CardContainerDOM([newUserCardDOM])
    }
  }
}
