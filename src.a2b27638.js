// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/modules/Site.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Site = /*#__PURE__*/function () {
  function Site(root, model) {
    var _this = this;

    _classCallCheck(this, Site);

    _defineProperty(this, "rerender", function () {
      _this.clear();

      _this.render();
    });

    this.root = document.querySelector(root);
    this.model = model;
    this.init();
  }

  _createClass(Site, [{
    key: "init",
    value: function init() {
      this.root.addEventListener('click', this.editElement.bind(this));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      this.model.data.forEach(function (el) {
        _this2.root.insertAdjacentHTML('beforeend', el.toHTML());
      });
    }
  }, {
    key: "editElement",
    value: function editElement(e) {
      var id = e.target.dataset.id;

      if (id) {
        this.sidebar.renderForm(e.target);
      }
    }
  }, {
    key: "registerDep",
    value: function registerDep(name, dep) {
      this[name] = dep;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.root.innerHTML = '';
    }
  }]);

  return Site;
}();

exports.default = Site;
},{}],"src/modules/types.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.types = exports._DEFAULT = exports.VIDEO = exports.IMAGE = void 0;
var IMAGE = 'img';
exports.IMAGE = IMAGE;
var VIDEO = 'video';
exports.VIDEO = VIDEO;
var _DEFAULT = 'block';
exports._DEFAULT = _DEFAULT;
var typeByTag = {
  'IMG': IMAGE,
  'VIDEO': VIDEO,
  '_default': _DEFAULT
};
var types = new Proxy(typeByTag, {
  get: function get(target, name) {
    if (!target[name]) return target['_default'];
    return target[name];
  }
});
exports.types = types;
},{}],"src/modules/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toCSS = toCSS;
exports.fromForm = fromForm;
exports.copyHTML = copyHTML;

var _types = require("./types.js");

function toCSS() {
  var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (typeof s === 'string') return s;
  return Object.keys(s).map(function (k) {
    return "".concat(k, ": ").concat(s[k]);
  }).join(';');
}

function fromForm(e) {
  var data = {};
  Array.from(e.target.elements).forEach(function (el) {
    if (el.type === 'file') {
      data['file'] = el.files[0];
      return;
    }

    if (el.value) {
      data[el.dataset.type] = el.value;
    }
  });
  return data;
}

function copyHTML(e) {
  var html = document.querySelector('#site').innerHTML;
  e.target.textContent = 'Copied!';
  navigator.clipboard.writeText(html);
  setTimeout(function () {
    return e.target.textContent = 'Get HTML';
  }, 1000);
}
},{"./types.js":"src/modules/types.js"}],"src/modules/templates/inputs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createInput = createInput;
exports.stylesField = stylesField;

function createInput(value, type, dataset, req) {
  var ext = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  var required = req ? 'required' : '';
  return "<input \n\t\taccept=\"".concat(ext, "\"\n\t\tvalue=\"").concat(value, "\" \n\t\ttype=\"").concat(type, "\"\n\t\tdata-type=\"").concat(dataset, "\" \n\t\tplaceholder=\"").concat(dataset, "\"\n\t\t").concat(required, " />");
}

function stylesField(value) {
  var styles = value ? value.getAttribute('style') : '';
  return "<textarea data-type=\"styles\" placeholder=\"styles\">".concat(styles, "</textarea>");
}
},{}],"src/modules/templates/buttons.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function createBtn(content) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'btn';
  return "<button data-type=\"".concat(type, "\">").concat(content, "</button>");
}

var _default = createBtn;
exports.default = _default;
},{}],"src/modules/templates/select.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = selectForm;

var _types = require("../types.js");

function createOption(value) {
  var select = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return "<option value=\"".concat(value, "\" ").concat(select, " >").concat(value, "</option>");
}

function createOptions(type) {
  return Object.values(_types.types).map(function (t) {
    if (t === type) {
      return createOption(t, 'selected');
    }

    return createOption(t);
  }).join('');
}

function selectForm(type, el) {
  var options = createOptions(type);
  return !el ? "\n\t\t<select data-type=\"select\" >\n\t\t\t".concat(options, "\n\t\t</select>\n\t") : '';
}
},{"../types.js":"src/modules/types.js"}],"src/modules/templates/form.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.form = form;

var _types = require("../types.js");

var _inputs = require("./inputs.js");

var _buttons = _interopRequireDefault(require("./buttons.js"));

var _select = _interopRequireDefault(require("./select.js"));

var _inputTypes;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var inputTypes = (_inputTypes = {}, _defineProperty(_inputTypes, _types.VIDEO, function (el) {
  var value = '';

  if (el) {
    value = !el.src.includes('data:video') ? el.src : '';
  }

  return "\n\t\t\t".concat((0, _inputs.createInput)('', 'file', _types.VIDEO, false, '.mp4'), "\n\t\t\t").concat((0, _inputs.createInput)(value, 'text', 'url', false), "\n\t\t");
}), _defineProperty(_inputTypes, _types.IMAGE, function (el) {
  var value = '';

  if (el) {
    value = !el.src.includes('data:image') ? el.src : '';
  }

  return "\n\t\t\t".concat((0, _inputs.createInput)('', 'file', _types.IMAGE, false, '.png,.jpg,.jpeg,.gif'), "\n\t\t\t").concat((0, _inputs.createInput)(value, 'text', 'url', false), "\n\t\t");
}), _defineProperty(_inputTypes, _types._DEFAULT, function (el) {
  var value = '',
      tag = '';

  if (el) {
    value = el.textContent;
    tag = el.tagName.toLowerCase();
  }

  return "\n\t\t\t".concat((0, _inputs.createInput)(tag, 'text', 'tag', true), "\n\t\t\t").concat((0, _inputs.createInput)(value, 'text', 'content', true), "\n\t\t");
}), _inputTypes);

var submitBtn = function submitBtn(el) {
  return el ? (0, _buttons.default)('Change') : (0, _buttons.default)('Add');
};

var delBtn = function delBtn(el) {
  return el ? (0, _buttons.default)('Delete', 'btn-del') : '';
};

var formType = function formType(el) {
  return el ? 'form-change' : 'form-add';
};

var HTMLBtn = (0, _buttons.default)('Get Html', 'btn-html');

function form(type, el) {
  var inputType = inputTypes[type](el);
  return "\n\t\t".concat((0, _select.default)(type, el), "\n\n\t\t<form data-type=\"").concat(formType(el), "\" >\n\t\t\t").concat(inputType, "\n\t\t\t").concat((0, _inputs.stylesField)(el), "\n\t\t\t").concat(submitBtn(el), "\n\t\t</form>\n\n\t\t").concat(delBtn(el), "\n\t\t").concat(HTMLBtn, "\n\t");
}
},{"../types.js":"src/modules/types.js","./inputs.js":"src/modules/templates/inputs.js","./buttons.js":"src/modules/templates/buttons.js","./select.js":"src/modules/templates/select.js"}],"src/modules/Blocks.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateBlock = void 0;

var _utils = require("./utils.js");

var _types = require("./types.js");

var _blocks;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Block = /*#__PURE__*/function () {
  function Block(options) {
    _classCallCheck(this, Block);

    this.options = options;
  }

  _createClass(Block, [{
    key: "toHTML",
    value: function toHTML() {
      throw new Error('ERROR!');
    }
  }]);

  return Block;
}();

var SimpleBlock = /*#__PURE__*/function (_Block) {
  _inherits(SimpleBlock, _Block);

  var _super = _createSuper(SimpleBlock);

  function SimpleBlock(options) {
    _classCallCheck(this, SimpleBlock);

    return _super.call(this, options);
  }

  _createClass(SimpleBlock, [{
    key: "toHTML",
    value: function toHTML() {
      var _this$options = this.options,
          _this$options$content = _this$options.content,
          content = _this$options$content === void 0 ? '' : _this$options$content,
          styles = _this$options.styles,
          id = _this$options.id,
          tag = _this$options.tag;
      var css = (0, _utils.toCSS)(styles);
      return "<".concat(tag, " \n\t\t\tdata-id=\"").concat(id, "\" \n\t\t\tstyle=\"").concat(css, "\">").concat(content, "</").concat(tag, ">");
    }
  }]);

  return SimpleBlock;
}(Block);

var ImgBlock = /*#__PURE__*/function (_Block2) {
  _inherits(ImgBlock, _Block2);

  var _super2 = _createSuper(ImgBlock);

  function ImgBlock(options) {
    _classCallCheck(this, ImgBlock);

    return _super2.call(this, _objectSpread(_objectSpread({}, options), {}, {
      tag: 'img'
    }));
  }

  _createClass(ImgBlock, [{
    key: "toHTML",
    value: function toHTML() {
      var _this$options2 = this.options,
          styles = _this$options2.styles,
          _this$options2$alt = _this$options2.alt,
          alt = _this$options2$alt === void 0 ? '' : _this$options2$alt,
          id = _this$options2.id,
          url = _this$options2.url;
      var css = (0, _utils.toCSS)(styles);
      return "\n\t\t\t<img \n\t\t\t\tdata-id=\"".concat(id, "\" \n\t\t\t\tsrc=\"").concat(url, "\"\n\t\t\t\talt=\"").concat(alt, "\" \n\t\t\t\tstyle=\"").concat(css, "\">");
    }
  }]);

  return ImgBlock;
}(Block);

var VideoBlock = /*#__PURE__*/function (_Block3) {
  _inherits(VideoBlock, _Block3);

  var _super3 = _createSuper(VideoBlock);

  function VideoBlock(options) {
    _classCallCheck(this, VideoBlock);

    return _super3.call(this, _objectSpread(_objectSpread({}, options), {}, {
      tag: 'video'
    }));
  }

  _createClass(VideoBlock, [{
    key: "toHTML",
    value: function toHTML() {
      var _this$options3 = this.options,
          styles = _this$options3.styles,
          id = _this$options3.id,
          url = _this$options3.url;
      var css = (0, _utils.toCSS)(styles);
      return "<video \n\t\t\tsrc=\"".concat(url, "\" \n\t\t\tstyle=\"").concat(css, "\" \n\t\t\tdata-id=\"").concat(id, "\"\n\t\t\tautoplay\n\t\t\t></video>");
    }
  }]);

  return VideoBlock;
}(Block);

var blocks = (_blocks = {}, _defineProperty(_blocks, _types._DEFAULT, SimpleBlock), _defineProperty(_blocks, _types.IMAGE, ImgBlock), _defineProperty(_blocks, _types.VIDEO, VideoBlock), _blocks);

var CreateBlock = /*#__PURE__*/function () {
  function CreateBlock(type, options) {
    _classCallCheck(this, CreateBlock);

    this.options = _objectSpread(_objectSpread({}, options), {}, {
      id: Date.now().toString()
    });
    this.block = new blocks[type](this.options);
  }

  _createClass(CreateBlock, [{
    key: "toHTML",
    value: function toHTML() {
      return this.block.toHTML();
    }
  }]);

  return CreateBlock;
}();

exports.CreateBlock = CreateBlock;
},{"./utils.js":"src/modules/utils.js","./types.js":"src/modules/types.js"}],"src/modules/sidebar.functions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Blocks = require("./Blocks.js");

var _types = require("./types.js");

var _handlers;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var handlers = (_handlers = {}, _defineProperty(_handlers, _types._DEFAULT, function (options, sb) {
  var newBlock = new _Blocks.CreateBlock(_types._DEFAULT, options);
  actionModel(sb, options);
}), _defineProperty(_handlers, _types.IMAGE, function (options, sb) {
  multimedia(options, sb, _types.IMAGE);
}), _defineProperty(_handlers, _types.VIDEO, function (options, sb) {
  multimedia(options, sb, _types.VIDEO);
}), _handlers);

var getUrl = function getUrl(e) {
  return !e.target.result.includes("data:application");
};

function actionModel(sb, options) {
  var newBlock = new _Blocks.CreateBlock(sb.type, options);

  if (!sb.selectedEl) {
    sb.model.add(newBlock);
    sb.renderForm();
  } else {
    sb.model.replace(newBlock, sb.selectedEl.dataset.id);
    sb.closeEditForm();
  }

  sb.update();
}

function multimedia(options, sb) {
  var file = options.file || new Blob();
  var reader = new FileReader();
  var external = options['url'];

  if (external) {
    actionModel(sb, options);
    return;
  }

  reader.onload = function (e) {
    delete options.file;
    options['url'] = getUrl(e) ? e.target.result : sb.selectedEl.src;
    actionModel(sb, options);
  };

  reader.readAsDataURL(file);
}

var _default = handlers;
exports.default = _default;
},{"./Blocks.js":"src/modules/Blocks.js","./types.js":"src/modules/types.js"}],"src/modules/Sidebar.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _types = require("./types.js");

var _utils = require("./utils.js");

var _form = require("./templates/form.js");

var _sidebarFunctions = _interopRequireDefault(require("./sidebar.functions.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Sidebar = /*#__PURE__*/function () {
  function Sidebar(root, update, model) {
    _classCallCheck(this, Sidebar);

    this.root = document.querySelector(root);
    this.update = update;
    this.model = model;
    this.type = _types.types[_types._DEFAULT];
    this.selectedEl = null;
  }

  _createClass(Sidebar, [{
    key: "init",
    value: function init() {
      this.root.addEventListener('change', this.select.bind(this));
      this.root.addEventListener('submit', this.add.bind(this));
      this.root.addEventListener('click', this.clickHandler.bind(this));
      this.renderForm();
    }
  }, {
    key: "renderForm",
    value: function renderForm() {
      var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this.editMode(el);
      this.root.innerHTML = '';
      this.root.insertAdjacentHTML('beforeend', (0, _form.form)(this.type, this.selectedEl));
    }
  }, {
    key: "editMode",
    value: function editMode(el) {
      if (el) {
        this.type = _types.types[el.tagName];
        this.selectedEl = el;
      }
    }
  }, {
    key: "select",
    value: function select(e) {
      if (e.target.dataset.type === 'select') {
        this.type = e.target.value;
        this.renderForm();
      }
    }
  }, {
    key: "add",
    value: function add(e) {
      e.preventDefault();
      var data = (0, _utils.fromForm)(e);

      _sidebarFunctions.default[this.type](data, this);
    }
  }, {
    key: "clickHandler",
    value: function clickHandler(e) {
      var type = e.target.dataset.type;

      if (type === 'btn-html') {
        (0, _utils.copyHTML)(e);
      }

      if (type === 'btn-del') {
        this.model.remove(this.selectedEl.dataset.id);
        this.selectedEl.remove();
        this.closeEditForm();
        this.update();
      }
    }
  }, {
    key: "closeEditForm",
    value: function closeEditForm() {
      this.selectedEl = null;
      this.renderForm();
    }
  }]);

  return Sidebar;
}();

exports.default = Sidebar;
},{"./types.js":"src/modules/types.js","./utils.js":"src/modules/utils.js","./templates/form.js":"src/modules/templates/form.js","./sidebar.functions.js":"src/modules/sidebar.functions.js"}],"src/modules/model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Model = void 0;

var _Blocks = require("./Blocks.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Model = /*#__PURE__*/function () {
  function Model() {
    _classCallCheck(this, Model);

    this.data = [];
  }

  _createClass(Model, [{
    key: "add",
    value: function add(data) {
      this.data.push(data);
    }
  }, {
    key: "replace",
    value: function replace(newData, idx) {
      this.data = this.data.map(function (el) {
        return el.block.options.id === idx ? newData : el;
      });
    }
  }, {
    key: "remove",
    value: function remove(idx) {
      this.data = this.data.filter(function (_ref) {
        var block = _ref.block;
        return block.options.id !== idx;
      });
    }
  }]);

  return Model;
}();

exports.Model = Model;
},{"./Blocks.js":"src/modules/Blocks.js"}],"src/modules/App.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Site = _interopRequireDefault(require("./Site.js"));

var _Sidebar = _interopRequireDefault(require("./Sidebar.js"));

var _model = require("./model.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var App = /*#__PURE__*/function () {
  function App() {
    _classCallCheck(this, App);

    this.model = new _model.Model();
    this.site = new _Site.default('#site', this.model);
    this.sidebar = new _Sidebar.default('#sidebar', this.site.rerender, this.model);
  }

  _createClass(App, [{
    key: "init",
    value: function init() {
      this.site.render();
      this.site.registerDep('sidebar', this.sidebar);
      this.sidebar.init();
    }
  }]);

  return App;
}();

exports.default = App;
},{"./Site.js":"src/modules/Site.js","./Sidebar.js":"src/modules/Sidebar.js","./model.js":"src/modules/model.js"}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"styles/main.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _App = _interopRequireDefault(require("./modules/App.js"));

require("../styles/main.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _App.default().init();
},{"./modules/App.js":"src/modules/App.js","../styles/main.css":"styles/main.css"}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "1245" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map