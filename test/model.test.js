import { expect } from "chai"
import { testData } from './data.test'
import {
  UserInfo,
  UserCard,
  getDepartments,
  getNewId,
  findFamilyById
} from "../src/main/model"

describe('Model', () => {
  describe('#UserInfo', () => {
    let userInfo
    before(() => {
      userInfo = new UserInfo("Nguyen", "Dat", "SE", "CSE", "ES6", "avatar.png", "dattnguyen")
    })

    it('should return object userInfo is exist', () => expect(userInfo).to.exist)
    it('should return correct first name', () => expect(userInfo).to.have.property('firstName').and.equal('Nguyen'))
    it('should return correct last name', () => expect(userInfo.getLastName()).to.equal('Dat'))
    it('should return correct title', () => expect(userInfo.getTitle()).to.equal('SE'))
    it('should return correct department', () => expect(userInfo).to.have.property('department').and.equal('CSE'))
    it('should return incorrect property middleName', () => expect(userInfo).to.not.have.property('middleName'))
    it('should return correct employeeId', () => expect(userInfo.getEmployeeId()).to.equal('dattnguyen'))
    it('should return correct employeeId', () => expect(userInfo.getAvatar()).to.equal('avatar.png'))
    it('should return correct username', () => expect(userInfo.getUsername()).to.equal('Nguyen Dat'))
    it('should return correct superior',() => {
      userInfo.setParentId(3);
      expect(userInfo).to.have.property('superiorId').and.equal(3);
      expect(userInfo.getParentId()).to.equal(3)
    })
  })

  describe('#UserCard', () => {
    let userCard
    beforeEach(() => {
      let userInfo = new UserInfo("Nguyen", "Dat", "SE", "CSE", "ES6", "avatar.png", "dattnguyen")
      userCard = new UserCard(20, userInfo.getFirstName(), userInfo.getLastName(), userInfo.getTitle(),
        userInfo.getDepartment(), userInfo.getProject(), userInfo.getAvatar(), userInfo.getEmployeeId())
    })

    it('should return object userCard is exist', () => expect(userCard).to.exist)
    it('should return correct parent card properties', () => {
      let parentCard = new UserCard(30)
      userCard.addParent(parentCard);

      expect(parentCard).to.have.property('id').and.equal(30)
      expect(parentCard).to.have.any.keys('id', 'firstName', 'lastName', 'deparment')
      expect(parentCard).to.be.an.instanceOf(UserCard)
      expect(userCard.getParent()).to.equal(parentCard)
    })
    it('should return correct subordinate card', () => {
      let subCard = new UserCard(55);
      userCard.addSubCards([subCard]);

      expect(subCard).to.have.property('id').and.equal(55);
      expect(userCard.getSubCards()).to.be.an.instanceOf(Array)
      expect(userCard.getSubCards()).to.have.length.above(0)
    })
    it('should return correct user card from a raw data', () => {
      expect(UserCard.mapRawDataToUserCard({ id: 10 })).to.have.property('id')
      expect(UserCard.mapRawDataToUserCard({ id: 10, firstName: 'Dat' }).userCardInfo.getFirstName()).to.equal('Dat')
      expect(UserCard.mapRawDataToUserCard({ id: 10, firstName: 'Dat' }).userCardInfo.getDepartment()).to.equal('.........')
    })
  })

  describe('#UserUtil', () => {
    let testDatum = Array.from(testData())
    it('should return correct list of departments', () => {
      expect(getDepartments(testDatum).length).to.equal(3)
      expect(getDepartments(testDatum)).to.include('Black Pearl')
      expect(getDepartments(testDatum)[2]).to.equal('Queen Anne\'s Revenge')
    })
    it('should return correct new id', () => expect(getNewId(testDatum)).to.equal(5))
    it('should return correct family hierarchy', () => {
      expect(findFamilyById(2, testDatum).length).to.equal(1)
      expect(findFamilyById(3, testDatum).length).to.equal(2)
      expect(findFamilyById(4, testDatum)).to.include( { id: 2, username: 'Jack Sparrow'} )
    })
  })
})