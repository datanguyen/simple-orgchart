export class UserInfo {

  constructor(firstName = '.........', lastName = '', title = '.........', department = '.........', project = '',
              avatar = 'avatar.png', employeeId = '.........') {
    this.firstName = firstName
    this.lastName = lastName
    this.title = title
    this.department = department
    this.project = project
    this.avatar = avatar
    this.employeeId = employeeId
  }

  getFirstName() {
    return this.firstName
  }

  getLastName() {
    return this.lastName
  }

  getTitle() {
    return this.title
  }

  getDepartment() {
    return this.department
  }

  getProject() {
    return this.project
  }

  getAvatar() {
    return this.avatar
  }

  getEmployeeId() {
    return this.employeeId
  }

  getSuperiorId() {
    return this.superiorId
  }

  getParentId() {
    return this.superiorId
  }

  setParentId(value) {
    this.superiorId = value
  }

  getUsername() {
    return `${this.firstName} ${this.lastName}`
  }
}