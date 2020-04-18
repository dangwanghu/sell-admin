var express = require('express');
var router = express.Router();
var Request = require('nodegrass');
var constants = require('../util/constant');
var NativeRequest = require('request');
var utils = require('../util/utils');

// 登录跳转
router.get('/login', function(req, res) {
    res.render('user/login');
});

// 管理员登录
router.post('/login', function(req, res) {
    var data = {
        email: req.body.email,
        password: req.body.password
    };
    NativeRequest.post({
        url: constants.url.USER_LOGIN,
        headers: {'Content-Type': "application/json;charset=UTF-8"},
        body: JSON.stringify(data)
    }, function(err, response) {
        var retBody = response.body;
        if (retBody) {
            retBody = JSON.parse(retBody)
            if (retBody.statusCode == 200) {
                req.session.user = retBody.body;
                utils.jsonWriteObject(res, '登录成功');
            } else {
                utils.jsonWriteError(res, retBody.message);
            }
        } else {
            utils.jsonWriteError(res, '登录失败')
        }
    });
});

// 退出登录
router.get('/quit', function(req, res) {
    req.session.user = undefined;
    res.redirect('/index');
});

// 获取商户列表-未激活
router.get('/list', function(req, res) {
    var data = {};
    Request.get(constants.url.USER_LIST + '?status=0&token=' + req.session.user.token, function(response, statusCode, headers) {
        if (statusCode == 200) {
            data = JSON.parse(response).body;
        }
        res.render('user/list', data);
    });
});

// 获取商户列表-异步
router.get('/list/json', function(req, res) {
    Request.get(constants.url.USER_LIST + '?status=1&token=' + req.session.user.token, function(response, statusCode, headers) {
        if (statusCode == 200) {
            utils.jsonWriteObject(res, JSON.parse(response).body.result);
        } else {
            utils.jsonWriteError(res, '操作失败')
        }
    });
});

// 删除商户-禁用
router.delete('/', function(req, res) {
    var data = {
        _id: req.query._id,
        status: req.query.status,
        token: req.session.user.token
    };
    NativeRequest.del({
        url: constants.url.USER,
        body: JSON.stringify(data)
    }, function(err, response) {
        if (response && response.statusCode == 200) {
            utils.jsonWriteObject(res, '操作成功')
        } else {
            utils.jsonWriteError(res, '操作失败')
        }
    });
});

// 获取总商户
router.get('/base/info', function(req, res) {
    var data = {};
    Request.get(constants.url.BASE_USER_INFO + '?token=' + req.session.user.token, function(response, statusCode, headers) {
        if (statusCode == 200) {
            data = JSON.parse(response).body;
            if (!data) {
                data = {
                    qrCode: '1'
                }
            }
        }
        res.render('user/total_qrcode', data);
    });
});

// 生成总商户
router.post('/base', function(req, res) {
    var data = {
        token: req.session.user.token
    };
    NativeRequest.post({
        url: constants.url.CREATE_BASE_USER,
        headers: {'Content-Type': "application/json;charset=UTF-8"},
        body: JSON.stringify(data)
    }, function(err, response) {
        var retBody = response.body;
        if (retBody) {
            retBody = JSON.parse(response.body)
            if (retBody.statusCode == 200) {
                utils.jsonWriteObject(res, '操作成功');
            } else {
                utils.jsonWriteError(res, retBody.message)
            }
        } else {
            utils.jsonWriteError(res, '操作失败')
        }
    });
});

// 获取操作员列表
router.get('/operator/list', function(req, res) {
    var data = {
        auths : constants.authMenu
    };
    Request.get(constants.url.OPERATOR_LIST + '?token=' + req.session.user.token, function(response, statusCode, headers) {
        if (statusCode == 200) {
            data.list = JSON.parse(response).body.list;
        }
        res.render('user/operator_list', data);
    });
});

// 删除操作员-禁用
router.delete('/operator', function(req, res) {
    var data = {
        _id: req.query._id,
        status: req.query.status,
        token: req.session.user.token
    };
    NativeRequest.put({
        url: constants.url.OPERATOR,
        body: JSON.stringify(data)
    }, function(err, response) {
        if (response && response.statusCode == 200) {
            utils.jsonWriteObject(res, '操作成功')
        } else {
            utils.jsonWriteError(res, '操作失败')
        }
    });
});

function makeParam (req, param, auth) {
    if (req[param] && req[param] == 'on') {
        auth.push(param);
    }
}
// 修改操作员-权限
router.put('/operator', function(req, res) {
    var auth = [];
    makeParam(req.body, 'khgl', auth);
    makeParam(req.body, 'ddgl', auth);
    makeParam(req.body, 'txgl', auth);
    makeParam(req.body, 'dylrtj', auth);
    makeParam(req.body, 'xtgl_zmgl', auth);
    makeParam(req.body, 'xtgl_czygl', auth);
    makeParam(req.body, 'gyjm', auth);
    makeParam(req.body, 'spgl', auth);

    var data = {
        _id: req.body._id,
        auth: auth,
        token: req.session.user.token
    };
    NativeRequest.put({
        url: constants.url.OPERATOR,
        body: JSON.stringify(data)
    }, function(err, response) {
        if (response && response.statusCode == 200) {
            utils.jsonWriteObject(res, '操作成功')
        } else {
            utils.jsonWriteError(res, '操作失败')
        }
    });
});

router.post('/operator', function(req, res) {
    var auth = [];
    makeParam(req.body, 'khgl', auth);
    makeParam(req.body, 'ddgl', auth);
    makeParam(req.body, 'txgl', auth);
    makeParam(req.body, 'dylrtj', auth);
    makeParam(req.body, 'xtgl_zmgl', auth);
    makeParam(req.body, 'xtgl_czygl', auth);
    makeParam(req.body, 'gyjm', auth);
    makeParam(req.body, 'spgl', auth);

    var data = {
        realName: req.body.realName,
        email: req.body.email,
        password: req.body.password,
        auth: auth,
        token: req.session.user.token
    };
    NativeRequest.post({
        url: constants.url.OPERATOR,
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

module.exports = router;