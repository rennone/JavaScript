var url = require("url")
var exec = require("child_process").exec;
var querystring = require("querystring"),
fs = require("fs"),
$ = require('jquery');
jsdom = require('jsdom'),
domToHtml = require('./node_modules/jsdom/lib/jsdom/browser/domtohtml');
var jquery_js = 'https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js';

formidable = require("formidable");
var state1 = "target1";
var state2 = "target2";
var state3 = "target3";

function sample(){
    
}

function battle(response, request) {
    console.log("Request handler 'battle' was called.");
    fs.readFile('battle.html', function(err, content){
	if(err){ throw err;}
	var document = jsdom.jsdom(content);
	console.log(document);
	console.log(typeof(document));
	var window = document.createWindow();
	response.writeHead(200, {"Content-Type":"text/html"});
	response.end(domToHtml.domToHtml(document,true));
    });
}

function click(response, request){
    console.log("click");
}

exports.battle = battle;
exports.click = click;
