!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=7)}([function(e,t){!function(){e.exports=this.wp.i18n}()},function(e,t){!function(){e.exports=this.wp.element}()},function(e,t){!function(){e.exports=this.wp.components}()},function(e,t){e.exports=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},function(e,t){!function(){e.exports=this.wp.blockEditor}()},function(e,t){!function(){e.exports=this.wp.blocks}()},function(e,t,n){var r;
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var n={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var c=typeof r;if("string"===c||"number"===c)e.push(r);else if(Array.isArray(r)&&r.length){var l=o.apply(null,r);l&&e.push(l)}else if("object"===c)for(var i in r)n.call(r,i)&&r[i]&&e.push(i)}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(r=function(){return o}.apply(t,[]))||(e.exports=r)}()},function(e,t,n){"use strict";n.r(t);var r=n(0),o=n(5),c=n(3),l=n.n(c),i=n(1),u=n(6),a=n.n(u),s=n(4),f=n(2),b=function(e){var t=e.attributes,n=e.setAttributes,o=t.username,c=t.via,u=t.url,a=t.urlcustom,b=t.nofollow,p=t.prompt,O=function(e,t){n(l()({},e,t))};return Object(i.createElement)(s.InspectorControls,null,Object(i.createElement)(f.PanelBody,{title:Object(r.__)("General")},Object(i.createElement)(f.TextControl,{label:Object(r.__)("Twitter Username"),value:o,onChange:function(e){return O("username",e)}}),Object(i.createElement)(f.ToggleControl,{label:Object(r.__)("Include the username in Tweet?"),checked:c,onChange:function(e){return O("via",e)}}),Object(i.createElement)(f.TextControl,{label:Object(r.__)("Prompt"),value:p,onChange:function(e){return O("prompt",e)},help:Object(r.__)("Text for action/prompt link")})),Object(i.createElement)(f.PanelBody,{title:Object(r.__)("URL"),initialOpen:!1},Object(i.createElement)(f.ToggleControl,{label:Object(r.__)("Include URL in tweet?"),checked:u,onChange:function(e){return O("url",e)}}),Object(i.createElement)(f.TextControl,{label:Object(r.__)("Custom URL"),value:a,onChange:function(e){return O("urlcustom",e)},help:Object(r.__)("Custom URL to use instead of post")}),Object(i.createElement)(f.ToggleControl,{label:Object(r.__)("Nofollow"),checked:b,onChange:function(e){return O("nofollow",e)},help:Object(r.__)("Make links nofollow")})))};function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var O=function(e){var t=e.attributes,n=e.setAttributes,o=e.className,c=t.tweet,u=t.prompt,f=wp.data.select("core/editor").getEditedPostAttribute("title");c||n({tweet:f});return Object(i.createElement)(i.Fragment,null,Object(i.createElement)(b,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(Object(n),!0).forEach((function(t){l()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e)),Object(i.createElement)("span",{className:a()(o,"bctt-click-to-tweet")},Object(i.createElement)("span",{className:"bctt-ctt-text"},Object(i.createElement)(s.RichText,{format:"string",allowedFormats:[],tagName:"div",placeholder:Object(r.__)("Enter text for readers to Tweet"),onChange:function(e){n({tweet:e})},value:c})),Object(i.createElement)("a",{href:"#",onClick:function(){return!1},className:"bctt-ctt-btn"},u)))},j=function(){return null};t.default=Object(o.registerBlockType)("bctt/clicktotweet",{title:Object(r.__)("Better Click to Tweet"),description:Object(r.__)("Add text for your readers to tweet, calling them to action on your behalf."),category:"widgets",icon:"twitter",keywords:[Object(r.__)("Twitter"),Object(r.__)("Tweet")],supports:{align:!1,alignWide:!1},edit:O,save:j})}]);