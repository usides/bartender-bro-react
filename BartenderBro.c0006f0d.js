parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Focm":[function(require,module,exports) {
function n(){document.getElementById("app-root").innerHTML=r()}function t(t){i(t).then(t=>{window.data.apiDrinks=t,t&&(window.data.currentDrink=window.data.apiDrinks[0]),n()}).catch(n=>alert(n))}function i(n){return new Promise((t,i)=>{let e="";void 0===n?e="https://www.thecocktaildb.com/api/json/v1/1/random.php":(e=`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${n}`,""!==n&&n.trim().length||t(null));const r=fetch(e).then(n=>n.json()).then(n=>n.drinks);t(r)})}function e({target:n}){const t=n.closest("li");if(!t)return;const i=window.data.apiDrinks.find(n=>n.idDrink===t.dataset.id);window.data.currentDrink=i}function r(){return`\n  ${a()}\n  ${s(e)}\n  ${d()}\n  `}function a(){return`\n    <div class="talk-zone">\n      <input\n        class="talk-zone__request"\n        type="text"\n        placeholder="Bro, what is ...?"\n        value="${window.data.inputDrinkName}"\n        onchange="window.data.inputDrinkName = this.value; fetchAndRender(this.value)"\n      />\n      <button\n        class="talk-zone__request-random"\n        type="button"\n        onclick="fetchAndRender(); window.data.inputDrinkName=''"\n        >Bro, give me anything that burns!!!</button>\n    </div>    \n  `}function s(n){let t="";const i=window.data.apiDrinks;return i&&i.length>1&&(t=i.map(({strDrink:n,idDrink:t})=>`<li data-id=${t}>${n}</li>`).join("")),`\n    <ol id="list" class="chalk-brd__list" onclick="(${n})(event); renderApp();">\n      ${t}\n    </ol>   \n  `}function d(){let n="";const t=window.data.currentDrink;if(t){const i=Object.keys(t),e=i.filter(n=>/strIngredient/.test(n)).map(n=>t[n]).filter(n=>n),r=i.filter(n=>/strMeasure/.test(n)).map(n=>t[n]).slice(0,e.length).map(n=>null===n?"by eye":n);n=`\n  <h1 class="drink-descript__header">${t.strDrink}</h1>\n  <img\n    class="drink-descript__img"\n    src="${t.strDrinkThumb}/preview"\n    alt="drink-img"\n  />\n  <div class="ingredients">\n  <ul class="ingredients__list-name">\n    ${e.map(n=>`<li class="ingredients__item">${n}</li>`).join("")}\n    \n  </ul>\n  <ul class="ingredients__list-qty">\n    ${r.map(n=>`<li class="ingredients__item">${n}</li>`).join("")}\n  </ul>\n  \n</div>\n<p class="drink-descript__receipt">${t.strInstructions}</p>\n  `}return`\n  <div class="drink-descript__wrapper">\n    ${n}\n  </div>  \n  `}module.hot&&module.hot.accept(),window.data={inputDrinkName:"",apiDrinks:null,currentDrink:null},window.renderApp=n,n(),window.fetchAndRender=t;
},{}]},{},["Focm"], null)
//# sourceMappingURL=BartenderBro.c0006f0d.js.map