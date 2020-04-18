var constants = require('./constant');
var utils = {};
var fs = require("fs");
var https = require('https');
var iconv = require('iconv-lite');


utils.mathRand = function () {
    var num = "";
    for (var i = 0; i < 6; i++) {
        num += Math.floor(Math.random() * 10);
    }
    return num;
};

var isContainElement = function (arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
};

// 是否需要Session
utils.isNotNeedSession = function (url) {
    return isContainElement(constants.notNeedSessionList, url);
};

// 是否需要权限访问
utils.isNotNeedAuth = function (url) {
    return !isContainElement(constants.authPathList, url);
};

// 是否有权限访问页面
utils.isHasAuthAccess = function (authCodes, path) {
    authCodes = authCodes || [];
    var authCode = getCodeByPath(path);
    return isContainElement(authCodes, authCode);
};

function getCodeByPath(path) {
    var authMenu = constants.authMenu;
    for (var index in authMenu) {
        if (authMenu[index].path == path) {
            return authMenu[index].code;
        }
    }
}

// 64位编码
utils.base64_encode = function(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
};

// 输出状态
utils.jsonWriteObject = function (res, ret) {
    res.json({
        'success': true,
        'msg': ret
    });
};

utils.jsonWriteError = function (res, ret) {
    res.json({
        'success': false,
        'msg': ret
    });
};

utils.formatDate = function (date, fmt) {
    var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

module.exports = utils;
