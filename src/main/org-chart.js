import { UserCard, findFamilyById } from './model'
import {
  CardContainerDOM,
  CardElementDOM,
  CardBoxDOM,
  createContainerByTagName,
  createPath
} from './dom'

export default class OrgChart {

  constructor(data, requiredId = null) {
    this.rawData = data
    this.rootCard = this.createRootCard(requiredId)
    this.cards = []
    this.buildCardTree(this.rootCard, this.cards)
  }

  createRootCard(requiredId) {
    if (requiredId === null) {
      return UserCard.mapRawDataToUserCard(this.rawData.find(user => user.superiorId === undefined))
    }
    return UserCard.mapRawDataToUserCard(this.rawData.find(user => user.id === requiredId))
  }

  buildCardTree(card, cards) {
    if (card === undefined) {
      return
    }

    cards.push(card)
    card.addSubCards(this.rawData
      .filter(user => user.superiorId === card.id)
      .map(user => UserCard.mapRawDataToUserCard(user)))

    card.getSubCards()
      .forEach((subCard) => {
        subCard.addParent(card)
        this.buildCardTree(subCard, cards)
      })
  }

  createRootNode() {
    if (this.rootCard === undefined) {
      return
    }

    let rootContainer = createContainerByTagName('ul')
    rootContainer.className = 'org-chart__card-container'
    let rootDOM = new CardElementDOM(this.rootCard.id, new CardBoxDOM(this.rootCard))
    let subCardsNode = this.buildNodeByCard(this.rootCard)

    if (subCardsNode !== undefined) {
      rootDOM.render().appendChild(subCardsNode.render())
    }

    rootContainer.appendChild(rootDOM.render())
    return rootContainer
  }

  buildNodeByCard(card) {
    if (card.getSubCards().length === 0) {
      return
    }

    return new CardContainerDOM(card.getSubCards()
      .map(subCard => new CardElementDOM(subCard.id, new CardBoxDOM(subCard), this.buildNodeByCard(subCard))))
  }

  createBreadscumbs() {
    let subRootPathContainer = document.getElementById('sub-root')
    subRootPathContainer.innerHTML = ''
    let familyPath = findFamilyById(this.rootCard.id)

    while (familyPath.length !== 0) {
      let user = familyPath.pop()
      subRootPathContainer.appendChild(createPath(user.id, ` / ${user.username}`))
    }
  }

  render() {
    this.createBreadscumbs()
    return this.createRootNode()
  }
}