!function(){"use strict";var t="undefined"==typeof global?self:global;if("function"!=typeof t.require){var e={},n={},r={},a={}.hasOwnProperty,u=/^\.\.?(\/|$)/,i=function(t,e){for(var n,r=[],a=(u.test(e)?t+"/"+e:e).split("/"),i=0,o=a.length;i<o;i++)n=a[i],".."===n?r.pop():"."!==n&&""!==n&&r.push(n);return r.join("/")},o=function(t){return t.split("/").slice(0,-1).join("/")},l=function(e){return function(n){var r=i(o(e),n);return t.require(r,e)}},s=function(t,e){var r=p&&p.createHot(t),a={id:t,exports:{},hot:r};return n[t]=a,e(a.exports,l(t),a),a.exports},c=function(t){return r[t]?c(r[t]):t},d=function(t,e){return c(i(o(t),e))},f=function(t,r){null==r&&(r="/");var u=c(t);if(a.call(n,u))return n[u].exports;if(a.call(e,u))return s(u,e[u]);throw new Error("Cannot find module '"+t+"' from '"+r+"'")};f.alias=function(t,e){r[e]=t};var v=/\.[^.\/]+$/,m=/\/index(\.[^\/]+)?$/,g=function(t){if(v.test(t)){var e=t.replace(v,"");a.call(r,e)&&r[e].replace(v,"")!==e+"/index"||(r[e]=t)}if(m.test(t)){var n=t.replace(m,"");a.call(r,n)||(r[n]=t)}};f.register=f.define=function(t,r){if(t&&"object"==typeof t)for(var u in t)a.call(t,u)&&f.register(u,t[u]);else e[t]=r,delete n[t],g(t)},f.list=function(){var t=[];for(var n in e)a.call(e,n)&&t.push(n);return t};var p=t._hmr&&new t._hmr(d,f,e,n);f._cache=n,f.hmr=p&&p.wrap,f.brunch=!0,t.require=f}}(),function(){"undefined"==typeof window?this:window;require.register("components/button.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0});var a=e("mithril"),u=r(a),i=function(){return{view:function(t){var e=t.attrs,n=e.classList,r=e.action,a=e.label;return(0,u["default"])("button.btn."+n,{onclick:r},a)}}};t["default"]=i}),require.register("components/canvas.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0});var a=e("mithril"),u=r(a),i=function(){return{oncreate:function(t){var e=t.dom,n=t.attrs,r=n.ctx,a=(n.mdl,e.getContext("2d"));r&&a.putImageData(r,0,0)},view:function(t){var e=t.attrs,n=e.classList,r=e.id;return(0,u["default"])("canvas."+n,{id:r})}}};t["default"]=i}),require.register("components/navbar.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0});var a=e("mithril"),u=r(a),i=e("./button.js"),o=r(i),l=e("../model"),s=function(){return{view:function(t){var e=t.attrs.mdl;return(0,u["default"])("nav.navbar","/easel"==u["default"].route.get()?e.artworks.map(l.isEmpty)&&(0,u["default"])(o["default"],{mdl:e,classList:"navBtn",action:function(){e.preventUpdate(!1),u["default"].route.set("/print")},label:"View Gallery"}):(0,u["default"])(o["default"],{mdl:e,classList:"navBtn",action:function(){e.preventUpdate(!0),u["default"].route.set("/easel")},label:"Commision New Painting"}))}}};t["default"]=s}),require.register("components/toolbar.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0});var a=e("mithril"),u=r(a),i=e("./button.js"),o=r(i),l=function(){return{view:function(t){var e=t.attrs.mdl;return(0,u["default"])("aside.navbar",(0,u["default"])(o["default"],{mdl:e,classList:"toolBtn",action:function(){e.preventUpdate(!0),u["default"].route.set("/easel")},label:"New Painting"}),(0,u["default"])(o["default"],{mdl:e,classList:"toolBtn",action:function(){e.preventUpdate(!1),e.orientation.includes("portrait")?e.orientation="animated.rollAround.landscape":e.orientation="animated.rollAround.portrait"},label:e.orientation.includes("portrait")?"landscape":"portrait"}))}}},s=function(){return{view:function(t){var e=t.attrs.mdl;return(0,u["default"])("aside.navbar",null!==e.canvas()&&[(0,u["default"])(o["default"],{mdl:e,classList:"toolBtn",action:function(t){t.redraw=!1;var n=document.createElement("a");n.href=e.dom().toDataURL("image/png"),n.download="image_name.jpg",n.style.display="none",document.body.appendChild(n),n.click(),n.remove()},download:""+e.canvas(),label:"Download"})])}}},c=function(){return{view:function(t){var e=t.attrs.mdl;return"/easel"==u["default"].route.get()?(0,u["default"])(l,{mdl:e}):(0,u["default"])(s,{mdl:e})}}};t["default"]=c}),require.register("initialize.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var a=e("mithril"),u=r(a),i=e("./model.js"),o=r(i),l=e("./components/navbar"),s=r(l),c=e("./components/toolbar"),d=r(c),f=e("./pages/easel.js"),v=r(f),m=e("./pages/gallery.js"),g=r(m),p=function(){return{view:function(t){var e=t.children;return(0,u["default"])("section.main",e)}}},h=function(){return{view:function(t){var e=t.children,n=t.attrs.mdl;return(0,u["default"])(".app",[(0,u["default"])(s["default"],{mdl:n}),(0,u["default"])(p,{mdl:n},e),(0,u["default"])(d["default"],{mdl:n})])}}},_=function(t){return{"/easel":{render:function(){return(0,u["default"])(h,{mdl:t},(0,u["default"])(v["default"],{mdl:t,key:Date.now()}))}},"/gallery":{onmatch:function(){if(0==t.artworks().length)return u["default"].route.set("/easel")},render:function(){return(0,u["default"])(h,{mdl:t},(0,u["default"])(g["default"],{mdl:t}))}}}};document.addEventListener("DOMContentLoaded",function(){var t=document.body;u["default"].route(t,"/gallery",_(o["default"]))})}),require.register("model.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function a(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function u(t){return Array.isArray(t)?t:Array.from(t)}Object.defineProperty(t,"__esModule",{value:!0}),t.isEmpty=t.range=t.getHue=t.getHeight=t.getWidth=t.getRotation=t.getPosition=t.rest=t.last=t.log=void 0;var i=e("mithril-stream"),o=r(i),l=((0,o["default"])(600),(0,o["default"])(600),t.log=function(t){return function(e){return console.log(t,e),e}}),s=function(t,e){return Math.floor(Math.random()*(e-t)+t)},c=(t.last=function(t){return t[t.length-1]},t.rest=function v(t){var e=u(t),v=(e[0],e.slice(1));return v},t.getPosition=function(t){return{x:s(0,t.width()),y:s(0,t.height())}},t.getRotation=function(){return s(0,360)},t.getWidth=function(t){return s(0,t.width())},t.getHeight=function(t){return s(0,t.height())},t.getHue=function(){return s(0,999)},t.range=function(t){return[].concat(a(Array(t).keys()))},t.isEmpty=function(t){return 0==t.length},function(t,e){var n={id:t.artworks().length,art:e};t.artworks.map(function(t){return t.push(n)})}),d=["circle","square","triangle"],f={count:(0,o["default"])(s(30,70)),preventUpdate:(0,o["default"])(!0),shapes:d,width:(0,o["default"])(600),height:(0,o["default"])(600),artworks:(0,o["default"])([]),canvas:(0,o["default"])(null),ctx:(0,o["default"])(null),dom:(0,o["default"])(null),saveArt:c,log:l,orientation:"portrait"};t["default"]=f}),require.register("pages/easel.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0});var a=e("mithril"),u=r(a),i=e("../components/canvas.js"),o=r(i),l=e("../paint.js"),s=r(l),c=function(){return{oninit:function(t){var e=t.attrs.mdl;if(e.preventUpdate()){var n=document.createElement("canvas"),r=n.getContext("2d");r.imageSmoothingQuality="high",r.filter="brightness(0.8)",r.scale(.8,.8),(0,s["default"])({ctx:r,mdl:e});var a=r.getImageData(0,0,e.width(),e.height());e.canvas(a),e.ctx(r),e.dom(n),e.saveArt(e,a)}},view:function(t){var e=t.attrs.mdl;return(0,u["default"])(".easel",(0,u["default"])(o["default"],{id:"canvas",mdl:e,classList:e.orientation,ctx:e.canvas()}))}}};t["default"]=c}),require.register("pages/gallery.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0});var a=e("mithril"),u=r(a),i=e("../components/canvas"),o=r(i),l=e("../components/button"),s=r(l),c=function(t){t.attrs.close;return{view:function(t){var e=t.children,n=t.attrs.close;return(0,u["default"])(".modalBackground",{onclick:function(){return n()}},(0,u["default"])(".modal",e))}}},d=function(t){var e=t.attrs.mdl;return e.canvas(null)},f=function(){return{show:!1,close:function(t){return t.show=!t.show},oninit:d,view:function(t){var e=t.state,n=t.attrs.mdl;return[(0,u["default"])(".gallery",n.artworks().map(function(t){var r=t.art;return(0,u["default"])(s["default"],{classList:"paintBtn",action:function(t){var r=t.target,a=r.getContext("2d");a.filter="brightness(1)";var u=a.getImageData(0,0,n.width(),n.height());n.canvas(u),n.dom(r),e.close(e)},label:(0,u["default"])(o["default"],{mdl:n,ctx:r,classList:"canvas"})})})),e.show&&(0,u["default"])(c,{close:function(){d({attrs:{mdl:n}}),e.close(e)}},(0,u["default"])(o["default"],{ctx:n.canvas(),classList:"canvas"}))]}}};t["default"]=f}),require.register("paint.js",function(t,e,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=e("./model"),a=function(t,e,n,r){return"hsla("+t+", "+e+", "+n+", "+r+")"},u=function(t,e,n,r,u,i){var o=a(i,"60%","50%",.75);t.save(),t.fillStyle=o,t.translate(e.x,e.y),t.rotate(n),t.fillRect(-r/2,-u/2,r,u),t.restore()},i=function(t,e,n,r,u,i){var o=a(i,"60%","50%",.75);t.save(),t.fillStyle=o,t.translate(e.x,e.y),t.rotate(n),t.beginPath(),t.moveTo(r,0),t.lineTo(0,-r/4),t.lineTo(0,r/4),t.closePath(),t.fill(),t.restore()},o=function(t,e){return function(n){return"triangle"==n?i(t,(0,r.getPosition)(e),(0,r.getRotation)(),(0,r.getWidth)(e),(0,r.getHeight)(e),(0,r.getHue)()):"square"==n?u(t,(0,r.getPosition)(e),(0,r.getRotation)(),(0,r.getWidth)(e),(0,r.getHeight)(e),(0,r.getHue)()):void 0}},l=function(t){return t.shapes[Math.floor(Math.random()*t.shapes.length)]},s=function(t){var e=t.ctx,n=t.mdl;return(0,r.range)(n.count()).map(function(t){return l(n)}).map(o(e,n))};t["default"]=s}),require.register("___globals___",function(t,e,n){})}(),require("___globals___");