/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var MultipleValuesInput;MultipleValuesInput =
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/MultipleValuesInput/MultipleValuesInput.scss":
/*!**********************************************************!*\
  !*** ./src/MultipleValuesInput/MultipleValuesInput.scss ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://MultipleValuesInput/./src/MultipleValuesInput/MultipleValuesInput.scss?");

/***/ }),

/***/ "./src/MultipleValuesInput/MultipleValuesInput.ts":
/*!********************************************************!*\
  !*** ./src/MultipleValuesInput/MultipleValuesInput.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.MultipleValuesInput = void 0;\nvar PREFIX = 'MultipleValuesInput';\nvar classes = {\n    HIDDEN_ROOT: PREFIX + \"__root--hidden\",\n    CONTAINER: PREFIX + \"__container\",\n    ITEM: PREFIX + \"__item\",\n    BLOCK: PREFIX + \"__block\",\n    INPUT: PREFIX + \"__input\",\n    BLOCK_VALID: PREFIX + \"__block--valid\",\n    BLOCK_INVALID: PREFIX + \"__block--invalid\",\n};\nvar DEFAULT_OPTIONS = {\n    values: [],\n    validator: function (item) { return item.trim().length > 0; },\n    placeholder: 'Enter item',\n    onChange: function () { },\n};\nvar MultipleValuesInput = /** @class */ (function () {\n    function MultipleValuesInput(root, options) {\n        if (options === void 0) { options = {}; }\n        this.items = new Map([]);\n        this.root = root;\n        this.options = __assign(__assign({}, DEFAULT_OPTIONS), options);\n        this.container = this.createContainerElement();\n        this.input = this.createInputElement();\n        this.mount();\n    }\n    MultipleValuesInput.prototype.getItems = function () {\n        return Array.from(this.items.entries());\n    };\n    MultipleValuesInput.prototype.add = function (value) {\n        var items = this.setItemsByValue(value);\n        this.appendBlockForItems(items);\n        this.triggerOnChangeHandler();\n    };\n    MultipleValuesInput.prototype.destroy = function () {\n        this.unmount();\n    };\n    MultipleValuesInput.prototype.mount = function () {\n        if (!this.root.parentNode) {\n            throw new Error('No parent node defined! Make sure you have not selected document root as input root!');\n        }\n        var items = this.setItemsByValue(this.options.values);\n        this.root.classList.add(classes.HIDDEN_ROOT);\n        this.root.dataset.testid = 'root';\n        this.root.parentNode.insertBefore(this.container, this.root.nextSibling);\n        this.container.appendChild(this.input);\n        this.container.appendChild(this.root);\n        this.appendBlockForItems(items);\n    };\n    MultipleValuesInput.prototype.unmount = function () {\n        this.container.removeEventListener('click', this.handleBlockRemove);\n        this.input.removeEventListener('keyup', this.handleKeyup);\n        this.input.removeEventListener('focusout', this.handleFocusout);\n        this.input.removeEventListener('paste', this.handlePaste);\n        var parent = this.container.parentNode;\n        this.root.classList.remove(classes.HIDDEN_ROOT);\n        parent === null || parent === void 0 ? void 0 : parent.appendChild(this.root);\n        parent === null || parent === void 0 ? void 0 : parent.removeChild(this.container);\n    };\n    MultipleValuesInput.prototype.createContainerElement = function () {\n        var container = document.createElement('div');\n        container.classList.add(classes.CONTAINER);\n        container.dataset.testid = 'container';\n        container.addEventListener('click', this.handleBlockRemove.bind(this));\n        return container;\n    };\n    MultipleValuesInput.prototype.createInputElement = function () {\n        var input = document.createElement('input');\n        input.classList.add(classes.INPUT);\n        input.classList.add(classes.ITEM);\n        input.type = 'text';\n        input.placeholder = this.options.placeholder;\n        input.addEventListener('keyup', this.handleKeyup.bind(this));\n        input.addEventListener('focusout', this.handleFocusout.bind(this));\n        input.addEventListener('paste', this.handlePaste.bind(this));\n        return input;\n    };\n    MultipleValuesInput.prototype.createBlockElement = function (value, properties) {\n        var block = document.createElement('div');\n        var text = document.createElement('span');\n        var removeBtn = document.createElement('button');\n        block.classList.add(classes.ITEM);\n        block.classList.add(classes.BLOCK);\n        block.classList.add(properties.valid ? classes.BLOCK_VALID : classes.BLOCK_INVALID);\n        block.dataset.value = value;\n        text.textContent = value;\n        removeBtn.innerHTML = '&times;';\n        removeBtn.type = 'button';\n        block.appendChild(text);\n        block.appendChild(removeBtn);\n        return block;\n    };\n    MultipleValuesInput.prototype.appendBlockForItems = function (items) {\n        var _this = this;\n        items.forEach(function (_a) {\n            var _b;\n            var value = _a[0], properties = _a[1];\n            var block = _this.createBlockElement(value, properties);\n            (_b = _this.input.parentNode) === null || _b === void 0 ? void 0 : _b.insertBefore(block, _this.input);\n            _this.container.scrollTop = _this.container.scrollHeight;\n        });\n    };\n    MultipleValuesInput.prototype.formatInputValue = function (item) {\n        return item.trim().replace(/,/g, '');\n    };\n    MultipleValuesInput.prototype.getItemProperties = function (value) {\n        return {\n            valid: this.options.validator(value)\n        };\n    };\n    MultipleValuesInput.prototype.setItemsByValue = function (value) {\n        var _this = this;\n        var values = Array.isArray(value) ? value : [value];\n        var formattedValues = values.map(function (value) { return _this.formatInputValue(value); }).filter(Boolean);\n        if (formattedValues.length === 0) {\n            return [];\n        }\n        var items = [];\n        formattedValues.forEach(function (value) {\n            if (_this.items.has(value)) {\n                return;\n            }\n            var properties = _this.getItemProperties(value);\n            _this.items.set(value, properties);\n            items.push([value, properties]);\n        });\n        return items;\n    };\n    MultipleValuesInput.prototype.resetInputValue = function () {\n        this.input.value = '';\n    };\n    MultipleValuesInput.prototype.handleKeyup = function (event) {\n        if (!['Enter', 'Comma'].includes(event.code)) {\n            return;\n        }\n        var items = this.setItemsByValue(this.input.value);\n        this.appendBlockForItems(items);\n        this.triggerOnChangeHandler();\n        this.resetInputValue();\n    };\n    MultipleValuesInput.prototype.handleFocusout = function () {\n        if (this.input.value.length === 0) {\n            return;\n        }\n        var items = this.setItemsByValue(this.input.value);\n        this.appendBlockForItems(items);\n        this.triggerOnChangeHandler();\n        this.resetInputValue();\n    };\n    MultipleValuesInput.prototype.handlePaste = function (event) {\n        event.preventDefault();\n        if (!event.clipboardData) {\n            return;\n        }\n        try {\n            var data = event.clipboardData.getData('text');\n            var values = data.split(',');\n            var items = this.setItemsByValue(values);\n            this.appendBlockForItems(items);\n            this.triggerOnChangeHandler();\n            this.resetInputValue();\n        }\n        catch (e) {\n            console.error(e);\n        }\n    };\n    MultipleValuesInput.prototype.handleBlockRemove = function (event) {\n        var target = event.target;\n        if (target.tagName.toLowerCase() !== 'button') {\n            return;\n        }\n        var block = target.parentNode;\n        var value = block.dataset.value;\n        if (block && value) {\n            this.items.delete(value);\n            this.container.removeChild(block);\n            this.triggerOnChangeHandler();\n        }\n    };\n    MultipleValuesInput.prototype.triggerOnChangeHandler = function () {\n        this.options.onChange(this.getItems());\n    };\n    return MultipleValuesInput;\n}());\nexports.MultipleValuesInput = MultipleValuesInput;\n\n\n//# sourceURL=webpack://MultipleValuesInput/./src/MultipleValuesInput/MultipleValuesInput.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(module, exports, __webpack_require__) {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar MultipleValuesInput_1 = __webpack_require__(/*! ./MultipleValuesInput/MultipleValuesInput */ \"./src/MultipleValuesInput/MultipleValuesInput.ts\");\n__webpack_require__(/*! ./MultipleValuesInput/MultipleValuesInput.scss */ \"./src/MultipleValuesInput/MultipleValuesInput.scss\");\nmodule.exports = MultipleValuesInput_1.MultipleValuesInput;\n\n\n//# sourceURL=webpack://MultipleValuesInput/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./src/index.ts");
/******/ })()
;