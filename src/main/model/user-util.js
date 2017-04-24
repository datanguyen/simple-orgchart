export const getDepartments = (userData = JSON.parse(sessionStorage.rawData)) => {
  let departmentSet = new Set()
  userData.forEach(user => departmentSet.add(user.department))
  return Array.from(departmentSet)
}

export const getNewId = (userData = JSON.parse(sessionStorage.rawData)) => {
  let Ids = userData.map(user => user.id)
  return Math.max(...Ids) + 1
}

export const findFamilyById = (cardId, userData = JSON.parse(sessionStorage.rawData)) => {
  let familyArr = []
  let currentUser = userData.find(user => user.id === cardId)
  familyArr.push({
    id: currentUser.id,
    username: `${currentUser.firstName} ${currentUser.lastName}`
  })

  if (currentUser.superiorId === undefined) {
    return familyArr
  }
  const buildFamily = (cardSuperiorId) => {
    let parent = userData.find(user => user.id === cardSuperiorId)
    if (parent === undefined) {
      return
    }

    familyArr.push({
      id: parent.id,
      username: `${parent.firstName} ${parent.lastName}`
    })
    buildFamily(parent.superiorId)
  }

  buildFamily(currentUser.superiorId)
  return familyArr
}