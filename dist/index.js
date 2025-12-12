"use strict";
const greeting = "\u041f\u0440\u0438\u0432\u0456\u0442, TypeScript!";
const year = 2025;
const isLearning = true;
function showMessage(message, year, learning) {
    console.log(`${message} \u0420\u0456\u043a: ${year}. \u041d\u0430\u0432\u0447\u0430\u043d\u043d\u044f \u0442\u0440\u0438\u0432\u0430\u0454: ${learning}`);
}
showMessage(greeting, year, isLearning);
