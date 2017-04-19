const userData = sessionStorage.rawData !== undefined ? JSON.parse(sessionStorage.rawData) : [];

export default class UserUtil {

    static getDepartments() {
        let departmentSet = new Set();
        userData.forEach(user => departmentSet.add(user.department));
        return Array.from(departmentSet);
    }

    static getMaxId() {
        let Ids = userData.map((user) => user.id);
        return Math.max(...Ids);
    }
}