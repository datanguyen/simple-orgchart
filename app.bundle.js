/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _orgChart = __webpack_require__(1);
	
	var _orgChart2 = _interopRequireDefault(_orgChart);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var orgChartDOM = document.getElementById('orgChart');
	
	if (typeof Storage !== 'undefined') {
	  var orgChartRawData = sessionStorage.rawData;
	
	  if (orgChartRawData !== undefined) {
	    orgChartDOM.appendChild(new _orgChart2.default(JSON.parse(orgChartRawData)).render());
	  } else {
	    fetch('./data/contacts.json').then(function (res) {
	      res.json().then(function (data) {
	        sessionStorage.rawData = JSON.stringify(data);
	        orgChartDOM.appendChild(new _orgChart2.default(data).render());
	      });
	    }).catch(function (err) {
	      return orgChartDOM.innerHTML = 'Your browser does not support Fetch API: ' + err;
	    });
	  }
	} else {
	  orgChartDOM.innerHTML = 'Your browser does not support session Storage';
	}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _model = __webpack_require__(2);
	
	var _dom = __webpack_require__(6);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var OrgChart = function () {
	  function OrgChart(data) {
	    var requiredId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	
	    _classCallCheck(this, OrgChart);
	
	    this.rawData = data;
	    this.rootCard = this.createRootCard(requiredId);
	    this.cards = [];
	    this.buildCardTree(this.rootCard, this.cards);
	  }
	
	  _createClass(OrgChart, [{
	    key: 'createRootCard',
	    value: function createRootCard(requiredId) {
	      if (requiredId === null) {
	        return _model.UserCard.mapRawDataToUserCard(this.rawData.find(function (user) {
	          return user.superiorId === undefined;
	        }));
	      }
	      return _model.UserCard.mapRawDataToUserCard(this.rawData.find(function (user) {
	        return user.id === requiredId;
	      }));
	    }
	  }, {
	    key: 'buildCardTree',
	    value: function buildCardTree(card, cards) {
	      var _this = this;
	
	      if (card === undefined) {
	        return;
	      }
	
	      cards.push(card);
	      card.addSubCards(this.rawData.filter(function (user) {
	        return user.superiorId === card.id;
	      }).map(function (user) {
	        return _model.UserCard.mapRawDataToUserCard(user);
	      }));
	
	      card.getSubCards().forEach(function (subCard) {
	        subCard.addParent(card);
	        _this.buildCardTree(subCard, cards);
	      });
	    }
	  }, {
	    key: 'createRootNode',
	    value: function createRootNode() {
	      if (this.rootCard === undefined) {
	        return;
	      }
	
	      var rootContainer = (0, _dom.createContainerByTagName)('ul');
	      rootContainer.className = 'org-chart__card-container';
	      var rootDOM = new _dom.CardElementDOM(this.rootCard.id, new _dom.CardBoxDOM(this.rootCard));
	      var subCardsNode = this.buildNodeByCard(this.rootCard);
	
	      if (subCardsNode !== undefined) {
	        rootDOM.render().appendChild(subCardsNode.render());
	      }
	
	      rootContainer.appendChild(rootDOM.render());
	      return rootContainer;
	    }
	  }, {
	    key: 'buildNodeByCard',
	    value: function buildNodeByCard(card) {
	      var _this2 = this;
	
	      if (card.getSubCards().length === 0) {
	        return;
	      }
	
	      return new _dom.CardContainerDOM(card.getSubCards().map(function (subCard) {
	        return new _dom.CardElementDOM(subCard.id, new _dom.CardBoxDOM(subCard), _this2.buildNodeByCard(subCard));
	      }));
	    }
	  }, {
	    key: 'createBreadscumbs',
	    value: function createBreadscumbs() {
	      var subRootPathContainer = document.getElementById('sub-root');
	      subRootPathContainer.innerHTML = '';
	      var familyPath = (0, _model.findFamilyById)(this.rootCard.id);
	
	      while (familyPath.length !== 0) {
	        var user = familyPath.pop();
	        subRootPathContainer.appendChild((0, _dom.createPath)(user.id, ' / ' + user.username));
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      this.createBreadscumbs();
	      return this.createRootNode();
	    }
	  }]);
	
	  return OrgChart;
	}();
	
	exports.default = OrgChart;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _userCard = __webpack_require__(3);
	
	Object.keys(_userCard).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _userCard[key];
	    }
	  });
	});
	
	var _userInfo = __webpack_require__(4);
	
	Object.keys(_userInfo).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _userInfo[key];
	    }
	  });
	});
	
	var _userUtil = __webpack_require__(5);
	
	Object.keys(_userUtil).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _userUtil[key];
	    }
	  });
	});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.UserCard = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _index = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var UserCard = exports.UserCard = function () {
	  function UserCard(id) {
	    _classCallCheck(this, UserCard);
	
	    for (var _len = arguments.length, userInfo = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      userInfo[_key - 1] = arguments[_key];
	    }
	
	    this.userCardInfo = new (Function.prototype.bind.apply(_index.UserInfo, [null].concat(userInfo)))();
	    this.id = id;
	    this.subCards = [];
	  }
	
	  _createClass(UserCard, [{
	    key: 'addParent',
	    value: function addParent(parent) {
	      this.parent = parent;
	    }
	  }, {
	    key: 'getParent',
	    value: function getParent() {
	      return this.parent;
	    }
	  }, {
	    key: 'addSubCard',
	    value: function addSubCard(subCard) {
	      this.subCards.push(subCard);
	    }
	  }, {
	    key: 'addSubCards',
	    value: function addSubCards(subCards) {
	      var _this = this;
	
	      subCards.forEach(function (subCard) {
	        return _this.addSubCard(subCard);
	      });
	    }
	  }, {
	    key: 'getSubCards',
	    value: function getSubCards() {
	      return this.subCards;
	    }
	  }], [{
	    key: 'mapRawDataToUserCard',
	    value: function mapRawDataToUserCard(user) {
	      return new UserCard(user.id, user.firstName, user.lastName, user.title, user.department, user.project, user.avatar, user.employeeId);
	    }
	  }]);

	  return UserCard;
	}();

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var UserInfo = exports.UserInfo = function () {
	  function UserInfo() {
	    var firstName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.........';
	    var lastName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	    var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '.........';
	    var department = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '.........';
	    var project = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
	    var avatar = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'avatar.png';
	    var employeeId = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : '.........';
	
	    _classCallCheck(this, UserInfo);
	
	    this.firstName = firstName;
	    this.lastName = lastName;
	    this.title = title;
	    this.department = department;
	    this.project = project;
	    this.avatar = avatar;
	    this.employeeId = employeeId;
	  }
	
	  _createClass(UserInfo, [{
	    key: 'getFirstName',
	    value: function getFirstName() {
	      return this.firstName;
	    }
	  }, {
	    key: 'getLastName',
	    value: function getLastName() {
	      return this.lastName;
	    }
	  }, {
	    key: 'getTitle',
	    value: function getTitle() {
	      return this.title;
	    }
	  }, {
	    key: 'getDepartment',
	    value: function getDepartment() {
	      return this.department;
	    }
	  }, {
	    key: 'getProject',
	    value: function getProject() {
	      return this.project;
	    }
	  }, {
	    key: 'getAvatar',
	    value: function getAvatar() {
	      return this.avatar;
	    }
	  }, {
	    key: 'getEmployeeId',
	    value: function getEmployeeId() {
	      return this.employeeId;
	    }
	  }, {
	    key: 'getSuperiorId',
	    value: function getSuperiorId() {
	      return this.superiorId;
	    }
	  }, {
	    key: 'getParentId',
	    value: function getParentId() {
	      return this.superiorId;
	    }
	  }, {
	    key: 'setParentId',
	    value: function setParentId(value) {
	      this.superiorId = value;
	    }
	  }, {
	    key: 'getUsername',
	    value: function getUsername() {
	      return this.firstName + ' ' + this.lastName;
	    }
	  }]);

	  return UserInfo;
	}();

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var getDepartments = exports.getDepartments = function getDepartments() {
	  var userData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : JSON.parse(sessionStorage.rawData);
	
	  var departmentSet = new Set();
	  userData.forEach(function (user) {
	    return departmentSet.add(user.department);
	  });
	  return Array.from(departmentSet);
	};
	
	var getNewId = exports.getNewId = function getNewId() {
	  var userData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : JSON.parse(sessionStorage.rawData);
	
	  var Ids = userData.map(function (user) {
	    return user.id;
	  });
	  return Math.max.apply(Math, _toConsumableArray(Ids)) + 1;
	};
	
	var findFamilyById = exports.findFamilyById = function findFamilyById(cardId) {
	  var userData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : JSON.parse(sessionStorage.rawData);
	
	  var familyArr = [];
	  var currentUser = userData.find(function (user) {
	    return user.id === cardId;
	  });
	  familyArr.push({
	    id: currentUser.id,
	    username: currentUser.firstName + " " + currentUser.lastName
	  });
	
	  if (currentUser.superiorId === undefined) {
	    return familyArr;
	  }
	  var buildFamily = function buildFamily(cardSuperiorId) {
	    var parent = userData.find(function (user) {
	      return user.id === cardSuperiorId;
	    });
	    if (parent === undefined) {
	      return;
	    }
	
	    familyArr.push({
	      id: parent.id,
	      username: parent.firstName + " " + parent.lastName
	    });
	    buildFamily(parent.superiorId);
	  };
	
	  buildFamily(currentUser.superiorId);
	  return familyArr;
	};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _domUtil = __webpack_require__(7);
	
	Object.keys(_domUtil).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _domUtil[key];
	    }
	  });
	});
	
	var _cardBoxDom = __webpack_require__(11);
	
	Object.keys(_cardBoxDom).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _cardBoxDom[key];
	    }
	  });
	});
	
	var _cardElementDom = __webpack_require__(13);
	
	Object.keys(_cardElementDom).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _cardElementDom[key];
	    }
	  });
	});
	
	var _cardContainerDom = __webpack_require__(14);
	
	Object.keys(_cardContainerDom).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _cardContainerDom[key];
	    }
	  });
	});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createPath = exports.handleDragEnd = exports.handleNodeToggle = exports.createDepartmentList = exports.createListElement = exports.createCardInfoNodes = exports.createCardIcons = exports.createIcon = exports.createCommonContainer = exports.createContainerByTagName = undefined;
	
	var _model = __webpack_require__(2);
	
	var _action = __webpack_require__(8);
	
	var createContainerByTagName = exports.createContainerByTagName = function createContainerByTagName(tagName) {
	  return document.createElement(tagName);
	};
	
	var createCommonContainer = exports.createCommonContainer = function createCommonContainer() {
	  var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'null';
	
	  var divDOM = createContainerByTagName('div');
	
	  if (className !== 'null') {
	    divDOM.className = className;
	  }
	  return divDOM;
	};
	
	var createIcon = exports.createIcon = function createIcon() {
	  var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'null';
	
	  var iconDOM = document.createElement('span');
	  iconDOM.className = className;
	  iconDOM.setAttribute('aria-hidden', 'true');
	
	  return iconDOM;
	};
	
	var createCardIcons = exports.createCardIcons = function createCardIcons() {
	  return {
	    plusIcon: createIcon('fa fa-plus-circle'),
	    minusIcon: createIcon('fa fa-minus-circle'),
	    editIcon: createIcon('fa fa-pencil-square-o'),
	    createPeerCardIcon: createIcon('fa fa-arrow-circle-right'),
	    createSubCardIcon: createIcon('fa fa-arrow-circle-down'),
	    deleteIcon: createIcon('fa fa-trash-o')
	  };
	};
	
	var createCardInfoNodes = exports.createCardInfoNodes = function createCardInfoNodes(username, department, employeeId) {
	  var usernameDOM = createListElement('info__username', username, 'username');
	  var departmentDOM = createListElement("info__department", department, 'department', false);
	  var employeeIdDOM = createListElement('info__employeeId', employeeId, 'employeeId');
	  var prefix = document.createElement('i');
	
	  employeeIdDOM.setAttribute('href', '#');
	  prefix.className = 'kms-prefix';
	  prefix.textContent = '@gmail.com';
	
	  return {
	    usernameDOM: usernameDOM,
	    departmentDOM: departmentDOM,
	    employeeIdDOM: employeeIdDOM,
	    prefix: prefix
	  };
	};
	
	var createListElement = exports.createListElement = function createListElement(labelClassName, value, labelFor) {
	  var isInput = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
	
	  var elementDOM = document.createElement('li');
	
	  var label = document.createElement('label');
	  label.setAttribute('for', labelFor);
	  label.className = labelClassName;
	  label.innerHTML = value;
	
	  var input = void 0;
	  if (isInput) {
	    input = document.createElement('input');
	    input.setAttribute('value', value);
	  } else {
	    input = createDepartmentList(value);
	  }
	  input.setAttribute('id', labelFor);
	
	  elementDOM.appendChild(label);
	  elementDOM.appendChild(input);
	  return elementDOM;
	};
	
	var createDepartmentList = exports.createDepartmentList = function createDepartmentList(departmentName) {
	  var selectDOM = document.createElement('select');
	  var departments = (0, _model.getDepartments)();
	
	  departments.forEach(function (department) {
	    var optionDOM = document.createElement('option');
	    optionDOM.setAttribute('value', department);
	    optionDOM.textContent = department;
	
	    if (department === departmentName) {
	      optionDOM.setAttribute('selected', 'selected');
	    }
	    selectDOM.appendChild(optionDOM);
	  });
	
	  return selectDOM;
	};
	
	var handleNodeToggle = exports.handleNodeToggle = function handleNodeToggle(cardNode, minusIcon, plusIcon) {
	  var isRelease = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
	
	  if (cardNode.childNodes.length === 1) {
	    return;
	  }
	
	  cardNode.lastChild.style.display = isRelease ? 'flex' : 'none';
	  minusIcon.style.display = isRelease ? 'initial' : 'none';
	  plusIcon.style.display = isRelease ? 'none' : 'initial';
	};
	
	var handleDragEnd = exports.handleDragEnd = function handleDragEnd(event, cardToBeDragged) {
	  var isOver = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	
	  event.preventDefault();
	  if (event.target === cardToBeDragged || cardToBeDragged.contains(event.target)) {
	    cardToBeDragged.style.border = '2px solid #b5b5b5';
	    document.getElementById('msg').innerHTML = isOver ? '' : 'Drop in a card that you want to be its superior card.';
	  }
	};
	
	var createPath = exports.createPath = function createPath(id, username) {
	  var pathDOM = document.createElement('a');
	  pathDOM.className = 'path';
	  pathDOM.textContent = username;
	
	  pathDOM.addEventListener('click', function () {
	    return new _action.DOMActions(id).changeRootCard();
	  });
	  return pathDOM;
	};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _domActions = __webpack_require__(9);
	
	Object.keys(_domActions).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _domActions[key];
	    }
	  });
	});
	
	var _userActions = __webpack_require__(10);
	
	Object.keys(_userActions).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _userActions[key];
	    }
	  });
	});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DOMActions = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _orgChart = __webpack_require__(1);
	
	var _orgChart2 = _interopRequireDefault(_orgChart);
	
	var _model = __webpack_require__(2);
	
	var _dom = __webpack_require__(6);
	
	var _index = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DOMActions = exports.DOMActions = function () {
	  function DOMActions(cardId) {
	    _classCallCheck(this, DOMActions);
	
	    this.cardId = cardId;
	  }
	
	  _createClass(DOMActions, [{
	    key: 'editCardInfo',
	    value: function editCardInfo(infoNode, avatarNode) {
	      var avatarFirstChild = avatarNode.firstChild,
	          avatarLastChild = avatarNode.lastChild;
	
	
	      avatarLastChild.removeAttribute('disabled');
	      avatarFirstChild.style.border = '1px dashed blue';
	      avatarFirstChild.addEventListener('click', function () {
	        avatarLastChild.click();
	        avatarLastChild.addEventListener('change', function (e) {
	          e.preventDefault();
	          if (e.target.files[0]) {
	            avatarFirstChild.setAttribute('src', URL.createObjectURL(e.target.files[0]));
	          }
	        });
	      });
	
	      Array.from(infoNode.childNodes).forEach(function (childrenNode) {
	        if (childrenNode === infoNode.lastChild) {
	          return;
	        }
	        childrenNode.firstChild.style.display = 'none';
	        childrenNode.lastChild.style.display = 'initial';
	      });
	    }
	  }, {
	    key: 'addPeerCard',
	    value: function addPeerCard() {
	      var _getFamilyNode = this.getFamilyNode(),
	          cardContainer = _getFamilyNode.parentNode,
	          nextCardElement = _getFamilyNode.nextSiblingNode;
	
	      var _createNewUserCardDOM = this.createNewUserCardDOM(),
	          newUserCard = _createNewUserCardDOM.newUserCard,
	          newUserCardDOM = _createNewUserCardDOM.newUserCardDOM;
	
	      nextCardElement === null ? cardContainer.appendChild(newUserCardDOM.render()) : cardContainer.insertBefore(newUserCardDOM.render(), nextCardElement);
	
	      var newData = (0, _index.addNewCard)(newUserCard);
	      (0, _index.updateData)(newData);
	    }
	  }, {
	    key: 'addSubCard',
	    value: function addSubCard(alreadyHasChild) {
	      var _getFamilyNode2 = this.getFamilyNode(),
	          cardElement = _getFamilyNode2.currentNode,
	          subCardsContainer = _getFamilyNode2.lastChild;
	
	      var _createNewUserCardDOM2 = this.createNewUserCardDOM(false),
	          newUserCard = _createNewUserCardDOM2.newUserCard,
	          newUserCardDOM = _createNewUserCardDOM2.newUserCardDOM,
	          newUserCardContainerDOM = _createNewUserCardDOM2.newUserCardContainerDOM;
	
	      alreadyHasChild ? subCardsContainer.appendChild(newUserCardDOM.render()) : cardElement.appendChild(newUserCardContainerDOM.render());
	
	      var newData = (0, _index.addNewCard)(newUserCard);
	      (0, _index.updateData)(newData);
	    }
	  }, {
	    key: 'deleteCard',
	    value: function deleteCard() {
	      var _getFamilyNode3 = this.getFamilyNode(),
	          cardElement = _getFamilyNode3.currentNode,
	          cardContainer = _getFamilyNode3.parentNode;
	
	      cardContainer.removeChild(cardElement);
	      (0, _index.deleteCardByCardId)(this.cardId);
	    }
	  }, {
	    key: 'dropCard',
	    value: function dropCard(draggedCard, alreadyHasChild) {
	      var _getFamilyNode4 = this.getFamilyNode(),
	          cardElement = _getFamilyNode4.currentNode,
	          cardBox = _getFamilyNode4.firstChild,
	          subCardsContainer = _getFamilyNode4.lastChild;
	
	      cardBox.style.border = '2px solid #b5b5b5';
	      if (draggedCard.contains(cardBox)) {
	        window.alert('ERROR!!! A subordinate card cannot be a superior card of its own parent card.');
	        return;
	      }
	
	      if (alreadyHasChild) {
	        subCardsContainer.appendChild(draggedCard);
	      } else {
	        var newSubsCardContainer = document.createElement('ul');
	        newSubsCardContainer.className = 'org-chart__card-container';
	        newSubsCardContainer.appendChild(draggedCard);
	        cardElement.appendChild(newSubsCardContainer);
	      }
	
	      var valueChanged = new Map();
	      valueChanged.set('superiorId', this.cardId);
	      var newData = (0, _index.updateInfoCard)(parseInt(draggedCard.id), valueChanged);
	      (0, _index.updateData)(newData);
	    }
	  }, {
	    key: 'changeRootCard',
	    value: function changeRootCard() {
	      var orgChartDOM = document.getElementById('orgChart');
	      orgChartDOM.innerHTML = '';
	      orgChartDOM.appendChild(new _orgChart2.default(JSON.parse(sessionStorage.rawData), this.cardId).render());
	    }
	  }, {
	    key: 'getFamilyNode',
	    value: function getFamilyNode() {
	      var currentNode = document.getElementById(this.cardId);
	
	      return {
	        currentNode: currentNode,
	        parentNode: currentNode.parentNode,
	        nextSiblingNode: currentNode.nextElementSibling,
	        firstChild: currentNode.firstChild,
	        lastChild: currentNode.lastChild
	      };
	    }
	  }, {
	    key: 'createNewUserCardDOM',
	    value: function createNewUserCardDOM() {
	      var isPeerCard = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	
	      var _getFamilyNode5 = this.getFamilyNode(),
	          parentNode = _getFamilyNode5.parentNode;
	
	      var newUserId = (0, _model.getNewId)();
	      var newUserCard = new _model.UserCard(newUserId);
	      var newParentId = isPeerCard ? parentNode.parentNode.id : this.cardId;
	
	      newUserCard.addParent({ id: newParentId });
	      newUserCard.userCardInfo.setParentId(newParentId);
	      var newUserCardDOM = new _dom.CardElementDOM(newUserId.toString(), new _dom.CardBoxDOM(newUserCard));
	
	      return {
	        newUserCard: newUserCard,
	        newUserCardDOM: newUserCardDOM,
	        newUserCardContainerDOM: new _dom.CardContainerDOM([newUserCardDOM])
	      };
	    }
	  }]);

	  return DOMActions;
	}();

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }
	
	var addNewCard = exports.addNewCard = function addNewCard(card) {
	  var userData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : JSON.parse(sessionStorage.rawData);
	
	  userData.push({
	    firstName: card.userCardInfo.getFirstName(),
	    lastName: card.userCardInfo.getLastName(),
	    title: card.userCardInfo.getTitle(),
	    department: card.userCardInfo.getDepartment(),
	    project: card.userCardInfo.getProject(),
	    avatar: card.userCardInfo.getAvatar(),
	    employeeId: card.userCardInfo.getEmployeeId(),
	    superiorId: parseInt(card.userCardInfo.getSuperiorId()),
	    id: parseInt(card.id)
	  });
	
	  return userData;
	};
	
	var deleteCardByCardId = exports.deleteCardByCardId = function deleteCardByCardId(cardId) {
	  var userData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : JSON.parse(sessionStorage.rawData);
	
	  var subCardsTobeDeleted = userData.filter(function (user) {
	    return user.superiorId === cardId;
	  });
	
	  userData.splice(userData.findIndex(function (user) {
	    return user.id === cardId;
	  }), 1);
	  updateData(userData);
	
	  if (subCardsTobeDeleted.length === 0) {
	    return;
	  }
	  subCardsTobeDeleted.forEach(function (user) {
	    return deleteCardByCardId(user.id);
	  });
	};
	
	var updateInfoCard = exports.updateInfoCard = function updateInfoCard(cardId, valueToBeChanged) {
	  var userData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : JSON.parse(sessionStorage.rawData);
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	
	    for (var _iterator = valueToBeChanged[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var _step$value = _slicedToArray(_step.value, 2),
	          key = _step$value[0],
	          value = _step$value[1];
	
	      if (key === 'username') {
	        var _value$split = value.split(' '),
	            _value$split2 = _toArray(_value$split),
	            firstName = _value$split2[0],
	            lastName = _value$split2.slice(1);
	
	        userData.find(function (user) {
	          return user.id === cardId;
	        })['firstName'] = firstName;
	        userData.find(function (user) {
	          return user.id === cardId;
	        })['lastName'] = lastName;
	      } else {
	        userData.find(function (user) {
	          return user.id === cardId;
	        })[key] = value;
	      }
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	
	  return userData;
	};
	
	var updateData = exports.updateData = function updateData(newData) {
	  return sessionStorage.rawData = JSON.stringify(newData);
	};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CardBoxDOM = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _action = __webpack_require__(8);
	
	var _baseDom = __webpack_require__(12);
	
	var _baseDom2 = _interopRequireDefault(_baseDom);
	
	var _index = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var CardBoxDOM = exports.CardBoxDOM = function (_BaseDOM) {
	  _inherits(CardBoxDOM, _BaseDOM);
	
	  function CardBoxDOM(card) {
	    _classCallCheck(this, CardBoxDOM);
	
	    var _this = _possibleConstructorReturn(this, (CardBoxDOM.__proto__ || Object.getPrototypeOf(CardBoxDOM)).call(this, (0, _index.createContainerByTagName)('section')));
	
	    _this.containerDOM.className = 'card';
	    _this.card = card;
	    _this.domActions = new _action.DOMActions(_this.card.id);
	    _this.childrenNode = {
	      avatarNode: CardBoxDOM.buildAvatarNode(),
	      infoNode: _this.buildInfoNode(),
	      actionNode: _this.buildActionNode(),
	      toggleNode: _this.buildToggleNode()
	    };
	    return _this;
	  }
	
	  _createClass(CardBoxDOM, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var _childrenNode = this.childrenNode,
	          avatarNode = _childrenNode.avatarNode,
	          infoNode = _childrenNode.infoNode,
	          actionNode = _childrenNode.actionNode,
	          toggleNode = _childrenNode.toggleNode;
	
	      this.containerDOM.appendChild(avatarNode);
	      this.containerDOM.appendChild(infoNode);
	      this.containerDOM.appendChild(actionNode);
	      this.containerDOM.appendChild(toggleNode);
	
	      this.containerDOM.addEventListener('click', function () {
	        _this2.containerDOM.style.backgroundColor = '#f4f2f2';
	        actionNode.style.display = 'initial';
	
	        document.body.addEventListener('click', function (e) {
	          return _this2.storeInformation(e);
	        });
	      });
	      this.containerDOM.addEventListener('dblclick', function () {
	        return _this2.domActions.changeRootCard();
	      });
	      this.activateDnD();
	
	      return this.containerDOM;
	    }
	  }, {
	    key: 'buildInfoNode',
	    value: function buildInfoNode() {
	      var infoNode = (0, _index.createContainerByTagName)('ul');
	
	      var _createCardInfoNodes = (0, _index.createCardInfoNodes)(this.card.userCardInfo.getUsername(), this.card.userCardInfo.getDepartment(), this.card.userCardInfo.getEmployeeId()),
	          usernameDOM = _createCardInfoNodes.usernameDOM,
	          departmentDOM = _createCardInfoNodes.departmentDOM,
	          employeeIdDOM = _createCardInfoNodes.employeeIdDOM,
	          prefix = _createCardInfoNodes.prefix;
	
	      infoNode.className = 'card__info';
	      infoNode.appendChild(usernameDOM);
	      infoNode.appendChild(departmentDOM);
	      infoNode.appendChild(employeeIdDOM);
	      infoNode.appendChild(prefix);
	
	      return infoNode;
	    }
	  }, {
	    key: 'buildActionNode',
	    value: function buildActionNode() {
	      var _this3 = this;
	
	      var actionNode = (0, _index.createCommonContainer)('card__action');
	
	      var _createCardIcons = (0, _index.createCardIcons)(),
	          editIcon = _createCardIcons.editIcon,
	          createPeerCardIcon = _createCardIcons.createPeerCardIcon,
	          createSubCardIcon = _createCardIcons.createSubCardIcon,
	          deleteIcon = _createCardIcons.deleteIcon;
	
	      editIcon.addEventListener('click', function () {
	        return _this3.domActions.editCardInfo(_this3.childrenNode.infoNode, _this3.childrenNode.avatarNode);
	      });
	      createPeerCardIcon.addEventListener('click', function () {
	        return _this3.domActions.addPeerCard();
	      });
	      createSubCardIcon.addEventListener('click', function () {
	        return _this3.domActions.addSubCard(_this3.card.getSubCards().length > 0);
	      });
	      deleteIcon.addEventListener('click', function () {
	        var confirm = window.confirm('Are your sure to delete this card ?');
	        if (confirm === true) {
	          _this3.domActions.deleteCard();
	        }
	      });
	
	      actionNode.appendChild(editIcon);
	      actionNode.appendChild(createSubCardIcon);
	
	      if (this.card.parent !== undefined) {
	        actionNode.appendChild(createPeerCardIcon);
	        actionNode.appendChild(deleteIcon);
	      }
	
	      return actionNode;
	    }
	  }, {
	    key: 'buildToggleNode',
	    value: function buildToggleNode() {
	      var _this4 = this;
	
	      var toggleNode = (0, _index.createCommonContainer)('card__toggle');
	
	      var _createCardIcons2 = (0, _index.createCardIcons)(),
	          plusIcon = _createCardIcons2.plusIcon,
	          minusIcon = _createCardIcons2.minusIcon;
	
	      minusIcon.addEventListener('click', function () {
	        return (0, _index.handleNodeToggle)(_this4.containerDOM.parentNode, minusIcon, plusIcon, false);
	      });
	      plusIcon.addEventListener('click', function () {
	        return (0, _index.handleNodeToggle)(_this4.containerDOM.parentNode, minusIcon, plusIcon);
	      });
	      this.card.getSubCards().length === 0 ? minusIcon.style.display = 'none' : plusIcon.style.display = 'none';
	
	      toggleNode.appendChild(plusIcon);
	      toggleNode.appendChild(minusIcon);
	      return toggleNode;
	    }
	  }, {
	    key: 'activateDnD',
	    value: function activateDnD() {
	      var _this5 = this;
	
	      this.containerDOM.setAttribute('draggable', 'true');
	      this.containerDOM.addEventListener('drag', function () {
	        return _this5.containerDOM.style.border = '2px dashed blue';
	      });
	      this.containerDOM.addEventListener('dragstart', function (e) {
	        return e.dataTransfer.setData('id', _this5.card.id);
	      });
	      this.containerDOM.addEventListener('dragleave', function (e) {
	        return (0, _index.handleDragEnd)(e, _this5.containerDOM, false);
	      });
	      this.containerDOM.addEventListener('dragend', function (e) {
	        return (0, _index.handleDragEnd)(e, _this5.containerDOM);
	      });
	      this.containerDOM.addEventListener('dragover', function (e) {
	        e.preventDefault();
	        if (e.target === _this5.containerDOM || _this5.containerDOM.contains(e.target)) {
	          _this5.containerDOM.style.border = '2px dashed blue';
	        }
	      });
	
	      this.containerDOM.addEventListener('drop', function (e) {
	        e.preventDefault();
	        var cardId = e.dataTransfer.getData('id');
	        var draggedCard = document.getElementById(cardId);
	
	        if (cardId === _this5.card.id.toString()) {
	          return;
	        }
	
	        _this5.domActions.dropCard(draggedCard, _this5.card.getSubCards().length > 0);
	        document.getElementById('msg').innerHTML = '';
	      });
	    }
	  }, {
	    key: 'storeInformation',
	    value: function storeInformation(e) {
	      var _childrenNode2 = this.childrenNode,
	          avatarNode = _childrenNode2.avatarNode,
	          infoNode = _childrenNode2.infoNode,
	          actionNode = _childrenNode2.actionNode,
	          toggleNode = _childrenNode2.toggleNode;
	
	
	      if (toggleNode.contains(e.target) || !this.containerDOM.contains(e.target)) {
	        var infoChangedByName = new Map();
	        this.containerDOM.style.backgroundColor = 'white';
	        actionNode.style.display = 'none';
	        avatarNode.firstChild.style.border = '1px solid black';
	        avatarNode.lastChild.setAttribute('disabled', 'disabled');
	
	        Array.from(infoNode.childNodes).forEach(function (childNode) {
	          if (childNode === infoNode.lastChild) {
	            return;
	          }
	          var label = childNode.firstChild,
	              input = childNode.lastChild;
	
	          label.style.display = 'initial';
	          input.style.display = 'none';
	
	          if (label.textContent !== input.value) {
	            label.innerHTML = input.value;
	            infoChangedByName.set(label.getAttribute('for'), input.value);
	          }
	        });
	
	        if (infoChangedByName.size !== 0) {
	          var newData = (0, _action.updateInfoCard)(this.card.id, infoChangedByName);
	          (0, _action.updateData)(newData);
	        }
	      }
	    }
	  }], [{
	    key: 'buildAvatarNode',
	    value: function buildAvatarNode() {
	      var avaContainer = (0, _index.createCommonContainer)('card__avatar');
	
	      var avatar = document.createElement('img');
	      avatar.src = 'images/avatar.png';
	      avaContainer.appendChild(avatar);
	
	      var button = document.createElement('input');
	      button.setAttribute('type', 'file');
	      button.className = 'button_change-avatar';
	      button.setAttribute('disabled', 'disabled');
	
	      avaContainer.appendChild(button);
	      return avaContainer;
	    }
	  }]);
	
	  return CardBoxDOM;
	}(_baseDom2.default);

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var BaseDOM = function () {
	  function BaseDOM(containerDOM) {
	    _classCallCheck(this, BaseDOM);
	
	    this.containerDOM = containerDOM;
	  }
	
	  _createClass(BaseDOM, [{
	    key: "render",
	    value: function render() {
	      return this.containerDOM;
	    }
	  }]);
	
	  return BaseDOM;
	}();
	
	exports.default = BaseDOM;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CardElementDOM = undefined;
	
	var _index = __webpack_require__(6);
	
	var _baseDom = __webpack_require__(12);
	
	var _baseDom2 = _interopRequireDefault(_baseDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var CardElementDOM = exports.CardElementDOM = function (_BaseDOM) {
	  _inherits(CardElementDOM, _BaseDOM);
	
	  function CardElementDOM(id, elementContentDOM, subCardContainerDOM) {
	    _classCallCheck(this, CardElementDOM);
	
	    var _this = _possibleConstructorReturn(this, (CardElementDOM.__proto__ || Object.getPrototypeOf(CardElementDOM)).call(this, (0, _index.createContainerByTagName)('li')));
	
	    _this.containerDOM.className = 'org-chart__card-element';
	    _this.containerDOM.id = id;
	    _this.containerDOM.appendChild(elementContentDOM.render());
	
	    if (subCardContainerDOM !== undefined) {
	      _this.containerDOM.appendChild(subCardContainerDOM.render());
	    }
	    return _this;
	  }
	
	  return CardElementDOM;
	}(_baseDom2.default);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CardContainerDOM = undefined;
	
	var _baseDom = __webpack_require__(12);
	
	var _baseDom2 = _interopRequireDefault(_baseDom);
	
	var _index = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var CardContainerDOM = exports.CardContainerDOM = function (_BaseDOM) {
	  _inherits(CardContainerDOM, _BaseDOM);
	
	  function CardContainerDOM() {
	    var cardElementDOMs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	
	    _classCallCheck(this, CardContainerDOM);
	
	    var _this = _possibleConstructorReturn(this, (CardContainerDOM.__proto__ || Object.getPrototypeOf(CardContainerDOM)).call(this, (0, _index.createContainerByTagName)('ul')));
	
	    _this.containerDOM.className = 'org-chart__card-container';
	    _this.cardElementDOMs = cardElementDOMs;
	    _this.cardElementDOMs.forEach(function (cardElementDOMs) {
	      return _this.containerDOM.appendChild(cardElementDOMs.render());
	    });
	    return _this;
	  }
	
	  return CardContainerDOM;
	}(_baseDom2.default);

/***/ })
/******/ ]);
//# sourceMappingURL=app.bundle.js.map