/**
 * Created by qoder on 16-1-3.
 */
window.onload = function () {
    //封装获取DOM函数
    var g = function (id) {
        //if (/^#/.test(id)){
        return document.getElementById(id);
        //}else{
        //    console.log(id+'输入有误');
        //}
    }

    var show = function (node) {
        node.style.display = 'block'
    }

    var hide = function (node) {
        node.style.display = 'none'
    }
    var contentTab = function (onNode, showNode, hideNode) {
        onNode.style.color = '#e8e8e8';
        show(showNode);
        hide(hideNode)
    }

    g('login_tit').onclick = function () {
        contentTab(this, g('login_content'), g('signup_content'));
        g('signup_tit').style.borderBottom = 'none';
    }

    g('signup_tit').onclick = function () {
        contentTab(this, g('signup_content'), g('login_content'));
        g('login_tit').style.color = '#FFF';
    }

    g('login_signup_btn').onclick = function () {
        show(g('mask'));
        show(g('login_signup'));
    }

    g('mask').onclick = function () {
        hide(this);
        hide(g('login_signup'));
    }


    //校验登录注册用户等格式
    var pattern = {
        users: {
            username: /[A-Za-z0-9_\-\u4e00-\u9fa5]+/,
            email: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
            tel: /0?(13|14|15|18)[0-9]{9}/,
            password: /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/
        }
    }

    var login_tab = document.getElementsByClassName('login_tab');
    var signup_tab = document.getElementsByClassName('signup_tab');
    var login_pattern = [];
    login_pattern.push(pattern.users.username);
    login_pattern.push(pattern.users.password);
    console.log(login_pattern);
    var signup_pattern = [];
    for (item in pattern.users) {
        signup_pattern.push(pattern['users'][item]);
    }
    var timer = null;
    var showErr = function (errTab, errPattern, btn) {
        for (var i = 0; i < errTab.length; i++) {
            (function () {
                var each = errTab[i];
                var index = i;
                each.onblur = function () {
                    var _this = this;
                    if (!errPattern[index].test(_this.value)) {
                        this.className += " input_err";
                        var errNode = document.createElement('span');
                        errNode.classList.add('login_err');
                        errNode.innerHTML = _this.getAttribute('mata') + '格式不合法';
                        this.parentNode.appendChild(errNode);
                        _this.onfocus = function () {
                            _this.className = "login_tab";
                            _this.parentNode.removeChild(errNode);
                        }
                    }
                }
            })();
        }
    }

    showErr(login_tab, login_pattern);
    showErr(signup_tab, signup_pattern);
    g('re_signup_password').onblur = function () {
        if (g('signup_password').value !== g('re_signup_password').value) {
            show(g('pass_differ'));
            this.value = "";
        }
    }
    g('re_signup_password').onfocus = function () {
        hide(g('pass_differ'));
    }

    //Array.prototype.push(singnup_pattern,login_pattern);

    //Ajax
    var Ajax = function (method, url, data, async) {  //async：true（异步）或 false（同步）
        var xmlhttp;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                console.log('haha');
            }
        }
        xmlhttp.open(method, url, async);
        xmlhttp.setRequestHeader("Content-type", "application/json");

        if (method === 'POST') {
            xmlhttp.send(data)
        } else {
            xmlhttp.send();
        }
    }


    g('login_btn').onclick = function () {
        var data = {};
        if (login_pattern[0].test(g('login_username').value) && login_pattern[1].test(g('login_password').value)) {
            data.username = login_username.value;
            data.password = md5(login_password.value);
            var senddata = JSON.stringify(data);
            Ajax('POST', '/users/login', senddata);
            hide(g('mask'));
            hide(g('login_signup'));
            //window.location.pathname='/'
        } else {
            alert('登陆失败');
        }
        console.log(senddata);
    }


    g('signup_btn').onclick = function () {
        var data = {};
        if (signup_pattern[0].test(g('signup_username').value) && signup_pattern[1].test(g('signup_email').value)
            && signup_pattern[2].test(g('signup_tel').value) && signup_pattern[3].test(g('signup_password').value) &&
            g('signup_password').value == g('re_signup_password').value) {
            data.username = signup_username.value;
            data.email = signup_email.value;
            data.tel = signup_tel.value;
            data.password = md5(signup_password.value);
            var senddata = JSON.stringify(data);
            Ajax('POST', '/users/signup', senddata);
            hide(g('mask'));
            hide(g('login_signup'));
        } else {
            alert('注册失败');
        }
        console.log(senddata);
    }


//    显示隐藏个人信息
    g('my_message').onmousemove = function () {
        show(g('my_message_box'));
    }

    g('my_mess_wrapper').onmouseleave= function () {
        hide(g('my_message_box'))
    }

}