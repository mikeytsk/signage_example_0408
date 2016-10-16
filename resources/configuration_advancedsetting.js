// advancedsetting configuration js
$("#advancedsetting_eventlistener").on('click', function() {
	callMessage("getUsagePermission");
});

parser.getUsagePermission = function(data) {
	console.log("==============================================");
	function getParamForUsagePermission(val) {
		switch(val) {
			case 'blockAll':
				return "All Block";
			case 'normal':
				return "All Allow";
			case 'usePwrOnly':
				return "Power Only";
		}
	}
	console.log("local usage permission >>>"+data.result.localKeyOperationMode);
	console.log("remote usage permission >>>"+data.result.remoteKeyOperationMode);


	$("#localpermission-combo").text(getParamForUsagePermission(data.result.localKeyOperationMode));
	$("#remotepermission-combo").text(getParamForUsagePermission(data.result.remoteKeyOperationMode));
	console.log("==============================================");
};

$("#portrait-toggle").on("click", function() {
	console.log("portrait-toggle click!!!!!!" + getEnableToggles("#portrait-toggle"));

	var cmd = {};
	cmd.api = "setPortraitMode";
	cmd.param = {
		portraitMode : (getEnableToggles("#portrait-toggle") == 'On' ? 'Off' : 'On')
	};
	callMessage(cmd);
});

$("#powersave-combo-value-1").on("click", function() {
	setPowerSave($("#powersave-combo-value-1"));
});

$("#powersave-combo-value-2").on("click", function() {
	setPowerSave($("#powersave-combo-value-2"));
});

$("#powersave-combo-value-3").on("click", function() {
	setPowerSave($("#powersave-combo-value-3"));
});

function setPowerSave(id) {
	$("#powersave-combo").text(id.text());
	var cmd = {};
	cmd.api = "setPowerSaveMode";
	cmd.param = {
		powerSaveMode : $("#powersave-combo").text()
	};
	
	callMessage(cmd);
}


$("#localpermission-combo-value-1").on("click", function() {
	$("#localpermission-combo").text($("#localpermission-combo-value-1").text());
	setUsagePermission();
});
$("#localpermission-combo-value-2").on("click", function() {
	$("#localpermission-combo").text($("#localpermission-combo-value-2").text());
	setUsagePermission();
});
$("#localpermission-combo-value-3").on("click", function() {
	$("#localpermission-combo").text($("#localpermission-combo-value-3").text());
	setUsagePermission();
});
$("#remotepermission-combo-value-1").on("click", function() {
	$("#remotepermission-combo").text($("#remotepermission-combo-value-1").text());
	setUsagePermission();
});
$("#remotepermission-combo-value-2").on("click", function() {
	$("#remotepermission-combo").text($("#remotepermission-combo-value-2").text());
	setUsagePermission();
});
$("#remotepermission-combo-value-3").on("click", function() {
	$("#remotepermission-combo").text($("#remotepermission-combo-value-3").text());
	setUsagePermission();
});

function setUsagePermission() {
	var cmd = {};
	cmd.api = "setUsagePermission";
	cmd.param = {
		local : $("#localpermission-combo").text(),
		remote : $("#remotepermission-combo").text()
	};
	callMessage(cmd);
}
