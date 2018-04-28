import { getDepartments } from '../model'
import { DOMActions } from '../action'

export const createContainerByTagName = tagName => document.createElement(tagName)

export const createCommonContainer = (className = 'null') => {
  let divDOM = createContainerByTagName('div')

  if (className !== 'null') {
    divDOM.className = className
  }
  return divDOM
}

export const createIcon = (className = 'null') => {
  let iconDOM = document.createElement('span')
  iconDOM.className = className
  iconDOM.setAttribute('aria-hidden', 'true')

  return iconDOM
}

export const createCardIcons = () => {
  return {
    plusIcon: createIcon('fa fa-plus-circle'),
    minusIcon: createIcon('fa fa-minus-circle'),
    editIcon: createIcon('fa fa-pencil-square-o'),
    createPeerCardIcon: createIcon('fa fa-arrow-circle-right'),
    createSubCardIcon: createIcon('fa fa-arrow-circle-down'),
    deleteIcon: createIcon('fa fa-trash-o')
  }
}

export const createCardInfoNodes = (username, department, employeeId) => {
  let usernameDOM = createListElement('info__username', username, 'username')
  let departmentDOM = createListElement("info__department", department, 'department', false)
  let employeeIdDOM = createListElement('info__employeeId', employeeId, 'employeeId')
  let prefix = document.createElement('i')

  employeeIdDOM.setAttribute('href', '#')
  prefix.className = 'kms-prefix'
  prefix.textContent = '@gmail.com'

  return {
    usernameDOM,
    departmentDOM,
    employeeIdDOM,
    prefix,
  }
}

export const createListElement = (labelClassName, value, labelFor, isInput = true) => {
  let elementDOM = document.createElement('li')

  let label = document.createElement('label')
  label.setAttribute('for', labelFor)
  label.className = labelClassName
  label.innerHTML = value

  let input
  if (isInput) {
    input = document.createElement('input')
    input.setAttribute('value', value)
  } else {
    input = createDepartmentList(value)
  }
  input.setAttribute('id', labelFor)

  elementDOM.appendChild(label)
  elementDOM.appendChild(input)
  return elementDOM
}

export const createDepartmentList = (departmentName) => {
  let selectDOM = document.createElement('select')
  let departments = getDepartments()

  departments.forEach((department) => {
    let optionDOM = document.createElement('option')
    optionDOM.setAttribute('value', department)
    optionDOM.textContent = department

    if (department === departmentName) {
      optionDOM.setAttribute('selected', 'selected')
    }
    selectDOM.appendChild(optionDOM)
  })

  return selectDOM
}

export const handleNodeToggle = (cardNode, minusIcon, plusIcon, isRelease = true) => {
  if (cardNode.childNodes.length === 1) {
    return
  }

  cardNode.lastChild.style.display = isRelease ? 'flex' : 'none'
  minusIcon.style.display = isRelease ? 'initial' : 'none'
  plusIcon.style.display = isRelease ? 'none' : 'initial'
}

export const handleDragEnd = (event, cardToBeDragged, isOver = true) => {
  event.preventDefault()
  if (event.target === cardToBeDragged || cardToBeDragged.contains(event.target)) {
    cardToBeDragged.style.border = '2px solid #b5b5b5'
    document.getElementById('msg').innerHTML = isOver ? '' : 'Drop in a card that you want to be its superior card.'
  }
}

export const createPath = (id, username) => {
  let pathDOM = document.createElement('a')
  pathDOM.className = 'path'
  pathDOM.textContent = username

  pathDOM.addEventListener('click', () => (new DOMActions(id).changeRootCard()))
  return pathDOM
}