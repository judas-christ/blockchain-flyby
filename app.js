!function(){"use strict";var e="undefined"==typeof global?self:global;if("function"!=typeof e.require){var n={},t={},r={},o={}.hasOwnProperty,i=/^\.\.?(\/|$)/,u=function(e,n){for(var t,r=[],o=(i.test(n)?e+"/"+n:n).split("/"),u=0,a=o.length;u<a;u++)t=o[u],".."===t?r.pop():"."!==t&&""!==t&&r.push(t);return r.join("/")},a=function(e){return e.split("/").slice(0,-1).join("/")},f=function(n){return function(t){var r=u(a(n),t);return e.require(r,n)}},l=function(e,n){var r=w&&w.createHot(e),o={id:e,exports:{},hot:r};return t[e]=o,n(o.exports,f(e),o),o.exports},c=function(e){return r[e]?c(r[e]):e},s=function(e,n){return c(u(a(e),n))},d=function(e,r){null==r&&(r="/");var i=c(e);if(o.call(t,i))return t[i].exports;if(o.call(n,i))return l(i,n[i]);throw new Error("Cannot find module '"+e+"' from '"+r+"'")};d.alias=function(e,n){r[n]=e};var p=/\.[^.\/]+$/,v=/\/index(\.[^\/]+)?$/,h=function(e){if(p.test(e)){var n=e.replace(p,"");o.call(r,n)&&r[n].replace(p,"")!==n+"/index"||(r[n]=e)}if(v.test(e)){var t=e.replace(v,"");o.call(r,t)||(r[t]=e)}};d.register=d.define=function(e,r){if(e&&"object"==typeof e)for(var i in e)o.call(e,i)&&d.register(i,e[i]);else n[e]=r,delete t[e],h(e)},d.list=function(){var e=[];for(var t in n)o.call(n,t)&&e.push(t);return e};var w=e._hmr&&new e._hmr(s,d,n,t);d._cache=t,d.hmr=w&&w.wrap,d.brunch=!0,e.require=d}}(),function(){"undefined"==typeof window?this:window;require.register("app.js",function(e,n,t){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t]);return n["default"]=e,n}function i(e){if(Array.isArray(e)){for(var n=0,t=Array(e.length);n<e.length;n++)t[n]=e[n];return t}return Array.from(e)}function u(e){requestAnimationFrame(u);var n=C.position.z;R*=F,C.position.setZ(R*j+n),k.render(A,C)}function a(e){return 6*parseInt(e,16)}function f(e){var n=C.position.z;C.position.setZ(e.deltaY*j+n)}function l(e){console.log(e),B=e.touches[0].screenY}function c(e){var n=e.touches[e.touches.length-1].screenY;if("number"==typeof B){var t=B-n;R+=t/2}return B=n,e.preventDefault(),e.stopPropagation(),!1}var s=n("three"),d=o(s),p=n("./lib/interpolate-lines"),v=r(p),h=n("./lib/get-json"),w=(r(h),n("./lib/get-data")),_=r(w),m="816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7",g=m.length,b=m.split("").map(function(){return 0}),y=1e3,j=1,M=300,P=window.devicePixelRatio||1,q=window.innerWidth*P,O=window.innerHeight*P,x=-q/2,E=q/g,L=y/2,A=new d.Scene;A.background=new d.Color(255,255,255),A.fog=new d.Fog(16777215,10,1e3);var C=new d.PerspectiveCamera(75,q/O,.1,y),k=new d.WebGLRenderer;k.setSize(q,O),k.domElement.style.width="",k.domElement.style.height="",document.body.appendChild(k.domElement),C.position.y=250,C.position.z=M,C.lookAt(new d.Vector3(0,0,(-100))),k.render(A,C);var z=0;(0,_["default"])().then(function(e){return e.map(function(e){return e.hash})}).then(function(e){return e.map(function(e){return e.split("").map(a)})}).then(function(e){return[b,b].concat(i(e),[b,b])}).then(function(e){return(0,v["default"])(e,x,E,L)}).then(function(e){e.forEach(function(e){return A.add(e)})}).then(function(){z=performance.now(),u()});var B=void 0,R=0,F=.9;window.addEventListener("wheel",f),document.addEventListener("touchstart",l),window.addEventListener("touchmove",c)}),require.register("lib/get-data.js",function(e,n,t){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=function(){return(0,i["default"])("http://130.211.7.182/blocks")["catch"](function(){return(0,i["default"])("/fake-data.json")})};var o=n("./get-json"),i=r(o)}),require.register("lib/get-json.js",function(e,n,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=function(e){return new Promise(function(n){function t(){var e=this.responseText,t=JSON.parse(e);n(t)}var r=new XMLHttpRequest;r.onload=t,r.open("GET",e),r.send()})}}),require.register("lib/interpolate-lines.js",function(e,n,t){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t]);return n["default"]=e,n}function i(e,n,t){var r=u(t);return e*(1-r)+n*r}function u(e){return e<.5?2*e*e:-1+(4-2*e)*e}function a(e,n,t){for(var r=[],o=0;o<e.length;o++)r.push(i(e[o],n[o],t));return r}Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=function(e,n,t,r){for(var o=[e[0]],i=1;i<e.length;i++){for(var u=e[i-1],f=e[i],l=1;l<s-1;l++){var d=a(u,f,l/s);o.push(d)}o.push(f)}return o.map(function(e,o){return(0,c["default"])(e,n,t,r/s,o,o%(s-1)!==0)})};var f=n("three"),l=(o(f),n("./line-from-points")),c=r(l),s=50}),require.register("lib/line-from-points.js",function(e,n,t){"use strict";function r(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t]);return n["default"]=e,n}Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=function(e,n,t,r,o,f){var l=new i.CatmullRomCurve3(e.map(function(e,u){return new i.Vector3(n+u*t,e,-r*o)})),c=l.getPoints(400),s=(new i.BufferGeometry).setFromPoints(c),d=new i.LineBasicMaterial(f?a:u),p=new i.Line(s,d);return p};var o=n("three"),i=r(o),u=new i.LineBasicMaterial({color:0}),a=new i.LineBasicMaterial({color:16746700})}),require.alias("buffer/index.js","buffer"),require.register("___globals___",function(e,n,t){})}(),require("___globals___");