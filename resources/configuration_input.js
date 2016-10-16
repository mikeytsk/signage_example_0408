// input configuration js

$("#input_eventlistener").on('click', function() {

	initProgress(4);
	completeReceiveCB();

	$("#input-combo").change(function() {
		console.log("input-combo change!");
		var cmd = {};
		cmd.api = "changeInputSource";
		cmd.param = {
			'src' : $("#input-combo").text()
		};
		console.log("request changeInputSource src param>" + $("#input-combo").text());
		callMessage(cmd);
		parser.changeInputSource = function(data) {
			callMessage('getInputSourceStatus');
		};
	});

	callMessage('getInputSourceStatus');
	parser.getInputSourceStatus = function(data) {
		completeReceiveCB();
		$("#inputCombo").text("");

		var inputSourceList = data.result.inputSourceList;
		for (var i = 0; i < inputSourceList.length; i++) {
			var li = document.createElement("li");
			var link = document.createElement("a");
			$(link).text(inputSourceList[i].inputPort);
			$(link).attr("href", "#");
			$(link).attr("id", "inputSource_" + i);

			$(link).click(function() {
				console.log("click > " + this.text);
				$("#input-combo").text(this.text);
				$("#input-combo").change();
			});

			$(li).append(link);
			$("#inputCombo").append(li);

			console.log("getInputSourceStatus result source node > :" + inputSourceList[i]);
			console.log("getInputSourceStatus result source inputPort > " + inputSourceList[i].inputPort);
		}
		$("#input-combo").text(data.result.currentInputSource);
		$("#currentInputSource").html("<b>" + data.result.currentInputSource + "</b>");
		$("#currentInputSourceStatus").html("<b>" + data.result.currentSignalState + "</b>");
		if (data.result.currentSignalState == 'good') {
			$("#currentInputSourceStatus").attr("class", "text-success");
		} else if (data.result.currentSignalState == 'bad') {
			$("#currentInputSourceStatus").attr("class", "text-warning");
		} else {
			$("#currentInputSourceStatus").attr("class", "text-danger");
		}
		completeReceiveCB();
		callMessage('getFailOverMode');
	};

	parser.getFailOverMode = function(data) {
		if (data.result != undefined) {
			var mode = data.result.mode;
			var priority = data.result.priority;

			initButtonFailOverMode(mode);
			initInputBoxFailOverPriorit(priority);
		}
		completeReceiveCB();
	};

});

function initInputBoxFailOverPriorit(priority) {
	for (var i = 0; i < priority.length; i++) {
		switch(priority[i]) {
			case 'ext://hdmi:1':
				$("#failoverpriorit-hdmi1").val(i + 1);
				break;
			case 'ext://hdmi:2':
				$("#failoverpriorit-hdmi2").val(i + 1);
				break;
			case 'ext://dvi:1':
				$("#failoverpriorit-dvi").val(i + 1);
				break;
			case 'ext://internal_memory':
				$("#failoverpriorit-internalmemory").val(i + 1);
				break;
			case 'ext://dp:1':
				$("#failoverpriorit-dp").val(i + 1);
				break;
		}
	}
}

function initButtonFailOverMode(mode) {
	$("#failovermode-combo").text(mode);
	$("#failovermode-combo-value-1").on("click", function() {
		setFailOverMode('off');
	});
	$("#failovermode-combo-value-2").on("click", function() {
		setFailOverMode('manual');
	});
	$("#failovermode-combo-value-3").on("click", function() {
		setFailOverMode('auto');
	});
}

function getManualPriority() {
	console.log("call getManualPriority");
	var hdmi1 = $("#failoverpriorit-hdmi1").val()*1;
	var hdmi2 = $("#failoverpriorit-hdmi2").val()*1;
	var dvi = $("#failoverpriorit-dvi").val()*1;
	var dp = $("#failoverpriorit-dp").val()*1;
	var internalmemory = $("#failoverpriorit-internalmemory").val()*1;
	
	var priority = [];
	for (var i = 1; i < 6; i++) {
		switch(i) {
			case hdmi1:
				priority.push("ext://hdmi:1");
				break;
			case hdmi2:
				priority.push("ext://hdmi:2");
				break;
			case dvi:
				priority.push("ext://dvi:1");
				break;
			case dp:
				priority.push("ext://dp:1");
				break;
			case internalmemory:
				priority.push("ext://internal_memory");
				break;
		}
	}
	
	console.log("getManualPriority result");
	console.log(priority);
	return priority;
}

function setFailOverMode(val) {
	$("#failovermode-combo").text(val);
	console.log("execute setFailOverMode!");

	if (val == 'manual') {
		console.log("execute setFailOverMode (manual)!");
		var cmd = {
			api : 'setFailOverMode',
			param : {
				mode : val,
				priority : getManualPriority()
			}
		};
	} else {
		console.log("execute setFailOverMode (not manual)!");
		var cmd = {
			api : 'setFailOverMode',
			param : {
				mode : val
			}
		};
	}
	
	console.log("setFailOverMode command");
	console.log(cmd);
	callMessage(cmd);
}
