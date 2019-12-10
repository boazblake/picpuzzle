(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("initialize.js", function(exports, require, module) {
'use strict';

var log = function log(m) {
  return function (v) {
    console.log(m, v);return v;
  };
};

var getNewImage = function getNewImage(mdl) {
  return m.request({ method: 'GET', url: mdl.imageUrl }).then(log('S'), log('E'));
};

var mdl = {
  imageUrl: null, imageSrc: null
};

var Toolbar = {
  showInput: false,
  view: function view(_ref) {
    var state = _ref.state,
        mdl = _ref.attrs.mdl;
    return m('.toolbar', [!state.showInput && m('button', { onclick: function onclick(e) {
        return state.showInput = true;
      } }, 'New Image'), state.showInput && [m('input', { onchange: function onchange(e) {
        return mdl.imageUrl = e.target.value;
      } }), m('button', { onclick: function onclick(e) {
        getNewImage(mdl);state.showInput = false;
      } }, 'Get Image')], m('button', {}, 'Restart')]);
  }
};

var Puzzle = {
  view: function view(_ref2) {
    var mdl = _ref2.attrs.mdl;
    return m('.puzzle', m('img', { src: mdl.imageSrc }));
  }
};

var Game = {
  view: function view() {
    return m('.container', [m(Toolbar, { mdl: mdl }), m(Puzzle, { mdl: mdl })]);
  }
};

document.addEventListener("DOMContentLoaded", function () {
  var root = document.body;
  m.mount(root, Game);
});
});

;require.register("model.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animateComponentExit = exports.animateComponentEntrance = exports.isEmpty = exports.range = exports.getHue = exports.getHeight = exports.getWidth = exports.getRotation = exports.getPosition = exports.rest = exports.last = exports.log = undefined;

var _mithrilStream = require("mithril-stream");

var _mithrilStream2 = _interopRequireDefault(_mithrilStream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var WIDTH = (0, _mithrilStream2.default)(600);
var HEIGHT = (0, _mithrilStream2.default)(600);

var getDpr = function getDpr(size) {
  return size * window.devicePixelRatio || 1;
};

var log = exports.log = function log(m) {
  return function (v) {
    console.log(m, v);
    return v;
  };
};

var rand = function rand(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};
var last = exports.last = function last(xs) {
  return xs[xs.length - 1];
};
var rest = exports.rest = function rest(_ref) {
  var _ref2 = _toArray(_ref),
      head = _ref2[0],
      rest = _ref2.slice(1);

  return rest;
};

var getPosition = exports.getPosition = function getPosition(mdl) {
  return {
    x: rand(0, mdl.width()),
    y: rand(0, mdl.height())
  };
};
var getRotation = exports.getRotation = function getRotation() {
  return rand(0, 360);
};
var getWidth = exports.getWidth = function getWidth(mdl) {
  return rand(0, mdl.width());
};
var getHeight = exports.getHeight = function getHeight(mdl) {
  return rand(0, mdl.height());
};
var getHue = exports.getHue = function getHue() {
  return rand(0, 999);
};
var range = exports.range = function range(size) {
  return [].concat(_toConsumableArray(Array(size).keys()));
};

var isEmpty = exports.isEmpty = function isEmpty(xs) {
  return xs.length == 0;
};

var saveArt = function saveArt(mdl, art) {
  var image = { id: mdl.artworks().length, art: art };
  mdl.artworks.map(function (xs) {
    return xs.push(image);
  });
};

var animateComponentEntrance = exports.animateComponentEntrance = function animateComponentEntrance(idx, transition) {
  return function (_ref3) {
    var dom = _ref3.dom;

    dom.style.opacity = 0;
    return setTimeout(function () {
      dom.classList.add(transition);
      dom.style.opacity = 1;
    }, idx * 100 + 20);
  };
};

var animateComponentExit = exports.animateComponentExit = function animateComponentExit(idx, transition) {
  return function (_ref4) {
    var dom = _ref4.dom;

    console.log(dom);
    dom.style.opacity = 1;

    return new Promise(function (resolve) {
      setTimeout(function () {
        dom.classList.add(transition);
        dom.style.opacity = 0;
      }, idx * 100 + 20);
      dom.addEventListener("animationend", resolve);
    });
  };
};

var shapes = ["circle", "square", "triangle"];

var Model = {
  count: (0, _mithrilStream2.default)(rand(30, 70)),
  preventUpdate: (0, _mithrilStream2.default)(true),
  shapes: shapes,
  width: (0, _mithrilStream2.default)(600),
  height: (0, _mithrilStream2.default)(600),
  artworks: (0, _mithrilStream2.default)([]),
  canvas: (0, _mithrilStream2.default)(null),
  ctx: (0, _mithrilStream2.default)(null),
  dom: (0, _mithrilStream2.default)(null),
  rotateCanvas: (0, _mithrilStream2.default)(0),
  saveArt: saveArt,
  log: log,
  orientation: "portrait"
};
exports.default = Model;
});

;require.register("paint.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require("./model");

// hsla(hue, saturation, lightness, alpha)
// hue	0-360
// saturation	0-100%
// lightness	0-50-100%
// alpha	0.0-1.0
var hsla = function hsla(h, s, l, a) {
  return "hsla(" + h + ", " + s + ", " + l + ", " + a + ")";
};

var drawSquare = function drawSquare(ctx, position, rotation, width, height, hue) {
  // console.log("square", position, rotation, width, height)
  var color = hsla(hue, "60%", "50%", 0.75);
  ctx.save();
  ctx.fillStyle = color;
  ctx.translate(position.x, position.y);
  ctx.rotate(rotation);
  ctx.fillRect(-width / 2, -height / 2, width, height);
  ctx.restore();
};

var drawTriangle = function drawTriangle(ctx, position, rotation, width, height, hue) {
  // console.log("triangle", position, rotation, width, height)
  var color = hsla(hue, "60%", "50%", 0.75);

  ctx.save();
  ctx.fillStyle = color;
  ctx.translate(position.x, position.y);
  ctx.rotate(rotation);

  ctx.beginPath();
  ctx.moveTo(width, 0);
  ctx.lineTo(0, -width / 4);
  ctx.lineTo(0, width / 4);
  ctx.closePath();

  ctx.fill();
  ctx.restore();
};

var createArt = function createArt(ctx, mdl) {
  return function (shape) {
    if (shape == "triangle") return drawTriangle(ctx, (0, _model.getPosition)(mdl), (0, _model.getRotation)(), (0, _model.getWidth)(mdl), (0, _model.getHeight)(mdl), (0, _model.getHue)());
    if (shape == "square") return drawSquare(ctx, (0, _model.getPosition)(mdl), (0, _model.getRotation)(), (0, _model.getWidth)(mdl), (0, _model.getHeight)(mdl), (0, _model.getHue)());
  };
};

var getShape = function getShape(mdl) {
  return mdl.shapes[Math.floor(Math.random() * mdl.shapes.length)];
};

var Paint = function Paint(_ref) {
  var ctx = _ref.ctx,
      mdl = _ref.mdl;
  return (0, _model.range)(mdl.count()).map(function (_) {
    return getShape(mdl);
  }).map(createArt(ctx, mdl));
};

exports.default = Paint;
});

;require.register("styles/FLIP.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function FLIP() {
  var isCreated = false;
  var flip = { previous: {}, current: {} };

  return {
    onbeforeupdate: function onbeforeupdate(current, previous) {
      flip.previous = { children: previous.children };
      flip.current = { children: current.children };
    },
    view: function view(v) {
      first(v);
      return v.children;
    },


    oncreate: function oncreate(v) {
      isCreated = true;
      flip.previous = { children: [] };
      flip.current = { children: v.children };
      first(v);
      last();
      invert();
      play(v);
    },

    onupdate: function onupdate(v) {
      last();
      invert();
      play(v);
    }
  };

  function first(v) {
    if (!isCreated) return;

    // Here we create the flip.boundingClients map by key with:
    //   { <key>: {previous: {}}
    //
    flip.boundingClients = flip.previous.children.reduce(function (obj, it) {
      obj[it.key] = { previous: it.dom.getBoundingClientRect() };
      obj[it.key].vnode = it;

      return obj;
    }, {});

    // Now let's set current keys so we can identify removes
    // it.dom is undefined on current because first() is called from view()
    // Calling from view() is required so that onbeforeremove() can be assigned on removed keys
    flip.current.children.reduce(function (obj, it) {
      // This is a new vnode, { <key>: {current: {}}
      if (!obj[it.key]) {
        obj[it.key] = { current: undefined };
      } else {
        // This is an existing { <key>: {previous: {}} that was established in first()
        obj[it.key].current = undefined;
      }

      return obj;
    }, flip.boundingClients);

    // Here we'll handle removes.
    // We need to add this in first() because onbeforeremove
    // needs to be set before view() is called.
    // A key with { <key>: {previous: {}} and no current attr is a remove.
    Object.values(flip.boundingClients).filter(function (it) {
      return it.previous && !it.hasOwnProperty("current");
    }).filter(function (it) {
      return v.attrs && v.attrs.hasOwnProperty("exit");
    }).forEach(function (it) {
      var dom = it.vnode.dom;
      var exit = v.attrs.exit;

      it.vnode.attrs = it.vnode.attrs || {};

      Object.assign(it.vnode.attrs, {}, {
        onbeforeremove: function onbeforeremove(vnodeChild) {
          // Call the FLIP component's user defined exit() function with this child vnode.
          // exit() should return a Promise which will be the returned Promise of onbeforeremove.
          return exit.call(null, it.vnode, flip);
        }
      });
    });
  }

  // Here we'll look at current and map to an existing key if existed in first():
  // We'll end up with the following by key
  //   { <key>: {previous: {}, current: {}}  -> move
  //   { <key>: {current: {}}                -> enter
  //   { <key>: {previous: {}}               -> exit
  //
  // This is called from the FLIP component's onupdate(), therefore current's dom nodes are now set.
  function last() {
    if (!flip.boundingClients || !flip.current.children) return {};

    flip.current.children.reduce(function (obj, it) {
      obj[it.key].current = it.dom.getBoundingClientRect();
      obj[it.key].vnode = it;

      return obj;
    }, flip.boundingClients);
  }

  function invert() {
    Object.values(flip.boundingClients).forEach(function (it) {
      if (!it.current || !it.previous) {
        it.diff = false;
        return;
      }

      it.deltaY = it.previous.top - it.current.top;
      it.deltaX = it.previous.left - it.current.left;
      it.diff = !(it.deltaY === 0 && it.deltaX === 0);
    });
  }

  function play(v) {
    Object.values(flip.boundingClients).forEach(function (it, i) {
      if (!it.vnode) {
        console.error("no vnode", flip.boundingClients[i], it);
        return;
      }

      var dom = it.vnode.dom;
      var _v$attrs = v.attrs,
          enter = _v$attrs.enter,
          exit = _v$attrs.exit,
          move = _v$attrs.move,
          enterfinish = _v$attrs.enterfinish;


      if (enter && it.current && !it.previous) {
        // Call the FLIP component's user defined enter() function with this child vnode.
        enter.call(null, it.vnode, flip);
      } else if (move && it.diff && it.current && it.previous) {
        // Call the FLIP component's user defined move() function with this child vnode.
        move.call(null, it.vnode, flip);
      }
    });
  }
}

// Convenience utility to convert a string into a list.
// e.g. the string "ABCB" results in:
// {key: "A0", letter: "A"}
// {key: "B0", letter: "B"}
// {key: "C0", letter: "C"}
// {key: "B1", letter: "B"}
// You then can use this result to create vnode children as a keyed list for animating strings.
FLIP.letterKeys = function letterMap(string) {
  var lm = Array.from(string).reduce(function (obj, item) {
    if (!obj[item]) {
      obj[item] = { count: 0 };
    } else {
      obj[item].count++;
    }
    var key = item + obj[item].count;
    obj.asList.push({ key: key, letter: item });
    return obj;
  }, { asList: [] });

  return lm.asList;
};

FLIP.delta = function (boundingClient1, boundingClient2) {
  var deltaY = boundingClient1.top - boundingClient2.top,
      deltaX = boundingClient1.left - boundingClient2.left;

  return function () {
    var me = {
      deltaY: deltaY,
      deltaX: deltaX,
      isDiff: !(deltaY === 0 && deltaX === 0),
      toTranslate3d: function toTranslate3d() {
        return "translate3d(" + me.deltaX + "px, " + me.deltaY + "px, " + "0px)";
      }
    };

    return me;
  }();
};

exports.default = FLIP;
});

;require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window.m = require("mithril");


});})();require('___globals___');


//# sourceMappingURL=app.js.map