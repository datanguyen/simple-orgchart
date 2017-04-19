const userData = sessionStorage.rawData !== undefined ? JSON.parse(sessionStorage.rawData) : [];

export default class UserStats {

    static getDepartments() {
        let departmentSet = new Set();
        userData.forEach(user => departmentSet.add(user.department));
        return Array.from(departmentSet);
    }
}