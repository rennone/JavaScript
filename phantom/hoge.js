// Headless ブラウザの生成
var page = require('webpage').create();
var address = 'http://accounts.google.com/ServiceLogin?service=mail&passive=true&rm=false&continue=https://mail.google.com/mail/&ss=1&scc=1&ltmpl=default&ltmplcache=2&hl=ja&emr=1';
var fs = require('fs');

page.onInitialized = function(){
    page.evaluate(function(){
	document.addEventListener('DOMContentLoaded',function(){
	    window.callPhantom('DOMContentLoaded');
	},false);
    });
};

var funcs = function(funcs){
    this.funcs = funcs;
    this.init();
};

funcs.prototype = {
    init: function(){
	var self = this;
	page.onCallback = function(data){
	    if(data ==='DOMContentLoaded')
		self.next();
	}
    },
    next: function(){
	var func = this.funcs.shift();
	if(func !== undefined){
	    func();
	} else{
	    page.onCallback = function(){
		console.log("no method error");
	    };
	}
    }
};

new funcs([
    function(){
	console.log('ログイン処理');
	page.open(address);	
    },
    function(){
	page.evaluate(function(){
	    var mailAddress =
	    var passWord = 
	    document.getElementById('Email').value = mailAddress
	    document.getElementById('Passwd').value= passWord;
	    //var sub = document.getElementById('signIn'); // 次ページ
	    var login = document.getElementById('signIn');
	    login.form.submit();
	});	
    },
    function(){
	console.log('ログイン');
	var html = page.evaluate( function(){
	    return document.getElementsByTagName('html')[0].innerHTML;
	});
	
	fs.write('mypage.html', html, 'w');
	console.log("get your page in HTML")
	phantom.exit();	
    }
]).next();
