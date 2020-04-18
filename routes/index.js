var express = require('express');
var router = express.Router();
var moment = require('moment');
var fs = require("fs");
var Request = require('nodegrass');
var constants = require('../util/constant');
var NativeRequest = require('request');
var utils = require('../util/utils');

router.get('/', function (req, res) {
    res.redirect('/index');
});

router.get('/index', function (req, res) {
   res.render('index/show');
});

router.get('/more/:page', function (req, res) {
    res.render('more/' + req.params.page);
});

router.put('/html/:type', function (req, res) {
    var data = {
        key: req.params.type,
        value: req.body.text,
        status: 1,
        token: req.session.user.token
    };

    NativeRequest.put({
        url: constants.url.UPDATE_CONFIG,
        headers: {'Content-Type': "application/json;charset=UTF-8"},
        body: JSON.stringify(data)
    }, function(err, response) {
        if (response && response.statusCode == 200) {
            utils.jsonWriteObject(res, '操作成功')
        } else {
            utils.jsonWriteError(res, '操作失败')
        }
    });
});

router.get('/html/:type', function (req, res) {
    var pageType = req.params.type;
    Request.get(constants.url.GET_CONFIGS + '?token=' + req.session.user.token, function(response, statusCode, headers) {
        if (statusCode != 200) {
            utils.jsonWriteError(res, '操作失败')
        } else {
            var data = JSON.parse(response).body;

            var configs = data.config;
            var text = '';
            for (var index = 0; index < configs.length; index ++) {
                var config = configs[index];
                if (config.key == pageType) {
                    text = config.value;
                    break;
                }
            }
            utils.jsonWriteObject(res, text)
        }
    });
});

router.get('/product', function (req, res) {
    var data = {}
    Request.get(constants.url.GET_CONFIGS + '?token=' + req.session.user.token, function(response, statusCode, headers) {
        if (statusCode != 200) {
            res.render('more/product', {
                product: null
            });
        } else {
            var data = JSON.parse(response).body;

            var configs = data.config;
            var text = '';
            for (var index = 0; index < configs.length; index ++) {
                var config = configs[index];
                if (config.key == 'product') {
                    text = config.value;
                    break;
                }
            }
            res.render('more/product', {
                product: text
            });
        }
    });

});

module.exports = router;
