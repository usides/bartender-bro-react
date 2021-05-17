parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"PA9s":[function(require,module,exports) {
"use strict";function e(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function t(t){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{};n%2?e(Object(o),!0).forEach(function(e){r(t,e,o[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):e(Object(o)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))})}return t}function r(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.createFragment=exports.createElement=void 0;const n=(e,r,...n)=>{if("function"==typeof e)return e(t(t({},r),{},{children:n}),n);const c=""===e?new DocumentFragment:document.createElement(e);return Object.entries(r||{}).forEach(([e,t])=>{if(e.startsWith("on")&&e.toLowerCase()in window)c.addEventListener(e.toLowerCase().substr(2),t);else try{c instanceof DocumentFragment||(["disabled","checked"].includes(e)&&!t?c.removeAttribute(e):c.setAttribute(e,t))}catch(r){console.error("createElement caught",r,"on",c)}}),n.forEach(e=>o(c,e)),c};exports.createElement=n;const o=(e,t)=>{Array.isArray(t)?t.forEach(t=>o(e,t)):null!=t&&e.appendChild(t.nodeType?t:document.createTextNode(t.toString()))},c=(e,...t)=>n("",e,...t);exports.createFragment=c;
},{}],"iWoG":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=n;var e=require("../framework/element");let t,l;function n(n=null,r=null){n&&(t=n),r&&(l=r),l.innerHTML="",l.appendChild((0,e.createElement)(t,null)),document.getElementById("searchInput").focus()}
},{"../framework/element":"PA9s"}],"25oI":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;const e={currentDrinkRequest:"",loadedDrinkRequests:{},currentDrink:null,error:null,isDataLoading:!1};var r=e;exports.default=r;
},{}],"rVYa":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.setCurrentDrink=n,exports.getLoadedDataByRequest=r,exports.showRandomDrink=d,exports.makeSearch=i;var t=e(require("../framework/render"));function e(t){return t&&t.__esModule?t:{default:t}}function n({target:e}){const n=r(),a=e.closest("li");if(!a)return;const o=n.find(t=>t.idDrink===a.dataset.id);window.data.currentDrink=o,(0,t.default)()}function r(){const{currentDrinkRequest:t,loadedDrinkRequests:e}=window.data;return e[t]}function a(){return!(!r()&&null!==r())}function o(t){const e=`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${t}`;if(""===t){const t="Please input correct data";return Promise.resolve({error:t})}return a()?Promise.resolve({}):fetch(e).then(t=>t.json()).then(t=>t.drinks).then(t=>({data:t}))}function d(){window.data.currentDrink=null;fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php").then(t=>t.json()).then(t=>t.drinks).then(t=>{window.data.loadedDrinkRequests.random=t,window.data.currentDrinkRequest="random"}).catch(t=>window.data.error=t).finally(()=>{(0,t.default)()})}function i(e){e=e.toLowerCase().trim(),window.data.currentDrinkRequest=e,window.data.error=null,window.data.isDataLoading=!0,window.data.currentDrink=null,(0,t.default)(),o(e).then(({data:t,error:n})=>{window.data.isDataLoading=!1,n?window.data.error=n:(t||null===t)&&(window.data.loadedDrinkRequests[e]=t)}).catch(t=>window.data.error=t).finally(()=>{(0,t.default)()})}
},{"../framework/render":"iWoG"}],"2vvR":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=a;var e=require("../framework/element"),t=require("../data/cocktailData");function a(){return(0,e.createElement)("div",{class:"talk-zone"},(0,e.createElement)("input",{id:"searchInput",type:"text",placeholder:"Bro, what is ...?",value:"random"===window.data.currentDrinkRequest?"":window.data.currentDrinkRequest,onChange:e=>(0,t.makeSearch)(e.target.value),onFocus:e=>e.target.setSelectionRange(e.target.value.length,etarget.value.length)}),(0,e.createElement)("button",{type:"button",onClick:t.showRandomDrink},"Bro, give me anything that burns!!!"))}
},{"../framework/element":"PA9s","../data/cocktailData":"rVYa"}],"GuuZ":[function(require,module,exports) {
module.exports={option_item:"_option_item_dc0e7",option_list:"_option_list_dc0e7",ingredients:"_ingredients_dc0e7",ingredients__list_name:"_ingredients__list_name_dc0e7",ingredients__list_qty:"_ingredients__list_qty_dc0e7",ingredients__item:"_ingredients__item_dc0e7"};
},{}],"sivE":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=l;var e=require("../framework/element"),t=require("../data/cocktailData"),n=r(require("../../main.css"));function r(e){return e&&e.__esModule?e:{default:e}}function l(){const r=(0,t.getLoadedDataByRequest)();let l="";if(null===r&&(l=(0,e.createElement)("p",null,"Nothing found")),r&&r.length>1){const a=r.map(({strDrink:t,idDrink:r})=>(0,e.createElement)("li",{class:n.default.option_item,"data-id":r},t));l=(0,e.createElement)(e.createFragment,null,(0,e.createElement)("p",null,"I found these options:"),(0,e.createElement)("ol",{id:"list",onClick:t.setCurrentDrink,class:n.default.option_list},a))}return r&&null===window.data.currentDrink&&(window.data.currentDrink=r[0]),l}
},{"../framework/element":"PA9s","../data/cocktailData":"rVYa","../../main.css":"GuuZ"}],"As55":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=l;var e=require("../framework/element"),t=r(require("../../main.css"));function r(e){return e&&e.__esModule?e:{default:e}}function l(){let r="";const l=window.data.currentDrink;if(l){const n=Object.keys(l),i=n.filter(e=>/strIngredient/.test(e)).map(e=>l[e]).filter(e=>e),s=n.filter(e=>/strMeasure/.test(e)).map(e=>l[e]).slice(0,i.length).map(e=>null===e?"by eye":e);r=(0,e.createElement)(e.createFragment,null,(0,e.createElement)("h1",null,l.strDrink),(0,e.createElement)("img",{src:`${l.strDrinkThumb}/preview`,alt:"drink-img"}),(0,e.createElement)("div",{class:t.default.ingredients},(0,e.createElement)("ul",{class:t.default.ingredients__list_name},i.map(r=>(0,e.createElement)("li",{class:t.default.ingredients__item},r))),(0,e.createElement)("ul",{class:t.default.ingredients__list_qty},s.map(r=>(0,e.createElement)("li",{class:t.default.ingredients__item},r)))),(0,e.createElement)("p",null,l.strInstructions))}return(0,e.createElement)("div",null,r)}
},{"../framework/element":"PA9s","../../main.css":"GuuZ"}],"YPpn":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=a;var e=require("../framework/element"),t=l(require("./OptionList")),r=l(require("./ResultFields"));function l(e){return e&&e.__esModule?e:{default:e}}function a(){let l="";return window.data.isDataLoading?(0,e.createElement)("p",null,"Data is loading..."):window.data.error?(0,e.createElement)("p",null,"$",window.data.error):l=(0,e.createElement)("div",null,(0,e.createElement)(t.default,null),(0,e.createElement)(r.default,null))}
},{"../framework/element":"PA9s","./OptionList":"sivE","./ResultFields":"As55"}],"le+d":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=l;var e=require("../framework/element"),t=u(require("./ControlButtons")),r=u(require("./Results"));function u(e){return e&&e.__esModule?e:{default:e}}function l(){return(0,e.createElement)(e.createFragment,null,(0,e.createElement)(t.default,null),(0,e.createElement)(r.default,null))}
},{"../framework/element":"PA9s","./ControlButtons":"2vvR","./Results":"YPpn"}],"Focm":[function(require,module,exports) {
"use strict";var e=a(require("./framework/render")),t=a(require("./data/data")),r=a(require("./components/App"));function a(e){return e&&e.__esModule?e:{default:e}}module.hot&&module.hot.accept(),window.data=t.default,(0,e.default)(r.default,document.getElementById("app-root"));
},{"./framework/render":"iWoG","./data/data":"25oI","./components/App":"le+d"}]},{},["Focm"], null)
//# sourceMappingURL=src.c41e7234.js.map