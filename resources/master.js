var devices = [];

console.log("window ready");
setPosition("master");
enableDebugMode();

var cmdOfGetDevices = {
	api : 'getDevices'
};
masterMessage(cmdOfGetDevices);

var webos = [];
webos.refresh = function() {
};
webos.reboot = function() {
};
webos.getNetworkInfo = function() {
};
webos.getNetworkMacInfo = function() {
};

webos.initNetworkInfo = function(e) {
};

webos.captureScreen = function() {

};

function showLogBtn() {
	$("#msgLog-modal").modal('toggle');
	$("#msgLog-modal").modal({
		keyboard : false
	});
}


$("#playBtn").on("click", function() {
	callMessage('playMedia');
});

$("#showLogBtn").on("click", function() {
	showLogBtn();
});

$("#toggleDebugModeBtn").on("click", function() {
	toggleDebugMode();
});

$('#msgLogCleanBtn').on('click', function() {
	callMessage('clean');
	delegateAPI('clean');
});
$('#refreshBtn').on('click', function() {
	callMessage('refresh');
	delegateAPI('refresh');
});
$('#rebootBtn').on('click', function() {
	callMessage('reboot');
	delegateAPI('reboot');
});
$('#networkMacInfoBtn').on('click', function() {
	callMessage('getNetworkMacInfo');
	delegateAPI('getNetworkMacInfo');
});
$('#networkInfoBtn').on('click', function() {
	callMessage('getNetworkInfo');
	delegateAPI('getNetworkInfo');
});
$('#currentTimeBtn').on('click', function() {
	callMessage('getCurrentTime');
	delegateAPI('getCurrentTime');
});
$('#pictureModeBtn').on('click', function() {
	callMessage('getPictureMode');
	delegateAPI('getPictureMode');
});
$('#platformInfoBtn').on('click', function() {
	callMessage('getPlatformInfo');
	delegateAPI('getPlatformInfo');
});
$('#initNetworkInfoBtn').on('click', function() {
	callMessage('initNetworkInfo');
	delegateAPI('initNetworkInfo');
});
$('#captureScreenBtn').on('click', function() {
	callMessage('captureScreen');
	delegateAPI('captureScreen');
});

$('#devicesBtn').on('click', function() {
	masterMessage(cmdOfGetDevices);
	delegateAPI('getDevices');
});

socket.on("master", function(data) {
	console.log("receive master message! [cmd:" + data.api + "]");
	console.log("json > " + JSON.stringify(data));
	switch(data.api) {
		case 'getDevices':
			console.log("master getDevices process!");
			console.log("master data> " + JSON.stringify(devices));
			devices = data.result;
			refreshNode();
			break;
		case 'getSchedulingCineTimer':
			console.log("master getSchedulingCineTime process!");
			console.log("master data> " + JSON.stringify(data));
			getSchedulingCineTime(data);
			break;
		case 'getContents':
			refreshContents(data);
			break;
	}
});

function refreshContents(data){
	console.log("Not implement!");
}

function getSchedulingCineTime(val) {
	console.log("Not implement!");
}

function masterMessage(cmd) {
	socket.emit('master', cmd);
	console.log("execute masterMessage! [cmd:" + cmd.api + "]");
}

function updateDevices() {
	console.log("===============================");
	console.log("execute updateDevices!");
	console.log("===============================");
	masterMessage(cmdOfGetDevices);
}

function refreshNode() {
	console.log("=====================================");
	console.log("TODO: implement refreshNode() function in html page!");
	console.log("=====================================");
}

function getEnableToggles(id) {
	var enables = $(id).find(".btn-primary");
	var values = [];
	for (var i = 0; i < enables.length; i++) {
		console.log("enable > " + enables[i].value);
		values.push(enables[i].value);
	}

	return values;
}

function getToggleValue(id) {
	return $(id).find('.active').val();
}

function getBooleanToggleValue(id) {
	return $(id).find('.active').val() ? 'On' : 'Off';
}
