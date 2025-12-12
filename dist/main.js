"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initApp = initApp;
const modal_1 = require("./modules/modal");
const scrollButton_1 = require("./modules/scrollButton");
const posts_1 = require("./modules/posts");
function initApp() {
    (0, modal_1.initModal)();
    (0, scrollButton_1.initScrollButton)();
    (0, posts_1.loadPosts)();
}
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});
