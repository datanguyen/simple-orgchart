import { createContainerByTagName } from './index'
import BaseDOM from './base-dom'

export class CardElementDOM extends BaseDOM {

  constructor (id, elementContentDOM, subCardContainerDOM) {
    super(createContainerByTagName('li'))

    this.containerDOM.className = 'org-chart__card-element'
    this.containerDOM.id = id
    this.containerDOM.appendChild(elementContentDOM.render())

    if (subCardContainerDOM !== undefined) {
      this.containerDOM.appendChild(subCardContainerDOM.render())
    }
  }
}