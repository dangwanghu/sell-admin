var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var utils = require('./util/utils')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false,limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 存储session
app.use(session({
    secret: 'shot',
    name: 'shotck',
    cookie: {maxAge: 7200000 },
    saveUninitialized:false,
    resave:false
}));

// 登录拦截
app.use(function (req, res, next) {
    var url = req.originalUrl;
    if(url.indexOf('?') != -1) {
        url = url.substring(0,url.indexOf('?'));
    }
    if (utils.isNotNeedSession(url) || req.session.user) {
        if (utils.isNotNeedAuth(url) || utils.isHasAuthAccess(req.session.user.auth, url)) {
            res.locals.session = req.session;
            next();
        } else {
            res.send('没有权限访问该页面');
        }
    } else {
        res.redirect('/user/login');
    }
});

// requestMaping
app.use('/', require('./routes/index'));// 首页
app.use('/user', require('./routes/user'));// 会员
app.use('/order', require('./routes/order'));// 小C百科
app.use('/withdraw', require('./routes/withdraw'));// 关于工作

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    err.message = '您访问的页面已被移到天王星上...';
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.error(err);
        res.status(err.status || 500);
        res.render('error', {
            message: '服务器内部错误.',
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

process.on('uncaughtException', function (err) {
    //打印出错误
    console.log(err);
    //打印出错误的调用栈方便调试
    console.log(err.stack);
});

app.set('port', process.env.PORT || 8888);

var server = app.listen(app.get('port'), function() {
    console.info('Express server listening on port ' + server.address().port);
});

module.exports = app;
