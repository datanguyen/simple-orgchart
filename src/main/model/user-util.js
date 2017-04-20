
export const getDepartments = (userData = JSON.parse(sessionStorage.rawData)) => {
    let departmentSet = new Set();
    userData.forEach(user => departmentSet.add(user.department));
    return Array.from(departmentSet);
};

export const getNewId = (userData = JSON.parse(sessionStorage.rawData)) => {
    let Ids = userData.map(user => user.id);
    return Math.max(...Ids) + 1;
};