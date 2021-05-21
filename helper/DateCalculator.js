"use strict";
exports.__esModule = true;
exports.dateIsWithinMonth = exports.dateIsWithinWeek = exports.dateIsTomorrow = exports.dateIsToday = void 0;
var dateIsToday = function (inputDate) {
    var today = new Date();
    return (inputDate.getDate() == today.getDate() &&
        inputDate.getMonth() == today.getMonth() &&
        inputDate.getFullYear() == today.getFullYear());
};
exports.dateIsToday = dateIsToday;
var dateIsTomorrow = function (inputDate) {
    var today = new Date();
    var date1UTC = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
    var date2UTC = Date.UTC(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
    var daysConverter = 1000 * 3600 * 24;
    return (date2UTC - date1UTC) / daysConverter === 1;
};
exports.dateIsTomorrow = dateIsTomorrow;
var dateIsWithinWeek = function (inputDate) {
    var today = new Date();
    var date1UTC = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
    var date2UTC = Date.UTC(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
    var daysConverter = 1000 * 3600 * 24;
    return ((date2UTC - date1UTC) / daysConverter <= 7 &&
        (date2UTC - date1UTC) / daysConverter >= 0);
};
exports.dateIsWithinWeek = dateIsWithinWeek;
var dateIsWithinMonth = function (inputDate) {
    var today = new Date();
    var date1UTC = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
    var date2UTC = Date.UTC(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
    var daysConverter = 1000 * 3600 * 24;
    return ((date2UTC - date1UTC) / daysConverter <= 30 &&
        (date2UTC - date1UTC) / daysConverter >= 0);
};
exports.dateIsWithinMonth = dateIsWithinMonth;
