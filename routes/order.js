var express = require('express');
var router = express.Router();
var Request = require('nodegrass');
var NativeRequest = require('request');
var constants = require('../util/constant');
var utils = require('../util/utils');

// 获取订单列表
router.get('/list', function(req, res) {
    var status = req.query.status;
    var url = '';
    var dataUrl = constants.url.ORDERS + '?token=' + req.session.user.token + '&status=' + status;
    if (status == '0') {
        url = 'wait_pay_list';
    } else if (status == '1') {
        url = 'wait_send_list';
    } else if (status == '2') {
        url = 'finished_list';
    } else if (status == '3') {
        url = 'wait_opr_list';
        dataUrl = constants.url.LOCK_ORDERS + '?token=' + req.session.user.token;
    }

    var data = {};
    Request.get(dataUrl, function(response, statusCode, headers) {
        if (statusCode == 200) {
            data = JSON.parse(response).body;
        }
        res.render('order/' + url, data);
    });
});

// 补单
router.put('/unlock', function(req, res) {
    var data = {
        aliPayOrderNum: req.body.aliPayOrderNum,
        phone: req.body.phone,
        token: req.session.user.token
    };

    NativeRequest.put({
        url: constants.url.UN_LOCK_ORDER,
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

// 发货
router.put('/send', function(req, res) {
    var data = {
        _id: req.body._id,
        status: 2,
        logisticsInfo: req.body.logisticsInfo,
        token: req.session.user.token
    };

    NativeRequest.put({
        url: constants.url.ORDER,
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

router.get('/statistics', function(req, res) {
    res.render('order/statistics');
});

router.get('/statistics/json', function(req, res) {
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth()+1;
    if (month < 10) {
        month = "0" + month;
    }
    var firstDay = month + "/" + "01/" + year;
    var data = {};
    Request.get(constants.url.PROFITS + '?token=' + req.session.user.token + '&startDate=' + firstDay, function(response, statusCode, headers) {
        if (statusCode == 200) {
            data = JSON.parse(response).body;
        }

        if (statusCode == 200) {
            utils.jsonWriteObject(res, JSON.parse(response).body)
        } else {
            utils.jsonWriteError(res, '获取统计失败')
        }
    });
});
module.exports = router;
