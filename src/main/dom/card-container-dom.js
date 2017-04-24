import BaseDOM from './base-dom'
import { createContainerByTagName } from './dom-util'

export default class CardContainerDOM extends BaseDOM {

  constructor (cardElementDOMs = []) {
    super(createContainerByTagName('ul'))

    this.containerDOM.className = 'org-chart__card-container'
    this.cardElementDOMs = cardElementDOMs
    this.cardElementDOMs.forEach(cardElementDOMs => this.containerDOM.appendChild(cardElementDOMs.render()))
  }
}