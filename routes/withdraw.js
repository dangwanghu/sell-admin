var express = require('express');
var router = express.Router();
var Request = require('nodegrass');
var NativeRequest = require('request');
var constants = require('../util/constant');
var utils = require('../util/utils');


router.get('/list', function(req, res) {
    var data = {};
    var status = req.query.status;
    var url = '';
    if (status == '0') {
        url = 'wait_handle';
    } else if (status == '1') {
        url = 'success';
    } else if (status == '2') {
        url = 'failed';
    }
    Request.get(constants.url.WITH_DRAWS + '?token=' + req.session.user.token + '&status=' + status, function(response, statusCode, headers) {
        if (statusCode == 200) {
            data = JSON.parse(response).body;
        }
        res.render('withdraw/' + url, data);
    });
});

// 更改状态
router.put('/status', function(req, res) {
    var data = {
        _id: req.body._id,
        status: req.body.status,
        remark: req.body.remark,
        token: req.session.user.token
    };

    NativeRequest.put({
        url: constants.url.WITH_DRAW,
        headers: {'Content-Type': "application/json;charset=UTF-8"},
        body: JSON.stringify(data)
    }, function(err, response) {
        if (response && response.statusCode == 200 && JSON.parse(response.body).statusCode == 200) {
            utils.jsonWriteObject(res, '操作成功')
        } else {
            utils.jsonWriteError(res, JSON.parse(response.body).message)
        }
    });
});

module.exports = router;
