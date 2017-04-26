import { expect } from 'chai'
import { testData } from './test.data'
import {
  addNewCard,
  updateInfoCard
} from '../src/main/action'
import { UserCard } from '../src/main/model'

describe('Action', () => {
  describe('#UserAction', () => {
    let dataTest
    let card
    let valueToBeChanged = new Map()
    beforeEach(() => {
      dataTest = testData()
      card = new UserCard(100, "Nguyen", "Dat", "SE", "CSE", "ES6", "avatar.png", "dattnguyen");
      valueToBeChanged.set('employeeId','dattnguyen')
      valueToBeChanged.set('department', 'Room C4')
      valueToBeChanged.set('superiorId', 3)
      valueToBeChanged.set('username', 'Dat Nguyen')
    })

    it('should add new card', () => {
      expect(addNewCard(card, dataTest).length).to.equal(4)
      expect(addNewCard(card, dataTest).pop().id).to.equal(100)
    })
    it('should add new card with correct info', () => {
      expect(addNewCard(card, dataTest).pop().firstName).to.equal('Nguyen')
      expect(addNewCard(card, dataTest).pop().employeeId).to.equal('dattnguyen')
    })
    it('should not change size after update info', () => {
      expect(updateInfoCard(2, valueToBeChanged, dataTest).length).to.equal(3)
    })
    it('should return correct employeeId, department after update', () => {
      expect(updateInfoCard(2, valueToBeChanged, dataTest)
        .find(user => user.id === 2).employeeId).to.equal('dattnguyen')
      expect(updateInfoCard(2, valueToBeChanged, dataTest)
        .find(user => user.id === 2).department).to.equal('Room C4')
    })
    it('should return correct superior id after update info', () => {
      expect(updateInfoCard(4, valueToBeChanged, dataTest)
        .find(user => user.id === 4).superiorId).to.equal(3)
    })
    it('should return correct first name & last name by update username key', () => {
      expect(updateInfoCard(3, valueToBeChanged, dataTest)
        .find(user => user.id === 3).firstName).to.equal('Dat')
      expect(updateInfoCard(3, valueToBeChanged, dataTest)
        .find(user => user.id === 3).lastName.pop()).to.equal('Nguyen')
    })
  })
})