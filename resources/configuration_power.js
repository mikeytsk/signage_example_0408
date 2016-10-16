// power configuration js

$("#power_eventlistener").on('click', function() {
	initProgress(2);

	$("#powerrebootBtn").on('click', function(e) {
		console.log("rebootBtn onClick event!");
		writeMessage("rebootBtn onClick event!");
		callMessage("reboot");
	});

	$("#powershutdownBtn").on('click', function(e) {
		console.log("shutdown Click event!");
		writeMessage("shutdown Click event!");
		callMessage("shutdown");
	});
	
	$("#restartApplicationBtn").on("click", function(e){
		console.log("restart application Click event!");
		writeMessage("restart application Click event!");
		callMessage("restart");
	});

	function setDisplayMode() {
		var cmd = {};
		cmd.api = "setDisplayMode";
		cmd.param = {
			displayMode : $("#display-toggle-value").val()
		};
		console.log("display >" + $("#display-toggle-value").val());
		callMessage(cmd);
	}

	function setWakeOnLan() {
		var cmd = {};
		cmd.api = "enableWakeOnLan";
		cmd.param = {
			wakeOnLan : $("#wakeonlan-toggle-value").val()
		};
		console.log("display >" + $("#wakeonlan-toggle-value").val());
		callMessage(cmd);
	}

	callMessage("getPowerStatus");
	completeReceiveCB();
	
	parser.getPowerStatus = function(data) {
		var display = 1;
		$("#display-toggle-value").val(getToggleValue("#display-toggle") ? 1 : 0);
		if (getToggleValue("#display-toggle") != ( display ? 'On' : 'Off')) {
			$("#display-toggle").click();
		}

		$("#display-toggle").on('click', function() {
			var value = getToggleValue("#display-toggle");
			value = (value == 'On' ? 1 : 0);
			$("#display-toggle-value").val(value);
			setDisplayMode();
		});

		var wakeonlan = data.result.wakeOnLan;
		$("#wakeonlan-toggle-value").val(getToggleValue("#wakeonlan-toggle") ? 1 : 0);
		if (getToggleValue("#wakeonlan-toggle") != ( wakeonlan ? 'On' : 'Off')) {
			$("#wakeonlan-toggle").click();
		}

		$("#wakeonlan-toggle").on('click', function() {
			var value = getToggleValue("#wakeonlan-toggle");
			value = (value == 'On' ? 1 : 0);
			$("#wakeonlan-toggle-value").val(value);
			setWakeOnLan();
		});
		completeReceiveCB();
	};

});
