jQuery('div[src]').each(function() {
	var me = $(this);
	me.load(me.attr('src'), function() {
		console.log("external page loading end!");
	});
});

var selectedDevice = "";
var viewPage = "";
var hashParam = {};

function parseHash() {
	var hashParam = {};

	var hash = location.hash.split("#");
	var hashCode = "";
	if (hash.length == 2) {
		hashCode = hash[1];
	}

	var pairs = hashCode.split("&");
	for (var index in pairs) {
		var keyValue = pairs[index].split("=");

		if (keyValue.length < 2) {
			hashParam[keyValue[0]] = "";
		} else {
			hashParam[keyValue[0]] = keyValue[1];
		}
		console.log("do parseHash");
		console.log(keyValue[0] + ":" + hashParam[keyValue[0]]);
	}

	if (hashParam['device'] == undefined) {
		hashParam['device'] = selectedDevice;
	}

	return hashParam;
}

function selectDevice(device) {
	if (device) {
		selectedDevice = device;
		$("#selected_device_id").text(device);
		console.log("selected_device_id text change >" + device);
	}
}

function goPage(page) {
	if (viewPage != page && page != undefined) {
		location.href = page + ".html" + "#device=" + selectedDevice;
	}
	console.log("do goPage");
	console.log("viewPage:" + viewPage);
	console.log("page:" + page);
}

function initPage() {
	console.log("do initPage");
	try {
		selectDevice(hashParam['device']);
		onSelectDevice(hashParam['device']);
		console.log(hashParam['device']);
	} catch(e) {
		console.log(e.stack);
	}

	try {
		goPage(hashParam['page']);
		onGoPage(hashParam['page']);
	} catch(e) {
		console.log(e.stack);
	}
}

function onGoPage(page) {
	console.log("==============================");
	console.log("TODO Implement onGoPage(page)!");
	console.log("page >" + page);
	console.log("==============================");
}

function onSelectDevice(id) {
	console.log("==============================");
	console.log("TODO Implement onSelectDevice(id)!");
	console.log("id >" + id);
	console.log("==============================");
}

function initOnOffButton() {
	console.log("====================================");
	console.log("call initOnOffButton (init toggle OnOffButton)");
	console.log("====================================");
	$('.onoff-toggle').click(function() {
		console.log("btn-toggle button click");
		$(this).find('.btn').toggleClass('active');

		if ($(this).find('.btn-primary').size() > 0) {
			console.log("click >>>" + $(this).find('.active').text());
			$(this).find('.btn').toggleClass('btn-primary');
		}
		$(this).find('.btn').toggleClass('btn-default');
	});
}

function formatSizeUnits(bytes) {
	if (bytes >= 1073741824) {
		bytes = (bytes / 1073741824).toFixed(2) + ' GB';
	} else if (bytes >= 1048576) {
		bytes = (bytes / 1048576).toFixed(2) + ' MB';
	} else if (bytes >= 1024) {
		bytes = (bytes / 1024).toFixed(2) + ' KB';
	} else if (bytes > 1) {
		bytes = bytes + ' bytes';
	} else if (bytes == 1) {
		bytes = bytes + ' byte';
	} else {
		bytes = '0 byte';
	}
	return bytes;
}


$(window).ready(function() {
	hashParam = parseHash();
	initPage();
});

$(window).on('hashchange', function() {
	hashParam = parseHash();
	initPage();
});

