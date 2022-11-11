(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

// Import 3rd party libraries 
// ex: import "babel-polyfill";
// global namespace
window.theme = window.theme || {};
/**
 * page_type.functionName
 * Takes in a string and console logs input with text
 * 
 * @author <Mark Chang>
 * @param {string} page_type 
 */

theme.initScriptsExample = function (page_type) {
  console.log(page_type + " ready...");
};
/**
 * Wait for DOM 
 */


document.addEventListener("DOMContentLoaded", function () {
  // init
  theme.initScriptsExample("collection JS");
});

},{}]},{},[1])

