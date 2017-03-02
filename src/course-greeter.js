export default class CourseGreeter {

    constructor(courseName) {
        this.courseName = courseName;
    }

    getGreetingMsg() {
        return `Welcome to ${this.courseName} Technical Challenge`;
    }
}