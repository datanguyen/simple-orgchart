
export default class UserInfo {

    constructor(firstName, lastName, title, department, project, avatar, employeeId) {
        this._username = firstName + " " + lastName;
        this._title = title;
        this._department = department;
        this._project = project;
        this._avatar = avatar;
        this._employeeId = employeeId;
    }

    getUsername() {
        return this._username;
    }

    setUsername(value) {
        this._username = value;
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