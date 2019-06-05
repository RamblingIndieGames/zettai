(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["zettai"] = factory();
	else
		root["zettai"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _runtime_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./runtime/runtime */ "./src/runtime/runtime.js");



const zettai = {
  VERSION: '1.0.0',
  LICENSE: 'MIT License (c) 2019, Rambling Indie Games, LLC',

  createRuntime (options) {
    return _runtime_runtime__WEBPACK_IMPORTED_MODULE_0__["default"].create(options)
  }
}

/* harmony default export */ __webpack_exports__["default"] = (zettai);


/***/ }),

/***/ "./src/runtime/asset-manager.js":
/*!**************************************!*\
  !*** ./src/runtime/asset-manager.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const assetManager = {
  create () {
    const assetCollection = {
      images: {},
      atlases: {},
      sounds: {},
      music: {},
      data: {}
    }

    const assets = {
      load (manifest, onLoadComplete) {
        const keysToLoad = Object.keys(manifest)
        const toLoad = keysToLoad.length

        if (!toLoad) {
          return onLoadComplete()
        }

        let loaded = 0

        const onAssetLoaded = (category, key, asset) => {
          assetCollection[category][key] = asset
          loaded += 1
          if (loaded >= toLoad) {
            return onLoadComplete()
          }
        }

        const loaders = {
          image (key, src) {
            const imageAsset = new Image()
            imageAsset.onload = () => {
              onAssetLoaded('images', key, imageAsset)
            }
            imageAsset.onerror = err => {
              throw new Error(err)
            }
            imageAsset.src = src
          },

          atlas (key, src) {
            const atlasAsset = new Image()
            atlasAsset.onload = () => {
              onAssetLoaded('atlases', key, atlasAsset)
            }
            atlasAsset.onerror = err => {
              throw new Error(err)
            }
            atlasAsset.src = src
          }

          // TODO: implement the other asset types
          // sound (key, src) {

          // },

          // music (key, src) {

          // },

          // data (key, src) {

          // }
        }

        const failedToLoad = (src, type) => {
          throw new Error(`Unable to load ${src} Unknown asset type: ${type}`)
        }

        keysToLoad.forEach(key => {
          const { src, type } = manifest[key]
          const loader = loaders[type]
          loader && loader(key, src)
          !loader && failedToLoad(src, type)
        })
      }
    }

    return [ assets, assetCollection ]
  }
}

/* harmony default export */ __webpack_exports__["default"] = (assetManager);


/***/ }),

/***/ "./src/runtime/audio-manager.js":
/*!**************************************!*\
  !*** ./src/runtime/audio-manager.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const unimplemented = {
  create (runtimeOptions) {
    if (!runtimeOptions.useAudio) {
      return undefined
    }

    const audio = {
      error: 'Sorry, the Audio Manager is not yet implemented! set useAudio runtime option to false!'
    }

    return audio
  }
}

/* harmony default export */ __webpack_exports__["default"] = (unimplemented);


/***/ }),

/***/ "./src/runtime/canvas-renderer.js":
/*!****************************************!*\
  !*** ./src/runtime/canvas-renderer.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/runtime/utils.js");


const canvasRenderer = {
  create (runtimeOptions) {
    const rootElement = document.querySelector(runtimeOptions.root) || document.body
    const canvas = document.createElement('canvas')

    canvas.classList.add('zettai__renderer-canvas')
    canvas.width = runtimeOptions.width
    canvas.height = runtimeOptions.height

    const ctx = canvas.getContext('2d')
    rootElement.appendChild(canvas)

    const renderer = {
      _backgroundColor: 'cornflowerblue',

      get ctx () {
        return ctx
      },

      get backgroundColor () {
        return renderer._backgroundColor
      },

      set backgroundColor (color) {
        renderer._backgroundColor = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["parseColor"])(color)
      },

      get renderables () {
        return renderer._entities || []
      },

      set renderables (r) {
        renderer._entities = r || []
      },

      // clears the frame to background color
      preFrame () {
        ctx.fillStyle = renderer._backgroundColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      },

      // renders all renderables
      update () {
        renderer.renderables.length > 0 && renderer.renderables.forEach(entity => {
          entity && typeof entity.draw === 'function' && entity.draw(ctx, canvas, renderer)
        })
      },

      // applies post-processing effects
      postFrame () {

      }
    }

    return renderer
  }
}

/* harmony default export */ __webpack_exports__["default"] = (canvasRenderer);


/***/ }),

/***/ "./src/runtime/gl-renderer.js":
/*!************************************!*\
  !*** ./src/runtime/gl-renderer.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const unimplemented = {
  create (runtimeOptions) {
    const renderer = {
      error: 'Sorry, the WebGL Renderer is not yet implemented! set useCanvas runtime option to true!'
    }

    return renderer
  }
}

/* harmony default export */ __webpack_exports__["default"] = (unimplemented);


/***/ }),

/***/ "./src/runtime/input-manager.js":
/*!**************************************!*\
  !*** ./src/runtime/input-manager.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const enableKeyboard = inputDevice => {

}

const enableMouse = (inputDevice, canvas) => {

}

const enableTouch = (inputDevice, canvas) => {

}

const inputManager = {
  create (runtimeOptions) {
    const input = {}

    // keyboard support?
    runtimeOptions.useKeyboard && enableKeyboard(input)

    // mouse and touch require the canvas element
    // so input has to be invoked after the renderer
    // the renderers will be given a classname of zettai__renderer-canvas
    // and will be a child of the runtime options root element
    const selector = `.zettai__renderer-canvas`
    const canvas = document.querySelector(selector)

    // mouse support?
    runtimeOptions.useMouse && enableMouse(input, canvas)

    // touch support?
    runtimeOptions.useTouch && enableTouch(input, canvas)

    return input
  }
}

/* harmony default export */ __webpack_exports__["default"] = (inputManager);


/***/ }),

/***/ "./src/runtime/runtime.js":
/*!********************************!*\
  !*** ./src/runtime/runtime.js ***!
  \********************************/
/*! exports provided: defaultOptions, validateOptions, runtime, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultOptions", function() { return defaultOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateOptions", function() { return validateOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "runtime", function() { return runtime; });
/* harmony import */ var _asset_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./asset-manager */ "./src/runtime/asset-manager.js");
/* harmony import */ var _input_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./input-manager */ "./src/runtime/input-manager.js");
/* harmony import */ var _audio_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./audio-manager */ "./src/runtime/audio-manager.js");
/* harmony import */ var _canvas_renderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./canvas-renderer */ "./src/runtime/canvas-renderer.js");
/* harmony import */ var _gl_renderer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gl-renderer */ "./src/runtime/gl-renderer.js");






const defaultOptions = {
  title: 'Untitled Zettai Project',
  root: 'div#game',
  width: 640,
  height: 480,
  scale: 'match-aspect-fill-height',
  manifest: {},
  useCanvas: true,
  useAudio: false,
  useMouse: false,
  useKeyboard: false,
  useTouch: false,
  debug: false
}

const validateOptions = options => {
  // TODO: implement option argument type validators
}

const runtime = {
  create (options) {
    validateOptions(options)

    const runtimeOptions = { ...defaultOptions, ...options }

    const [ assets, assetCollection ] = _asset_manager__WEBPACK_IMPORTED_MODULE_0__["default"].create()

    const audio = _audio_manager__WEBPACK_IMPORTED_MODULE_2__["default"].create(runtimeOptions)
    const renderer = runtimeOptions.useCanvas
      ? _canvas_renderer__WEBPACK_IMPORTED_MODULE_3__["default"].create(runtimeOptions)
      : _gl_renderer__WEBPACK_IMPORTED_MODULE_4__["default"].create(runtimeOptions)

    const input = _input_manager__WEBPACK_IMPORTED_MODULE_1__["default"].create(runtimeOptions)

    const entities = []
    const addedEntities = []
    const removedEntities = []
    const addEntity = entity => { addedEntities.push(entity) }
    const clearAddedList = () => { addedEntities.length = 0 }
    const removeEntity = entity => { removedEntities.push(entity) }
    const clearRemovedList = () => { removedEntities.length = 0 }
    const ySortEntities = (a, b) => b.y - a.y

    const entityManager = {
      get updatables () {
        return entityManager._entities || []
      },

      set updatables (r) {
        entityManager._entities = r || []
      },

      addEntity,

      removeEntity,

      update (deltaTime) {
        entityManager.updatables.length > 0 && entityManager.updatables.forEach(entity => {
          entity && typeof entity.update === 'function' && entity.update(deltaTime)
        })
      }
    }

    let lastTime = Date.now() * 0.001
    let deltaTime = 0

    const mainLoop = () => {
      const currentTime = Date.now() * 0.001
      deltaTime = currentTime - lastTime
      lastTime = currentTime

      const updatables = []
      const renderables = []

      // make one pass through the entities to send them to the right system
      entities.length > 0 && entities.forEach(entity => {
        entity && entity.updatable && updatables.push(entity)
        entity && entity.renderable && renderables.push(entity)
      })

      // pass all updatable entities to the entity manager
      entityManager.updatables = updatables

      entityManager.update(deltaTime)

      // y sort the renderable entities
      renderables.sort(ySortEntities)

      // pass all renderable entities to the renderer
      renderer.renderables = renderables

      // clears the frame to background color
      renderer.preFrame && renderer.preFrame()

      // renders all renderables
      renderer.update && renderer.update()

      // applies post-processing effects
      renderer.postFrame && renderer.postFrame()

      // add entities
      addedEntities.length > 0 && addedEntities.forEach(entity => {
        entities.push(entity)
      })

      addedEntities.length > 0 && clearAddedList()

      // remove entities
      removedEntities.length > 0 && removedEntities.forEach(entity => {
        const start = entities.indexOf(entity)
        const deleteCount = 1
        entities.splice(start, deleteCount)
      })

      removedEntities.length > 0 && clearRemovedList()

      window.requestAnimationFrame(mainLoop)
    }

    const game = {
      get width () {
        return runtimeOptions.width
      },

      get height () {
        return runtimeOptions.height
      },

      start () {
        mainLoop()
      }
    }

    const rt = {
      ready (fn) {
        document.addEventListener('DOMContentLoaded', () => {
          assets.load(runtimeOptions.manifest, () => {
            fn && typeof fn === 'function' && fn({
              game,
              assets: assetCollection,
              input,
              audio,
              renderer
            })
          })
        })
      }
    }

    document.title = runtimeOptions.title

    return rt
  }
}

/* harmony default export */ __webpack_exports__["default"] = (runtime);


/***/ }),

/***/ "./src/runtime/utils.js":
/*!******************************!*\
  !*** ./src/runtime/utils.js ***!
  \******************************/
/*! exports provided: clamp, hexByte, parseRGBAFromObject, parseColor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return clamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hexByte", function() { return hexByte; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseRGBAFromObject", function() { return parseRGBAFromObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseColor", function() { return parseColor; });
const clamp = (x, low, high) => {
  if (x < low) {
    return low
  } else if (x > high) {
    return high
  }
  return x
}

const hexByte = n => {
  const nString = n.toString(16)
  return nString.length < 2
    ? `0${nString}`
    : nString.substr(0, 2)
}

const parseRGBAFromObject = color => {
  const { r, g, b, a } = color

  const rgba = [r, g, b, a]
    .map(x => x === undefined ? 0 : clamp(x, 0, 255))
    .map(x => `${hexByte(x)}`)

  const hexColor = `#${rgba.join('')}`

  return hexColor
}

const parseColor = color => {
  if (typeof color === 'string') {
    return color
  } else if (typeof color === 'object') {
    return parseRGBAFromObject(color)
  }
}


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly96ZXR0YWkvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3pldHRhaS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly96ZXR0YWkvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vemV0dGFpLy4vc3JjL3J1bnRpbWUvYXNzZXQtbWFuYWdlci5qcyIsIndlYnBhY2s6Ly96ZXR0YWkvLi9zcmMvcnVudGltZS9hdWRpby1tYW5hZ2VyLmpzIiwid2VicGFjazovL3pldHRhaS8uL3NyYy9ydW50aW1lL2NhbnZhcy1yZW5kZXJlci5qcyIsIndlYnBhY2s6Ly96ZXR0YWkvLi9zcmMvcnVudGltZS9nbC1yZW5kZXJlci5qcyIsIndlYnBhY2s6Ly96ZXR0YWkvLi9zcmMvcnVudGltZS9pbnB1dC1tYW5hZ2VyLmpzIiwid2VicGFjazovL3pldHRhaS8uL3NyYy9ydW50aW1lL3J1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vemV0dGFpLy4vc3JjL3J1bnRpbWUvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdI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O0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVlLHNFQUFPOzs7Ozs7Ozs7Ozs7O0FDakt0QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQU87QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBLFVBQVUsUUFBUTtBQUNsQjtBQUNBOztBQUVPO0FBQ1AsU0FBUyxhQUFhOztBQUV0QjtBQUNBO0FBQ0EsaUJBQWlCLFdBQVc7O0FBRTVCLHVCQUF1QixjQUFjOztBQUVyQztBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EiLCJmaWxlIjoiemV0dGFpLWxpYi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInpldHRhaVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJ6ZXR0YWlcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiXG5pbXBvcnQgcnVudGltZSBmcm9tICcuL3J1bnRpbWUvcnVudGltZSdcblxuY29uc3QgemV0dGFpID0ge1xuICBWRVJTSU9OOiAnMS4wLjAnLFxuICBMSUNFTlNFOiAnTUlUIExpY2Vuc2UgKGMpIDIwMTksIFJhbWJsaW5nIEluZGllIEdhbWVzLCBMTEMnLFxuXG4gIGNyZWF0ZVJ1bnRpbWUgKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gcnVudGltZS5jcmVhdGUob3B0aW9ucylcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB6ZXR0YWlcbiIsImNvbnN0IGFzc2V0TWFuYWdlciA9IHtcbiAgY3JlYXRlICgpIHtcbiAgICBjb25zdCBhc3NldENvbGxlY3Rpb24gPSB7XG4gICAgICBpbWFnZXM6IHt9LFxuICAgICAgYXRsYXNlczoge30sXG4gICAgICBzb3VuZHM6IHt9LFxuICAgICAgbXVzaWM6IHt9LFxuICAgICAgZGF0YToge31cbiAgICB9XG5cbiAgICBjb25zdCBhc3NldHMgPSB7XG4gICAgICBsb2FkIChtYW5pZmVzdCwgb25Mb2FkQ29tcGxldGUpIHtcbiAgICAgICAgY29uc3Qga2V5c1RvTG9hZCA9IE9iamVjdC5rZXlzKG1hbmlmZXN0KVxuICAgICAgICBjb25zdCB0b0xvYWQgPSBrZXlzVG9Mb2FkLmxlbmd0aFxuXG4gICAgICAgIGlmICghdG9Mb2FkKSB7XG4gICAgICAgICAgcmV0dXJuIG9uTG9hZENvbXBsZXRlKClcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsb2FkZWQgPSAwXG5cbiAgICAgICAgY29uc3Qgb25Bc3NldExvYWRlZCA9IChjYXRlZ29yeSwga2V5LCBhc3NldCkgPT4ge1xuICAgICAgICAgIGFzc2V0Q29sbGVjdGlvbltjYXRlZ29yeV1ba2V5XSA9IGFzc2V0XG4gICAgICAgICAgbG9hZGVkICs9IDFcbiAgICAgICAgICBpZiAobG9hZGVkID49IHRvTG9hZCkge1xuICAgICAgICAgICAgcmV0dXJuIG9uTG9hZENvbXBsZXRlKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsb2FkZXJzID0ge1xuICAgICAgICAgIGltYWdlIChrZXksIHNyYykge1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VBc3NldCA9IG5ldyBJbWFnZSgpXG4gICAgICAgICAgICBpbWFnZUFzc2V0Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgb25Bc3NldExvYWRlZCgnaW1hZ2VzJywga2V5LCBpbWFnZUFzc2V0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW1hZ2VBc3NldC5vbmVycm9yID0gZXJyID0+IHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGltYWdlQXNzZXQuc3JjID0gc3JjXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGF0bGFzIChrZXksIHNyYykge1xuICAgICAgICAgICAgY29uc3QgYXRsYXNBc3NldCA9IG5ldyBJbWFnZSgpXG4gICAgICAgICAgICBhdGxhc0Fzc2V0Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgb25Bc3NldExvYWRlZCgnYXRsYXNlcycsIGtleSwgYXRsYXNBc3NldClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF0bGFzQXNzZXQub25lcnJvciA9IGVyciA9PiB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhdGxhc0Fzc2V0LnNyYyA9IHNyY1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFRPRE86IGltcGxlbWVudCB0aGUgb3RoZXIgYXNzZXQgdHlwZXNcbiAgICAgICAgICAvLyBzb3VuZCAoa2V5LCBzcmMpIHtcblxuICAgICAgICAgIC8vIH0sXG5cbiAgICAgICAgICAvLyBtdXNpYyAoa2V5LCBzcmMpIHtcblxuICAgICAgICAgIC8vIH0sXG5cbiAgICAgICAgICAvLyBkYXRhIChrZXksIHNyYykge1xuXG4gICAgICAgICAgLy8gfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZmFpbGVkVG9Mb2FkID0gKHNyYywgdHlwZSkgPT4ge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5hYmxlIHRvIGxvYWQgJHtzcmN9IFVua25vd24gYXNzZXQgdHlwZTogJHt0eXBlfWApXG4gICAgICAgIH1cblxuICAgICAgICBrZXlzVG9Mb2FkLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICBjb25zdCB7IHNyYywgdHlwZSB9ID0gbWFuaWZlc3Rba2V5XVxuICAgICAgICAgIGNvbnN0IGxvYWRlciA9IGxvYWRlcnNbdHlwZV1cbiAgICAgICAgICBsb2FkZXIgJiYgbG9hZGVyKGtleSwgc3JjKVxuICAgICAgICAgICFsb2FkZXIgJiYgZmFpbGVkVG9Mb2FkKHNyYywgdHlwZSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gWyBhc3NldHMsIGFzc2V0Q29sbGVjdGlvbiBdXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYXNzZXRNYW5hZ2VyXG4iLCJjb25zdCB1bmltcGxlbWVudGVkID0ge1xuICBjcmVhdGUgKHJ1bnRpbWVPcHRpb25zKSB7XG4gICAgaWYgKCFydW50aW1lT3B0aW9ucy51c2VBdWRpbykge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cblxuICAgIGNvbnN0IGF1ZGlvID0ge1xuICAgICAgZXJyb3I6ICdTb3JyeSwgdGhlIEF1ZGlvIE1hbmFnZXIgaXMgbm90IHlldCBpbXBsZW1lbnRlZCEgc2V0IHVzZUF1ZGlvIHJ1bnRpbWUgb3B0aW9uIHRvIGZhbHNlISdcbiAgICB9XG5cbiAgICByZXR1cm4gYXVkaW9cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB1bmltcGxlbWVudGVkXG4iLCJpbXBvcnQgeyBwYXJzZUNvbG9yIH0gZnJvbSAnLi91dGlscydcblxuY29uc3QgY2FudmFzUmVuZGVyZXIgPSB7XG4gIGNyZWF0ZSAocnVudGltZU9wdGlvbnMpIHtcbiAgICBjb25zdCByb290RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocnVudGltZU9wdGlvbnMucm9vdCkgfHwgZG9jdW1lbnQuYm9keVxuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG5cbiAgICBjYW52YXMuY2xhc3NMaXN0LmFkZCgnemV0dGFpX19yZW5kZXJlci1jYW52YXMnKVxuICAgIGNhbnZhcy53aWR0aCA9IHJ1bnRpbWVPcHRpb25zLndpZHRoXG4gICAgY2FudmFzLmhlaWdodCA9IHJ1bnRpbWVPcHRpb25zLmhlaWdodFxuXG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICByb290RWxlbWVudC5hcHBlbmRDaGlsZChjYW52YXMpXG5cbiAgICBjb25zdCByZW5kZXJlciA9IHtcbiAgICAgIF9iYWNrZ3JvdW5kQ29sb3I6ICdjb3JuZmxvd2VyYmx1ZScsXG5cbiAgICAgIGdldCBjdHggKCkge1xuICAgICAgICByZXR1cm4gY3R4XG4gICAgICB9LFxuXG4gICAgICBnZXQgYmFja2dyb3VuZENvbG9yICgpIHtcbiAgICAgICAgcmV0dXJuIHJlbmRlcmVyLl9iYWNrZ3JvdW5kQ29sb3JcbiAgICAgIH0sXG5cbiAgICAgIHNldCBiYWNrZ3JvdW5kQ29sb3IgKGNvbG9yKSB7XG4gICAgICAgIHJlbmRlcmVyLl9iYWNrZ3JvdW5kQ29sb3IgPSBwYXJzZUNvbG9yKGNvbG9yKVxuICAgICAgfSxcblxuICAgICAgZ2V0IHJlbmRlcmFibGVzICgpIHtcbiAgICAgICAgcmV0dXJuIHJlbmRlcmVyLl9lbnRpdGllcyB8fCBbXVxuICAgICAgfSxcblxuICAgICAgc2V0IHJlbmRlcmFibGVzIChyKSB7XG4gICAgICAgIHJlbmRlcmVyLl9lbnRpdGllcyA9IHIgfHwgW11cbiAgICAgIH0sXG5cbiAgICAgIC8vIGNsZWFycyB0aGUgZnJhbWUgdG8gYmFja2dyb3VuZCBjb2xvclxuICAgICAgcHJlRnJhbWUgKCkge1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gcmVuZGVyZXIuX2JhY2tncm91bmRDb2xvclxuICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KVxuICAgICAgfSxcblxuICAgICAgLy8gcmVuZGVycyBhbGwgcmVuZGVyYWJsZXNcbiAgICAgIHVwZGF0ZSAoKSB7XG4gICAgICAgIHJlbmRlcmVyLnJlbmRlcmFibGVzLmxlbmd0aCA+IDAgJiYgcmVuZGVyZXIucmVuZGVyYWJsZXMuZm9yRWFjaChlbnRpdHkgPT4ge1xuICAgICAgICAgIGVudGl0eSAmJiB0eXBlb2YgZW50aXR5LmRyYXcgPT09ICdmdW5jdGlvbicgJiYgZW50aXR5LmRyYXcoY3R4LCBjYW52YXMsIHJlbmRlcmVyKVxuICAgICAgICB9KVxuICAgICAgfSxcblxuICAgICAgLy8gYXBwbGllcyBwb3N0LXByb2Nlc3NpbmcgZWZmZWN0c1xuICAgICAgcG9zdEZyYW1lICgpIHtcblxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZW5kZXJlclxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNhbnZhc1JlbmRlcmVyXG4iLCJjb25zdCB1bmltcGxlbWVudGVkID0ge1xuICBjcmVhdGUgKHJ1bnRpbWVPcHRpb25zKSB7XG4gICAgY29uc3QgcmVuZGVyZXIgPSB7XG4gICAgICBlcnJvcjogJ1NvcnJ5LCB0aGUgV2ViR0wgUmVuZGVyZXIgaXMgbm90IHlldCBpbXBsZW1lbnRlZCEgc2V0IHVzZUNhbnZhcyBydW50aW1lIG9wdGlvbiB0byB0cnVlISdcbiAgICB9XG5cbiAgICByZXR1cm4gcmVuZGVyZXJcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB1bmltcGxlbWVudGVkXG4iLCJcbmNvbnN0IGVuYWJsZUtleWJvYXJkID0gaW5wdXREZXZpY2UgPT4ge1xuXG59XG5cbmNvbnN0IGVuYWJsZU1vdXNlID0gKGlucHV0RGV2aWNlLCBjYW52YXMpID0+IHtcblxufVxuXG5jb25zdCBlbmFibGVUb3VjaCA9IChpbnB1dERldmljZSwgY2FudmFzKSA9PiB7XG5cbn1cblxuY29uc3QgaW5wdXRNYW5hZ2VyID0ge1xuICBjcmVhdGUgKHJ1bnRpbWVPcHRpb25zKSB7XG4gICAgY29uc3QgaW5wdXQgPSB7fVxuXG4gICAgLy8ga2V5Ym9hcmQgc3VwcG9ydD9cbiAgICBydW50aW1lT3B0aW9ucy51c2VLZXlib2FyZCAmJiBlbmFibGVLZXlib2FyZChpbnB1dClcblxuICAgIC8vIG1vdXNlIGFuZCB0b3VjaCByZXF1aXJlIHRoZSBjYW52YXMgZWxlbWVudFxuICAgIC8vIHNvIGlucHV0IGhhcyB0byBiZSBpbnZva2VkIGFmdGVyIHRoZSByZW5kZXJlclxuICAgIC8vIHRoZSByZW5kZXJlcnMgd2lsbCBiZSBnaXZlbiBhIGNsYXNzbmFtZSBvZiB6ZXR0YWlfX3JlbmRlcmVyLWNhbnZhc1xuICAgIC8vIGFuZCB3aWxsIGJlIGEgY2hpbGQgb2YgdGhlIHJ1bnRpbWUgb3B0aW9ucyByb290IGVsZW1lbnRcbiAgICBjb25zdCBzZWxlY3RvciA9IGAuemV0dGFpX19yZW5kZXJlci1jYW52YXNgXG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcilcblxuICAgIC8vIG1vdXNlIHN1cHBvcnQ/XG4gICAgcnVudGltZU9wdGlvbnMudXNlTW91c2UgJiYgZW5hYmxlTW91c2UoaW5wdXQsIGNhbnZhcylcblxuICAgIC8vIHRvdWNoIHN1cHBvcnQ/XG4gICAgcnVudGltZU9wdGlvbnMudXNlVG91Y2ggJiYgZW5hYmxlVG91Y2goaW5wdXQsIGNhbnZhcylcblxuICAgIHJldHVybiBpbnB1dFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlucHV0TWFuYWdlclxuIiwiaW1wb3J0IGFzc2V0TWFuYWdlciBmcm9tICcuL2Fzc2V0LW1hbmFnZXInXG5pbXBvcnQgaW5wdXRNYW5hZ2VyIGZyb20gJy4vaW5wdXQtbWFuYWdlcidcbmltcG9ydCBhdWRpb01hbmFnZXIgZnJvbSAnLi9hdWRpby1tYW5hZ2VyJ1xuaW1wb3J0IGNhbnZhc1JlbmRlcmVyIGZyb20gJy4vY2FudmFzLXJlbmRlcmVyJ1xuaW1wb3J0IGdsUmVuZGVyZXIgZnJvbSAnLi9nbC1yZW5kZXJlcidcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xuICB0aXRsZTogJ1VudGl0bGVkIFpldHRhaSBQcm9qZWN0JyxcbiAgcm9vdDogJ2RpdiNnYW1lJyxcbiAgd2lkdGg6IDY0MCxcbiAgaGVpZ2h0OiA0ODAsXG4gIHNjYWxlOiAnbWF0Y2gtYXNwZWN0LWZpbGwtaGVpZ2h0JyxcbiAgbWFuaWZlc3Q6IHt9LFxuICB1c2VDYW52YXM6IHRydWUsXG4gIHVzZUF1ZGlvOiBmYWxzZSxcbiAgdXNlTW91c2U6IGZhbHNlLFxuICB1c2VLZXlib2FyZDogZmFsc2UsXG4gIHVzZVRvdWNoOiBmYWxzZSxcbiAgZGVidWc6IGZhbHNlXG59XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZU9wdGlvbnMgPSBvcHRpb25zID0+IHtcbiAgLy8gVE9ETzogaW1wbGVtZW50IG9wdGlvbiBhcmd1bWVudCB0eXBlIHZhbGlkYXRvcnNcbn1cblxuZXhwb3J0IGNvbnN0IHJ1bnRpbWUgPSB7XG4gIGNyZWF0ZSAob3B0aW9ucykge1xuICAgIHZhbGlkYXRlT3B0aW9ucyhvcHRpb25zKVxuXG4gICAgY29uc3QgcnVudGltZU9wdGlvbnMgPSB7IC4uLmRlZmF1bHRPcHRpb25zLCAuLi5vcHRpb25zIH1cblxuICAgIGNvbnN0IFsgYXNzZXRzLCBhc3NldENvbGxlY3Rpb24gXSA9IGFzc2V0TWFuYWdlci5jcmVhdGUoKVxuXG4gICAgY29uc3QgYXVkaW8gPSBhdWRpb01hbmFnZXIuY3JlYXRlKHJ1bnRpbWVPcHRpb25zKVxuICAgIGNvbnN0IHJlbmRlcmVyID0gcnVudGltZU9wdGlvbnMudXNlQ2FudmFzXG4gICAgICA/IGNhbnZhc1JlbmRlcmVyLmNyZWF0ZShydW50aW1lT3B0aW9ucylcbiAgICAgIDogZ2xSZW5kZXJlci5jcmVhdGUocnVudGltZU9wdGlvbnMpXG5cbiAgICBjb25zdCBpbnB1dCA9IGlucHV0TWFuYWdlci5jcmVhdGUocnVudGltZU9wdGlvbnMpXG5cbiAgICBjb25zdCBlbnRpdGllcyA9IFtdXG4gICAgY29uc3QgYWRkZWRFbnRpdGllcyA9IFtdXG4gICAgY29uc3QgcmVtb3ZlZEVudGl0aWVzID0gW11cbiAgICBjb25zdCBhZGRFbnRpdHkgPSBlbnRpdHkgPT4geyBhZGRlZEVudGl0aWVzLnB1c2goZW50aXR5KSB9XG4gICAgY29uc3QgY2xlYXJBZGRlZExpc3QgPSAoKSA9PiB7IGFkZGVkRW50aXRpZXMubGVuZ3RoID0gMCB9XG4gICAgY29uc3QgcmVtb3ZlRW50aXR5ID0gZW50aXR5ID0+IHsgcmVtb3ZlZEVudGl0aWVzLnB1c2goZW50aXR5KSB9XG4gICAgY29uc3QgY2xlYXJSZW1vdmVkTGlzdCA9ICgpID0+IHsgcmVtb3ZlZEVudGl0aWVzLmxlbmd0aCA9IDAgfVxuICAgIGNvbnN0IHlTb3J0RW50aXRpZXMgPSAoYSwgYikgPT4gYi55IC0gYS55XG5cbiAgICBjb25zdCBlbnRpdHlNYW5hZ2VyID0ge1xuICAgICAgZ2V0IHVwZGF0YWJsZXMgKCkge1xuICAgICAgICByZXR1cm4gZW50aXR5TWFuYWdlci5fZW50aXRpZXMgfHwgW11cbiAgICAgIH0sXG5cbiAgICAgIHNldCB1cGRhdGFibGVzIChyKSB7XG4gICAgICAgIGVudGl0eU1hbmFnZXIuX2VudGl0aWVzID0gciB8fCBbXVxuICAgICAgfSxcblxuICAgICAgYWRkRW50aXR5LFxuXG4gICAgICByZW1vdmVFbnRpdHksXG5cbiAgICAgIHVwZGF0ZSAoZGVsdGFUaW1lKSB7XG4gICAgICAgIGVudGl0eU1hbmFnZXIudXBkYXRhYmxlcy5sZW5ndGggPiAwICYmIGVudGl0eU1hbmFnZXIudXBkYXRhYmxlcy5mb3JFYWNoKGVudGl0eSA9PiB7XG4gICAgICAgICAgZW50aXR5ICYmIHR5cGVvZiBlbnRpdHkudXBkYXRlID09PSAnZnVuY3Rpb24nICYmIGVudGl0eS51cGRhdGUoZGVsdGFUaW1lKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBsYXN0VGltZSA9IERhdGUubm93KCkgKiAwLjAwMVxuICAgIGxldCBkZWx0YVRpbWUgPSAwXG5cbiAgICBjb25zdCBtYWluTG9vcCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gRGF0ZS5ub3coKSAqIDAuMDAxXG4gICAgICBkZWx0YVRpbWUgPSBjdXJyZW50VGltZSAtIGxhc3RUaW1lXG4gICAgICBsYXN0VGltZSA9IGN1cnJlbnRUaW1lXG5cbiAgICAgIGNvbnN0IHVwZGF0YWJsZXMgPSBbXVxuICAgICAgY29uc3QgcmVuZGVyYWJsZXMgPSBbXVxuXG4gICAgICAvLyBtYWtlIG9uZSBwYXNzIHRocm91Z2ggdGhlIGVudGl0aWVzIHRvIHNlbmQgdGhlbSB0byB0aGUgcmlnaHQgc3lzdGVtXG4gICAgICBlbnRpdGllcy5sZW5ndGggPiAwICYmIGVudGl0aWVzLmZvckVhY2goZW50aXR5ID0+IHtcbiAgICAgICAgZW50aXR5ICYmIGVudGl0eS51cGRhdGFibGUgJiYgdXBkYXRhYmxlcy5wdXNoKGVudGl0eSlcbiAgICAgICAgZW50aXR5ICYmIGVudGl0eS5yZW5kZXJhYmxlICYmIHJlbmRlcmFibGVzLnB1c2goZW50aXR5KVxuICAgICAgfSlcblxuICAgICAgLy8gcGFzcyBhbGwgdXBkYXRhYmxlIGVudGl0aWVzIHRvIHRoZSBlbnRpdHkgbWFuYWdlclxuICAgICAgZW50aXR5TWFuYWdlci51cGRhdGFibGVzID0gdXBkYXRhYmxlc1xuXG4gICAgICBlbnRpdHlNYW5hZ2VyLnVwZGF0ZShkZWx0YVRpbWUpXG5cbiAgICAgIC8vIHkgc29ydCB0aGUgcmVuZGVyYWJsZSBlbnRpdGllc1xuICAgICAgcmVuZGVyYWJsZXMuc29ydCh5U29ydEVudGl0aWVzKVxuXG4gICAgICAvLyBwYXNzIGFsbCByZW5kZXJhYmxlIGVudGl0aWVzIHRvIHRoZSByZW5kZXJlclxuICAgICAgcmVuZGVyZXIucmVuZGVyYWJsZXMgPSByZW5kZXJhYmxlc1xuXG4gICAgICAvLyBjbGVhcnMgdGhlIGZyYW1lIHRvIGJhY2tncm91bmQgY29sb3JcbiAgICAgIHJlbmRlcmVyLnByZUZyYW1lICYmIHJlbmRlcmVyLnByZUZyYW1lKClcblxuICAgICAgLy8gcmVuZGVycyBhbGwgcmVuZGVyYWJsZXNcbiAgICAgIHJlbmRlcmVyLnVwZGF0ZSAmJiByZW5kZXJlci51cGRhdGUoKVxuXG4gICAgICAvLyBhcHBsaWVzIHBvc3QtcHJvY2Vzc2luZyBlZmZlY3RzXG4gICAgICByZW5kZXJlci5wb3N0RnJhbWUgJiYgcmVuZGVyZXIucG9zdEZyYW1lKClcblxuICAgICAgLy8gYWRkIGVudGl0aWVzXG4gICAgICBhZGRlZEVudGl0aWVzLmxlbmd0aCA+IDAgJiYgYWRkZWRFbnRpdGllcy5mb3JFYWNoKGVudGl0eSA9PiB7XG4gICAgICAgIGVudGl0aWVzLnB1c2goZW50aXR5KVxuICAgICAgfSlcblxuICAgICAgYWRkZWRFbnRpdGllcy5sZW5ndGggPiAwICYmIGNsZWFyQWRkZWRMaXN0KClcblxuICAgICAgLy8gcmVtb3ZlIGVudGl0aWVzXG4gICAgICByZW1vdmVkRW50aXRpZXMubGVuZ3RoID4gMCAmJiByZW1vdmVkRW50aXRpZXMuZm9yRWFjaChlbnRpdHkgPT4ge1xuICAgICAgICBjb25zdCBzdGFydCA9IGVudGl0aWVzLmluZGV4T2YoZW50aXR5KVxuICAgICAgICBjb25zdCBkZWxldGVDb3VudCA9IDFcbiAgICAgICAgZW50aXRpZXMuc3BsaWNlKHN0YXJ0LCBkZWxldGVDb3VudClcbiAgICAgIH0pXG5cbiAgICAgIHJlbW92ZWRFbnRpdGllcy5sZW5ndGggPiAwICYmIGNsZWFyUmVtb3ZlZExpc3QoKVxuXG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKG1haW5Mb29wKVxuICAgIH1cblxuICAgIGNvbnN0IGdhbWUgPSB7XG4gICAgICBnZXQgd2lkdGggKCkge1xuICAgICAgICByZXR1cm4gcnVudGltZU9wdGlvbnMud2lkdGhcbiAgICAgIH0sXG5cbiAgICAgIGdldCBoZWlnaHQgKCkge1xuICAgICAgICByZXR1cm4gcnVudGltZU9wdGlvbnMuaGVpZ2h0XG4gICAgICB9LFxuXG4gICAgICBzdGFydCAoKSB7XG4gICAgICAgIG1haW5Mb29wKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBydCA9IHtcbiAgICAgIHJlYWR5IChmbikge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgICAgICAgIGFzc2V0cy5sb2FkKHJ1bnRpbWVPcHRpb25zLm1hbmlmZXN0LCAoKSA9PiB7XG4gICAgICAgICAgICBmbiAmJiB0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicgJiYgZm4oe1xuICAgICAgICAgICAgICBnYW1lLFxuICAgICAgICAgICAgICBhc3NldHM6IGFzc2V0Q29sbGVjdGlvbixcbiAgICAgICAgICAgICAgaW5wdXQsXG4gICAgICAgICAgICAgIGF1ZGlvLFxuICAgICAgICAgICAgICByZW5kZXJlclxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIGRvY3VtZW50LnRpdGxlID0gcnVudGltZU9wdGlvbnMudGl0bGVcblxuICAgIHJldHVybiBydFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJ1bnRpbWVcbiIsImV4cG9ydCBjb25zdCBjbGFtcCA9ICh4LCBsb3csIGhpZ2gpID0+IHtcbiAgaWYgKHggPCBsb3cpIHtcbiAgICByZXR1cm4gbG93XG4gIH0gZWxzZSBpZiAoeCA+IGhpZ2gpIHtcbiAgICByZXR1cm4gaGlnaFxuICB9XG4gIHJldHVybiB4XG59XG5cbmV4cG9ydCBjb25zdCBoZXhCeXRlID0gbiA9PiB7XG4gIGNvbnN0IG5TdHJpbmcgPSBuLnRvU3RyaW5nKDE2KVxuICByZXR1cm4gblN0cmluZy5sZW5ndGggPCAyXG4gICAgPyBgMCR7blN0cmluZ31gXG4gICAgOiBuU3RyaW5nLnN1YnN0cigwLCAyKVxufVxuXG5leHBvcnQgY29uc3QgcGFyc2VSR0JBRnJvbU9iamVjdCA9IGNvbG9yID0+IHtcbiAgY29uc3QgeyByLCBnLCBiLCBhIH0gPSBjb2xvclxuXG4gIGNvbnN0IHJnYmEgPSBbciwgZywgYiwgYV1cbiAgICAubWFwKHggPT4geCA9PT0gdW5kZWZpbmVkID8gMCA6IGNsYW1wKHgsIDAsIDI1NSkpXG4gICAgLm1hcCh4ID0+IGAke2hleEJ5dGUoeCl9YClcblxuICBjb25zdCBoZXhDb2xvciA9IGAjJHtyZ2JhLmpvaW4oJycpfWBcblxuICByZXR1cm4gaGV4Q29sb3Jcbn1cblxuZXhwb3J0IGNvbnN0IHBhcnNlQ29sb3IgPSBjb2xvciA9PiB7XG4gIGlmICh0eXBlb2YgY29sb3IgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGNvbG9yXG4gIH0gZWxzZSBpZiAodHlwZW9mIGNvbG9yID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBwYXJzZVJHQkFGcm9tT2JqZWN0KGNvbG9yKVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9