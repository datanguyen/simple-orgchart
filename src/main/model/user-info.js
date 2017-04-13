
export default class UserInfo {

    constructor(firstName, lastName, title, department, project, avatar, employeeId) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._title = title;
        this._department = department;
        this._project = project;
        this._avatar = avatar;
        this._employeeId = employeeId;
    }

    getFirstName() {
        return this._firstName;
    }

    setFirstName(value) {
        this._firstName = value;
    }

    getLastName() {
        return this._lastName;
    }

    setLastName(value) {
        this._lastName = value;
    }

    getTitle() {
        return this._title;
    }

    setTitle(value) {
        this._title = value;
    }

    getDepartment() {
        return this._department;
    }

    setDepartment(value) {
        this._department = value;
    }

    getProject() {
        return this._project;
    }

    setProject(value) {
        this._project = value;
    }

    getAvatar() {
        return this._avatar;
    }

    setAvatar(value) {
        this._avatar = value;
    }

    getEmployeeId() {
        return this._employeeId;
    }

    setEmployeeId(value) {
        this._employeeId = value;
    }
}