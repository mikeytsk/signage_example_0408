var url='192.168.0.16';




































































































































































var port = "6953";
var socket = io.connect(url + ':' + port);
var localIP = "0.0.0.0";
var macAddr = "00:00:00:00:00:00";
var _position = "slave";
var _debugMode = false;

function updateDevices() {
}

var sendLog = function(ip, message) {
	socket.broadcast.emit('log', {
		name : ip,
		msg : message
	});
};

var callMessage = function(msg) {
	if ( typeof msg == 'object') {
		var cmd = {
			'api' : msg.api,
			'param' : msg.param,
			'selectedDevice' : selectedDevice
		};
	} else {
		var cmd = {
			'api' : msg,
			'selectedDevice' : selectedDevice
		};
	}

	try {
		console.log("==================================");
		console.log("selectedDevice > " + selectedDevice);
		console.log("==================================");
	} catch(e) {
		console.log("selectedDevice > not selected device!!!!");
	}

	writeMessage("callMessage [value api :" + cmd.api + "]");
	for (var i in cmd.param) {
		writeMessage("callMessage [value api >" + i + ":" + cmd.param[i] + "]");
	}

	console.log("send socket id>call [" + JSON.stringify(cmd) + "]");
	socket.emit('call', cmd);
};

var callbackMessage = function(executeMethod, returnResult) {
	if (socket == null) {
		writeMessage("not connect!");
		return;
	}
	socket.emit('callback', {
		ip : localIP,
		mac : macAddr,
		api : executeMethod,
		result : returnResult
	});
};

var writeMessage = function(msg) {
	var base = $('#msgLog').html();
	var ln = base.split("<br>");
	if(ln.length>100){
			base="";
		for(var i=60 ; i<ln.length ; i++){
			base+=ln[i]+"</br>";
		}
		base += "<code>clean old debuglog! [line:"+i+"]</code></br>";
	}
	$('#msgLog').html(base + msg + '</br>');
	$('#msgLog').scrollTop(msgLog.scrollHeight);
};

var keyrepo = "";

socket.on('connect', function(data) {
	console.log(socket);
	writeMessage("socket id> connect");
});

socket.on('callback', function(msg) {
	//position : "master" or "slave"
	if (getPosition() != "master") {
		return;
	}

	if (parser[msg.api] != undefined) {
		writeMessage("<font color='#f70'>socket id> callback [" + msg.api + "/" + msg.ip + "]</font>");
		parser[msg.api](msg);
	}
});

socket.on('call', function(msg) {
	if (msg.selectedDevice == undefined) {
		msg.selectedDevice = "";
	}
	
	if (macAddr == msg.selectedDevice || msg.selectedDevice == "") {
		writeMessage("execute callMessage!");
		delegateAPI(msg);
	}
	
	writeMessage("receive socket call [api:" + msg.api + "]");
	writeMessage("receive socket call [device:" + msg.selectedDevice + "]");
});

socket.on('message', function(msg) {
	console.log("message receive");
	writeMessage("socket id> message [msg:" + msg + "]");
});

var parser = [];
parser.getNetworkInfo = function(data) {
	writeMessage('getNetworkInfo parser');

	for (var name in data.result.wired) {
		writeMessage("<font color='#f70'> [wired." + name + ":" + data.result.wired[name] + "]</font>");
	}
};

parser.getNetworkMacInfo = function(data) {
	writeMessage('getNetworkMacInfo parser');

	for (var name in data.result.wiredInfo) {
		writeMessage("<font color='#f70'> [wired." + name + ":" + data.result.wiredInfo[name] + "]</font>");
	}
};

function resetDebugMode() {
	if (this._debugMode) {
		enableDebugMode();
	} else {
		disableDebugMode();
	}
}

function enableDebugMode() {
	this._debugMode = true;
	$("#msgLog").show();
}

function disableDebugMode() {
	this._debugMode = false;
	if (getPosition() != 'master') {
		$("#msgLog").hide();
	}
}

function toggleDebugMode() {
	if (this._debugMode) {
		disableDebugMode();
		callMessage("disableDebugMode");
		console.log("toggleDebugMode disableDebugMode");
	} else {
		enableDebugMode();
		callMessage("enableDebugMode");
		console.log("toggleDebugMode enableDebugMode");
	}
}

function alert(msg) {
	writeMessage(msg);
}

function setPosition(position) {
	_position = position;
}

function getPosition() {
	return _position;
}

function delegateAPI(action) {
	console.log("delegateAPI call :" + action);

	if (getPosition() == "master" || action == "") {
		return;
	}

	if (action == 'disableDebugMode') {
		disableDebugMode();
	} else if (action == 'enableDebugMode') {
		enableDebugMode();
	} else {
		invoke(action);
	}

};

function invoke(cmd) {
	try {
		if (cmd.param == undefined) {
			webos[cmd.api]();
			writeMessage("success invoke > (not include param) " + cmd.api);
		} else {
			webos[cmd.api](cmd.param);
			writeMessage("success invoke > (include param) " + cmd.api);
		}
	} catch(e) {
		writeMessage("exception!!");
		writeMessage("try!!");
		try {
			console.log("invoke fail! [api:" + cmd.api + "]");
			console.log(e.stack);

			for (var i in cmd.param) {
				writeMessage("invoke fail! [param> " + i + ":" + cmd.param[i] + "]");
			}

			var stacks = e.stack.split("\n");
			for (var i in stacks) {
				writeMessage("<code>" + stacks[i] + "</code>");
			}
		} catch(ex) {
			writeMessage("invoke fail! [api:" + cmd.api + "]");
			var stacks = ex.stack.split("\n");
			for (var i in stacks) {
				writeMessage("<code>" + stacks[i] + "</code>");
			}
			sendLog(localIP, ex.stack);
		}
	}
}

function prevcine() {
}

function nextcine() {
}

function keyCommandRefresh(code) {
	keyrepo += code;

	if (code == 37) {
		prevcine();
	}
	if (code == 39) {
		nextcine();
	}

	// access key : 0 6 9 8 5 2
	if (code != 54 && code != 48 && code != 57 && code != 56 && code != 53 && code != 50) {
		keyrepo = "";
	}

	// 666
	if (keyrepo.indexOf("545454") >= 0) {
		keyrepo = "";
		location.reload();
	}

	// 8592
	if (keyrepo.indexOf("56535750") >= 0) {
		keyrepo = "";
		toggleDebugMode();
	}

	// 99
	if (keyrepo.indexOf("5757") >= 0) {
		keyrepo = "";
		webos.clean();
	}

	// 0909
	if (keyrepo.indexOf("48574857") >= 0) {
		keyrepo = "";
		try{
			$("#cine1").hide();
			$("#cine2").hide();
			$("#cine3").hide();
		}catch(e){
			console.log(e.stack);
		}
	}
}


$(document).keydown(function(e) {
	// hidden key input refresh command (key:6953)
	keyCommandRefresh(e.keyCode);
	writeMessage("local press key [code:" + e.keyCode + "]");
	console.log("local press key " + e.keyCode);
});  