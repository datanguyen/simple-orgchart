import { UserInfo } from './index'

export class UserCard {

  constructor (id, ...userInfo) {
    this.userCardInfo = new UserInfo(...userInfo)
    this.id = id
    this.subCards = []
  }

  addParent (parent) {
    this.parent = parent
  }

  getParent () {
    return this.parent
  }

  addSubCard (subCard) {
    this.subCards.push(subCard)
  }

  addSubCards (subCards) {
    subCards.forEach(subCard => this.addSubCard(subCard))
  }

  getSubCards () {
    return this.subCards
  }

  static mapRawDataToUserCard (user) {
    return new UserCard(user.id, user.firstName, user.lastName, user.title, user.department, user.project,
      user.avatar, user.employeeId)
  }
}