var constant  = {};

constant.notNeedSessionList = [
    '/user/login'
];

constant.ROOT_SERVER = 'http://127.0.0.1:3000';

constant.SERVER_TOKEN = 'woingi929k48fj2372he8dn289kmoi3',
constant.url = {
    USER_LIST : constant.ROOT_SERVER + '/api/v1.1/users',
    USER : constant.ROOT_SERVER + '/api/v1.1/user',
    UPDATE_USER_RECOMMEND : constant.ROOT_SERVER + '/api/v1.1/user/introducer',
    USER_LOGIN : constant.ROOT_SERVER + '/api/v1.1/admin/login',
    UPDATE_CONFIG : constant.ROOT_SERVER + '/api/v1.1/admin/system/config',
    GET_CONFIGS : constant.ROOT_SERVER + '/api/v1.1/admin/system/configs',
    GET_FEEDBACKS : constant.ROOT_SERVER + '/api/v1.1/feedbacks',
    USER_APPLY_STATISTICS : constant.ROOT_SERVER + '/api/v1.1/user/apply/statistics',
    ORDERS : constant.ROOT_SERVER + '/api/v1.1/admin/orders',
    ORDER : constant.ROOT_SERVER + '/api/v1.1/admin/order',
    LOCK_ORDERS : constant.ROOT_SERVER + '/api/v1.1/admin/lock/orders',
    UN_LOCK_ORDER : constant.ROOT_SERVER + '/api/v1.1/admin/unlock/order',
    FEED_BACKS : constant.ROOT_SERVER + '/api/v1.1/feedbacks',
    FEED_BACK : constant.ROOT_SERVER + '/api/v1.1/feedback',
    JOB_LIST : constant.ROOT_SERVER + '/api/v1.1/jobs',
    JOB : constant.ROOT_SERVER + '/api/v1.1/job',
    JOB_APPLY_STATISTICS : constant.ROOT_SERVER + '/api/v1.1/job/apply/statistics',
    JOB_PROCESS_STATISTICS : constant.ROOT_SERVER + '/api/v1.1/job/process/statistics',
    WORK_SUBJECTS : constant.ROOT_SERVER + '/api/v1.1/work/subjects',
    WORK_SUBJECT : constant.ROOT_SERVER + '/api/v1.1/work/subject',
    WORK_SUBJECT_ORDER : constant.ROOT_SERVER + '/api/v1.1/work/subject/order',
    COMPANIES : constant.ROOT_SERVER + '/api/v1.1/companies',
    COMPANY : constant.ROOT_SERVER + '/api/v1.1/company',
    COMPANY_ORDER : constant.ROOT_SERVER + '/api/v1.1/company/order',
    ABOUT_US_PEOPLE : constant.ROOT_SERVER + '/api/v1.1/aboutus/persons',
    WORK_POSTS : constant.ROOT_SERVER + '/api/v1.1/work/posts',
    WORK_POST : constant.ROOT_SERVER + '/api/v1.1/work/post',
    WORK_POST_ORDER : constant.ROOT_SERVER + '/api/v1.1/work/post/order',
    WITH_DRAWS : constant.ROOT_SERVER + '/api/v1.1/admin/withdraws',
    WITH_DRAW : constant.ROOT_SERVER + '/api/v1.1/admin/withdraw',
    PROFITS : constant.ROOT_SERVER + '/api/v1.1/admin/profits',
    BASE_USER_INFO : constant.ROOT_SERVER + '/api/v1.1/user/base/info',
    CREATE_BASE_USER: constant.ROOT_SERVER + '/api/v1.1/baseCode',
    OPERATOR_LIST : constant.ROOT_SERVER + '/api/v1.1/admin/operators',
    OPERATOR : constant.ROOT_SERVER + '/api/v1.1/admin/operator'
};

constant.authMenu = [
    {'code': 'khgl', 'name': '客户管理', 'path': '/user/list'},
    {'code': 'ddgl', 'name': '订单管理', 'path': '/order/list'},
    {'code': 'txgl', 'name': '提现管理', 'path': '/withdraw/list'},
    {'code': 'dylrtj', 'name': '当月利润统计', 'path': '/order/statistics'},
    {'code': 'xtgl_zmgl', 'name': '系统管理-总码管理', 'path': '/user/base/info'},
    {'code': 'xtgl_czygl', 'name': '系统管理-操作员管理', 'path': '/user/operator/list'},
    {'code': 'gyjm', 'name': '关于加盟', 'path': '/more/join_us'}
];

constant.authPathList = [
    '/user/list',
    '/order/list',
    '/withdraw/list',
    '/order/statistics',
    '/user/base/info',
    '/user/operator/list',
    '/more/join_us'
];



module.exports = constant;