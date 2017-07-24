/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Item */
/* unused harmony export ItemList */
/* unused harmony export EmptyItemQuery */
/* unused harmony export ItemQuery */
/* unused harmony export ItemUpdate */
/**
 * @typedef {!{id: number, completed: boolean, title: string}}
 */
var Item;

/**
 * @typedef {!Array<Item>}
 */
var ItemList;

/**
 * Enum containing a known-empty record type, matching only empty records unlike Object.
 *
 * @enum {Object}
 */
const Empty = {
	Record: {}
};

/**
 * Empty ItemQuery type, based on the Empty @enum.
 *
 * @typedef {Empty}
 */
var EmptyItemQuery;

/**
 * Reference to the only EmptyItemQuery instance.
 *
 * @type {EmptyItemQuery}
 */
const emptyItemQuery = Empty.Record;
/* harmony export (immutable) */ __webpack_exports__["a"] = emptyItemQuery;


/**
 * @typedef {!({id: number}|{completed: boolean}|EmptyItemQuery)}
 */
var ItemQuery;

/**
 * @typedef {!({id: number, title: string}|{id: number, completed: boolean})}
 */
var ItemUpdate;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["d"] = qs;
/* harmony export (immutable) */ __webpack_exports__["b"] = $on;
/* harmony export (immutable) */ __webpack_exports__["a"] = $delegate;
/**
 * querySelector wrapper
 *
 * @param {string} selector Selector to query
 * @param {Element} [scope] Optional scope element for the selector
 */
function qs(selector, scope) {
	return (scope || document).querySelector(selector);
}

/**
 * addEventListener wrapper
 *
 * @param {Element|Window} target Target Element
 * @param {string} type Event name to bind to
 * @param {Function} callback Event callback
 * @param {boolean} [capture] Capture the event
 */
function $on(target, type, callback, capture) {
	target.addEventListener(type, callback, !!capture);
}

/**
 * Attach a handler to an event for all elements matching a selector.
 *
 * @param {Element} target Element which the event must bubble to
 * @param {string} selector Selector to match
 * @param {string} type Event name
 * @param {Function} handler Function called when the event bubbles to target
 *                           from an element matching selector
 * @param {boolean} [capture] Capture the event
 */
function $delegate(target, selector, type, handler, capture) {
	const dispatchEvent = event => {
		const targetElement = event.target;
		const potentialElements = target.querySelectorAll(selector);
		let i = potentialElements.length;

		while (i--) {
			if (potentialElements[i] === targetElement) {
				handler.call(targetElement, event);
				break;
			}
		}
	};

	$on(target, type, dispatchEvent, !!capture);
}

/**
 * Encode less-than and ampersand characters with entity codes to make user-
 * provided text safe to parse as HTML.
 *
 * @param {string} s String to escape
 *
 * @returns {string} String with unsafe characters escaped with entity codes
 */
const escapeForHTML = s => s.replace(/[&<]/g, c => c === '&' ? '&amp;' : '&lt;');
/* harmony export (immutable) */ __webpack_exports__["c"] = escapeForHTML;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__item__ = __webpack_require__(0);


class Store {
	/**
	 * @param {!string} name Database name
	 * @param {function()} [callback] Called when the Store is ready
	 */
	constructor(name, callback) {
		/**
		 * @type {Storage}
		 */
		const localStorage = window.localStorage;

		/**
		 * @type {ItemList}
		 */
		let liveTodos;

		/**
		 * Read the local ItemList from localStorage.
		 *
		 * @returns {ItemList} Current array of todos
		 */
		this.getLocalStorage = () => {
			return liveTodos || JSON.parse(localStorage.getItem(name) || '[]');
		};

		/**
		 * Write the local ItemList to localStorage.
		 *
		 * @param {ItemList} todos Array of todos to write
		 */
		this.setLocalStorage = (todos) => {
			localStorage.setItem(name, JSON.stringify(liveTodos = todos));
		};

		if (callback) {
			callback();
		}
	}

	/**
	 * Find items with properties matching those on query.
	 *
	 * @param {ItemQuery} query Query to match
	 * @param {function(ItemList)} callback Called when the query is done
	 *
	 * @example
	 * db.find({completed: true}, data => {
	 *	 // data shall contain items whose completed properties are true
	 * })
	 */
	find(query, callback) {
		const todos = this.getLocalStorage();
		let k;

		callback(todos.filter(todo => {
			for (k in query) {
				if (query[k] !== todo[k]) {
					return false;
				}
			}
			return true;
		}));
	}

	/**
	 * Update an item in the Store.
	 *
	 * @param {ItemUpdate} update Record with an id and a property to update
	 * @param {function()} [callback] Called when partialRecord is applied
	 */
	update(update, callback) {
		const id = update.id;
		const todos = this.getLocalStorage();
		let i = todos.length;
		let k;

		while (i--) {
			if (todos[i].id === id) {
				for (k in update) {
					todos[i][k] = update[k];
				}
				break;
			}
		}

		this.setLocalStorage(todos);

		if (callback) {
			callback();
		}
	}

	/**
	 * Insert an item into the Store.
	 *
	 * @param {Item} item Item to insert
	 * @param {function()} [callback] Called when item is inserted
	 */
	insert(item, callback) {
		const todos = this.getLocalStorage();
		todos.push(item);
		this.setLocalStorage(todos);

		if (callback) {
			callback();
		}
	}

	/**
	 * Remove items from the Store based on a query.
	 *
	 * @param {ItemQuery} query Query matching the items to remove
	 * @param {function(ItemList)|function()} [callback] Called when records matching query are removed
	 */
	remove(query, callback) {
		let k;

		const todos = this.getLocalStorage().filter(todo => {
			for (k in query) {
				if (query[k] !== todo[k]) {
					return true;
				}
			}
			return false;
		});

		this.setLocalStorage(todos);

		if (callback) {
			callback(todos);
		}
	}

	/**
	 * Count total, active, and completed todos.
	 *
	 * @param {function(number, number, number)} callback Called when the count is completed
	 */
	count(callback) {
		this.find(__WEBPACK_IMPORTED_MODULE_0__item__["a" /* emptyItemQuery */], data => {
			const total = data.length;

			let i = total;
			let completed = 0;

			while (i--) {
				completed += data[i].completed;
			}
			callback(total, total - completed, completed);
		});
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Store;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__item__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__template__ = __webpack_require__(4);




const _itemId = element => parseInt(element.parentNode.dataset.id, 10);
const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

class View {
	/**
	 * @param {!Template} template A Template instance
	 */
	constructor(template) {
		this.template = template;
		this.$todoList = Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["d" /* qs */])('.todo-list');
		this.$todoItemCounter = Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["d" /* qs */])('.todo-count');
		this.$clearCompleted = Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["d" /* qs */])('.clear-completed');
		this.$main = Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["d" /* qs */])('.main');
		this.$toggleAll = Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["d" /* qs */])('.toggle-all');
		this.$newTodo = Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["d" /* qs */])('.new-todo');
		Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["a" /* $delegate */])(this.$todoList, 'li label', 'dblclick', ({target}) => {
			this.editItem(target);
		});
	}


	/**
	 * Put an item into edit mode.
	 *
	 * @param {!Element} target Target Item's label Element
	 */
	editItem(target) {
		const listItem = target.parentElement;

		listItem.classList.add('editing');

		const input = document.createElement('input');
		input.className = 'edit';

		input.value = target.innerText;
		listItem.appendChild(input);
		input.focus();
	}

	/**
	 * Populate the todo list with a list of items.
	 *
	 * @param {ItemList} items Array of items to display
	 */
	showItems(items) {
		this.$todoList.innerHTML = this.template.itemList(items);
	}

	/**
	 * Remove an item from the view.
	 *
	 * @param {number} id Item ID of the item to remove
	 */
	removeItem(id) {
		const elem = Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["d" /* qs */])(`[data-id="${id}"]`);

		if (elem) {
			this.$todoList.removeChild(elem);
		}
	}

	/**
	 * Set the number in the 'items left' display.
	 *
	 * @param {number} itemsLeft Number of items left
	 */
	setItemsLeft(itemsLeft) {
		this.$todoItemCounter.innerHTML = this.template.itemCounter(itemsLeft);
	}

	/**
	 * Set the visibility of the "Clear completed" button.
	 *
	 * @param {boolean|number} visible Desired visibility of the button
	 */
	setClearCompletedButtonVisibility(visible) {
		this.$clearCompleted.style.display = !!visible ? 'block' : 'none';
	}

	/**
	 * Set the visibility of the main content and footer.
	 *
	 * @param {boolean|number} visible Desired visibility
	 */
	setMainVisibility(visible) {
		this.$main.style.display = !!visible ? 'block' : 'none';
	}

	/**
	 * Set the checked state of the Complete All checkbox.
	 *
	 * @param {boolean|number} checked The desired checked state
	 */
	setCompleteAllCheckbox(checked) {
		this.$toggleAll.checked = !!checked;
	}

	/**
	 * Change the appearance of the filter buttons based on the route.
	 *
	 * @param {string} route The current route
	 */
	updateFilterButtons(route) {
		Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["d" /* qs */])('.filters>.selected').className = '';
		Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["d" /* qs */])(`.filters>[href="#/${route}"]`).className = 'selected';
	}

	/**
	 * Clear the new todo input
	 */
	clearNewTodo() {
		this.$newTodo.value = '';
	}

	/**
	 * Render an item as either completed or not.
	 *
	 * @param {!number} id Item ID
	 * @param {!boolean} completed True if the item is completed
	 */
	setItemComplete(id, completed) {
		const listItem = Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["d" /* qs */])(`[data-id="${id}"]`);

		if (!listItem) {
			return;
		}

		listItem.className = completed ? 'completed' : '';

		// In case it was toggled from an event and not by clicking the checkbox
		Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["d" /* qs */])('input', listItem).checked = completed;
	}

	/**
	 * Bring an item out of edit mode.
	 *
	 * @param {!number} id Item ID of the item in edit
	 * @param {!string} title New title for the item in edit
	 */
	editItemDone(id, title) {
		const listItem = Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["d" /* qs */])(`[data-id="${id}"]`);

		const input = Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["d" /* qs */])('input.edit', listItem);
		listItem.removeChild(input);

		listItem.classList.remove('editing');

		Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["d" /* qs */])('label', listItem).textContent = title;
	}

	/**
	 * @param {Function} handler Function called on synthetic event.
	 */
	bindAddItem(handler) {
		Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["b" /* $on */])(this.$newTodo, 'change', ({target}) => {
			const title = target.value.trim();
			if (title) {
				handler(title);
			}
		});
	}

	/**
	 * @param {Function} handler Function called on synthetic event.
	 */
	bindRemoveCompleted(handler) {
		Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["b" /* $on */])(this.$clearCompleted, 'click', handler);
	}

	/**
	 * @param {Function} handler Function called on synthetic event.
	 */
	bindToggleAll(handler) {
		Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["b" /* $on */])(this.$toggleAll, 'click', ({target}) => {
			handler(target.checked);
		});
	}

	/**
	 * @param {Function} handler Function called on synthetic event.
	 */
	bindRemoveItem(handler) {
		Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["a" /* $delegate */])(this.$todoList, '.destroy', 'click', ({target}) => {
			handler(_itemId(target));
		});
	}

	/**
	 * @param {Function} handler Function called on synthetic event.
	 */
	bindToggleItem(handler) {
		Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["a" /* $delegate */])(this.$todoList, '.toggle', 'click', ({target}) => {
			handler(_itemId(target), target.checked);
		});
	}

	/**
	 * @param {Function} handler Function called on synthetic event.
	 */
	bindEditItemSave(handler) {
		Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["a" /* $delegate */])(this.$todoList, 'li .edit', 'blur', ({target}) => {
			if (!target.dataset.iscanceled) {
				handler(_itemId(target), target.value.trim());
			}
		}, true);

		// Remove the cursor from the input when you hit enter just like if it were a real form
		Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["a" /* $delegate */])(this.$todoList, 'li .edit', 'keypress', ({target, keyCode}) => {
			if (keyCode === ENTER_KEY) {
				target.blur();
			}
		});
	}

	/**
	 * @param {Function} handler Function called on synthetic event.
	 */
	bindEditItemCancel(handler) {
		Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["a" /* $delegate */])(this.$todoList, 'li .edit', 'keyup', ({target, keyCode}) => {
			if (keyCode === ESCAPE_KEY) {
				target.dataset.iscanceled = true;
				target.blur();

				handler(_itemId(target));
			}
		});
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = View;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__item__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers__ = __webpack_require__(1);




class Template {
	/**
	 * Format the contents of a todo list.
	 *
	 * @param {ItemList} items Object containing keys you want to find in the template to replace.
	 * @returns {!string} Contents for a todo list
	 *
	 * @example
	 * view.show({
	 *	id: 1,
	 *	title: "Hello World",
	 *	completed: false,
	 * })
	 */
	itemList(items) {
		return items.reduce((a, item) => a + `
<li data-id="${item.id}"${item.completed ? ' class="completed"' : ''}>
	<input class="toggle" type="checkbox" ${item.completed ? 'checked' : ''}>
	<label>${Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["c" /* escapeForHTML */])(item.title)}</label>
	<button class="destroy"></button>
</li>`, '');
	}

	/**
	 * Format the contents of an "items left" indicator.
	 *
	 * @param {number} activeTodos Number of active todos
	 *
	 * @returns {!string} Contents for an "items left" indicator
	 */
	itemCounter(activeTodos) {
		return `${activeTodos} item${activeTodos !== 1 ? 's' : ''} left`;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Template;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__controller__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__template__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__view__ = __webpack_require__(3);






const store = new __WEBPACK_IMPORTED_MODULE_3__store__["a" /* default */]('todos-vanilla-es6');

const template = new __WEBPACK_IMPORTED_MODULE_2__template__["a" /* default */]();
const view = new __WEBPACK_IMPORTED_MODULE_4__view__["a" /* default */](template);

/**
 * @type {Controller}
 */
const controller = new __WEBPACK_IMPORTED_MODULE_0__controller__["a" /* default */](store, view);

const setView = () => controller.setView(document.location.hash);
Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["b" /* $on */])(window, 'load', setView);
Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["b" /* $on */])(window, 'hashchange', setView);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__item__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__view__ = __webpack_require__(3);




class Controller {
	/**
	 * @param  {!Store} store A Store instance
	 * @param  {!View} view A View instance
	 */
	constructor(store, view) {
		this.store = store;
		this.view = view;

		view.bindAddItem(this.addItem.bind(this));
		view.bindEditItemSave(this.editItemSave.bind(this));
		view.bindEditItemCancel(this.editItemCancel.bind(this));
		view.bindRemoveItem(this.removeItem.bind(this));
		view.bindToggleItem((id, completed) => {
			this.toggleCompleted(id, completed);
			this._filter();
		});
		view.bindRemoveCompleted(this.removeCompletedItems.bind(this));
		view.bindToggleAll(this.toggleAll.bind(this));

		this._activeRoute = '';
		this._lastActiveRoute = null;
	}

	/**
	 * Set and render the active route.
	 *
	 * @param {string} raw '' | '#/' | '#/active' | '#/completed'
	 */
	setView(raw) {
		const route = raw.replace(/^#\//, '');
		this._activeRoute = route;
		this._filter();
		this.view.updateFilterButtons(route);
	}

	/**
	 * Add an Item to the Store and display it in the list.
	 *
	 * @param {!string} title Title of the new item
	 */
	addItem(title) {
		this.store.insert({
			id: Date.now(),
			title,
			completed: false
		}, () => {
			this.view.clearNewTodo();
			this._filter(true);
		});
	}

	/**
	 * Save an Item in edit.
	 *
	 * @param {number} id ID of the Item in edit
	 * @param {!string} title New title for the Item in edit
	 */
	editItemSave(id, title) {
		if (title.length) {
			this.store.update({id, title}, () => {
				this.view.editItemDone(id, title);
			});
		} else {
			this.removeItem(id);
		}
	}

	/**
	 * Cancel the item editing mode.
	 *
	 * @param {!number} id ID of the Item in edit
	 */
	editItemCancel(id) {
		this.store.find({id}, data => {
			const title = data[0].title;
			this.view.editItemDone(id, title);
		});
	}

	/**
	 * Remove the data and elements related to an Item.
	 *
	 * @param {!number} id Item ID of item to remove
	 */
	removeItem(id) {
		this.store.remove({id}, () => {
			this._filter();
			this.view.removeItem(id);
		});
	}

	/**
	 * Remove all completed items.
	 */
	removeCompletedItems() {
		this.store.remove({completed: true}, this._filter.bind(this));
	}

	/**
	 * Update an Item in storage based on the state of completed.
	 *
	 * @param {!number} id ID of the target Item
	 * @param {!boolean} completed Desired completed state
	 */
	toggleCompleted(id, completed) {
		this.store.update({id, completed}, () => {
			this.view.setItemComplete(id, completed);
		});
	}

	/**
	 * Set all items to complete or active.
	 *
	 * @param {boolean} completed Desired completed state
	 */
	toggleAll(completed) {
		this.store.find({completed: !completed}, data => {
			for (let {id} of data) {
				this.toggleCompleted(id, completed);
			}
		});

		this._filter();
	}

	/**
	 * Refresh the list based on the current route.
	 *
	 * @param {boolean} [force] Force a re-paint of the list
	 */
	_filter(force) {
		const route = this._activeRoute;

		if (force || this._lastActiveRoute !== '' || this._lastActiveRoute !== route) {
			/* jscs:disable disallowQuotedKeysInObjects */
			this.store.find({
				'': __WEBPACK_IMPORTED_MODULE_0__item__["a" /* emptyItemQuery */],
				'active': {completed: false},
				'completed': {completed: true}
			}[route], this.view.showItems.bind(this.view));
			/* jscs:enable disallowQuotedKeysInObjects */
		}

		this.store.count((total, active, completed) => {
			this.view.setItemsLeft(active);
			this.view.setClearCompletedButtonVisibility(completed);

			this.view.setCompleteAllCheckbox(completed === total);
			this.view.setMainVisibility(total);
		});

		this._lastActiveRoute = route;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Controller;



/***/ })
/******/ ]);