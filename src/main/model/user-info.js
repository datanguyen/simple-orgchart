
export default class UserInfo {

    constructor(firstName = "fullname...", lastName = "", title = "title...", department = "department...",
                project = "", avatar = "avatar.png", employeeId = "employeeId...") {
        this.firstName = firstName;
        this.lastName = lastName;
        this.title = title;
        this.department = department;
        this.project = project;
        this.avatar = avatar;
        this.employeeId = employeeId;
    }


    getFirstName() {
        return this.firstName;
    }

    setFirstName(value) {
        this.firstName = value;
    }

    getLastName() {
        return this.lastName;
    }

    setLastName(value) {
        this.lastName = value;
    }

    getTitle() {
        return this.title;
    }

    setTitle(value) {
        this.title = value;
    }

    getDepartment() {
        return this.department;
    }

    setDepartment(value) {
        this.department = value;
    }

    getProject() {
        return this.project;
    }

    setProject(value) {
        this.project = value;
    }

    getAvatar() {
        return this.avatar;
    }

    setAvatar(value) {
        this.avatar = value;
    }

    getEmployeeId() {
        return this.employeeId;
    }

    setEmployeeId(value) {
        this.employeeId = value;
    }

    getSuperiorId() {
        return this.superiorId;
    }

    setParentId(value) {
        this.superiorId = value;
    }

    getUsername() {
        return `${this.firstName} ${this.lastName}`;
    }
}