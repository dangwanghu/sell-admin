
function setCache(key, value) {
    if (window.localStorage) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

function getCache(key) {
    if (window.localStorage) {
        if (localStorage.getItem(key)) {
            return JSON.parse(localStorage.getItem(key));
        }
        return [];

    }
}

function delCache(key) {
    if (window.localStorage) {
        localStorage.removeItem(key);
    }
}

function changeURLArg(url, arg, arg_val) {
    var pattern = arg + '=([^&]*)';
    var replaceText = arg + '=' + arg_val;
    if (url.match(pattern)) {
        var tmp = '/(' + arg + '=)([^&]*)/gi';
        tmp = url.replace(eval(tmp), replaceText);
        return tmp;
    } else {
        if (url.match('[\?]')) {
            return url + '&' + replaceText;
        } else {
            return url + '?' + replaceText;
        }
    }
    return url + '\n' + arg + '\n' + arg_val;
}

function showSuccessToast(msg) {
    $().toastmessage('showToast', {
        text: msg,
        position: 'middle-center',
        type: 'success'
        //sticky: true
    });
}

function showNoticeToast(msg) {
    $().toastmessage('showToast', {
        text: msg,
        position: 'middle-center',
        type: 'notice'
    });
}

function showWarningToast(msg) {
    $().toastmessage('showToast', {
        text: msg,
        position: 'middle-center',
        type: 'warning'
    });
}

function showErrorToast(msg) {
    $().toastmessage('showToast', {
        text: msg,
        position: 'middle-center',
        type: 'error'
    });
}

function loadData(formId, jsonStr){
    var obj = JSON.parse(jsonStr);
    var key,value,tagName,type,arr;
    for(x in obj){
        key = x;
        value = obj[x];

        $("#" + formId + " [name='"+key+"'],#" + formId + " [name='"+key+"[]']").each(function(){
            tagName = $(this)[0].tagName;
            type = $(this).attr('type');
            if(tagName=='INPUT'){
                if(type=='radio'){
                    $(this).attr('checked',$(this).val()==value);
                }else if(type=='checkbox'){
                    arr = value.split(',');
                    for(var i =0;i<arr.length;i++){
                        if($(this).val()==arr[i]){
                            $(this).attr('checked',true);
                            break;
                        }
                    }
                }else{
                    $(this).val(value);
                }
            }else if(tagName=='SELECT' || tagName=='TEXTAREA'){
                $(this).val(value);
            }

        });
    }
}

function saveSuccessHideDialog(msg) {
    $('.modal').modal('hide');
    $().toastmessage('showSuccessToast', msg);
    setTimeout(function() {
        window.location.href = window.location.href;
    }, 1000);
}