// timer configuration js

var onTimerList = {};
var offTimerList = {};

function getOnTimer(index) {
	$("#ontimer-no-btn").text(index);
	var node = onTimerList[index - 1];
	console.log("node enabled >" + node.enabled);
	var enabledValue = (node.enabled == true ? 'On' : 'Off');

	if (getToggleValue("#ontimer-enable-toggle") != enabledValue) {
		$("#ontimer-enable-toggle").click();
	}

	$("#ontimer-inputsource-combo-value").text(node.inputSource);
	$("#ontimer-hour-value").val(node.hour);
	$("#ontimer-min-value").val(node.minute);

	$("#ontimer-week-toggles").find(".weeks-enable-toggle").attr('class', 'btn btn-default weeks-enable-toggle');

	var weekValue = node.week;
	var weekRet = weekValue;

	var weekOfSun = (weekRet > 0 && weekRet % 64 != weekRet ? true : false);
	weekRet -= ( weekOfSun ? 64 : 0);
	if (weekOfSun) {
		$("#ontimer_week1").toggleClass("btn-primary");
	}

	var weekOfSat = (weekRet > 0 && weekRet % 32 != weekRet ? true : false);
	weekRet -= ( weekOfSat ? 32 : 0);
	if (weekOfSat) {
		$("#ontimer_week7").toggleClass("btn-primary");
	}

	var weekOfFri = (weekRet > 0 && weekRet % 16 != weekRet ? true : false);
	weekRet -= ( weekOfFri ? 16 : 0);
	if (weekOfFri) {
		$("#ontimer_week6").toggleClass("btn-primary");
	}

	var weekOfThu = (weekRet > 0 && weekRet % 8 != weekRet ? true : false);
	weekRet -= ( weekOfThu ? 8 : 0);
	if (weekOfThu) {
		$("#ontimer_week5").toggleClass("btn-primary");
	}

	var weekOfWed = (weekRet > 0 && weekRet % 4 != weekRet ? true : false);
	weekRet -= ( weekOfWed ? 4 : 0);
	if (weekOfWed) {
		$("#ontimer_week4").toggleClass("btn-primary");
	}

	var weekOfTue = (weekRet > 0 && weekRet % 2 != weekRet ? true : false);
	weekRet -= ( weekOfTue ? 2 : 0);
	if (weekOfTue) {
		$("#ontimer_week3").toggleClass("btn-primary");
	}

	var weekOfMon = (weekRet > 0 && weekRet % 1 != weekRet ? true : false);
	weekRet -= ( weekOfMon ? 1 : 0);
	if (weekOfMon) {
		$("#ontimer_week2").toggleClass("btn-primary");
	}

}

function getOffTimer(index) {
	$("#offtimer-no-btn").text(index);
	var node = offTimerList[index - 1];
	console.log("node enabled >" + node.enabled);
	var enabledValue = (node.enabled == true ? 'On' : 'Off');

	if (getToggleValue("#offtimer-enable-toggle") != enabledValue) {
		$("#offtimer-enable-toggle").click();
	}

	$("#offtimer-hour-value").val(node.hour);
	$("#offtimer-min-value").val(node.minute);
	
	$("#offtimer-week-toggles").find(".weeks-enable-toggle").attr('class', 'btn btn-default weeks-enable-toggle');

	var weekValue = node.week;
	var weekRet = weekValue;

	var weekOfSun = (weekRet > 0 && weekRet % 64 != weekRet ? true : false);
	weekRet -= ( weekOfSun ? 64 : 0);
	if (weekOfSun) {
		$("#offtimer_week1").toggleClass("btn-primary");
	}

	var weekOfSat = (weekRet > 0 && weekRet % 32 != weekRet ? true : false);
	weekRet -= ( weekOfSat ? 32 : 0);
	if (weekOfSat) {
		$("#offtimer_week7").toggleClass("btn-primary");
	}

	var weekOfFri = (weekRet > 0 && weekRet % 16 != weekRet ? true : false);
	weekRet -= ( weekOfFri ? 16 : 0);
	if (weekOfFri) {
		$("#offtimer_week6").toggleClass("btn-primary");
	}

	var weekOfThu = (weekRet > 0 && weekRet % 8 != weekRet ? true : false);
	weekRet -= ( weekOfThu ? 8 : 0);
	if (weekOfThu) {
		$("#offtimer_week5").toggleClass("btn-primary");
	}

	var weekOfWed = (weekRet > 0 && weekRet % 4 != weekRet ? true : false);
	weekRet -= ( weekOfWed ? 4 : 0);
	if (weekOfWed) {
		$("#offtimer_week4").toggleClass("btn-primary");
	}

	var weekOfTue = (weekRet > 0 && weekRet % 2 != weekRet ? true : false);
	weekRet -= ( weekOfTue ? 2 : 0);
	if (weekOfTue) {
		$("#offtimer_week3").toggleClass("btn-primary");
	}

	var weekOfMon = (weekRet > 0 && weekRet % 1 != weekRet ? true : false);
	weekRet -= ( weekOfMon ? 1 : 0);
	if (weekOfMon) {
		$("#offtimer_week2").toggleClass("btn-primary");
	}	
}

function createCallParamForOnTimer() {
	return {
//		index : "-",
//		enabled : false,
		hour : 0,
		minute : 0,
		week : 0,
		inputSource : 0
	};
}

function createCallParamForOffTimer() {
	return {
//		index : "-",
//		enabled : false,
		hour : 0,
		minute : 0,
		week : 0
	};
}

function parseTimerInputSource(val) {
	var inputSource = (val == "None" ? 0 : val);
	if (inputSource != 0) {
		switch(inputSource) {
			case 'hdmi1':
				inputSource = "ext://hdmi:1";
				break;
			case 'hdmi2':
				inputSource = "ext://hdmi:2";
				break;
			case 'displayport':
				inputSource = "ext://dp:1";
				break;
			case 'dvi':
				inputSource = "ext://dvi:1";
				break;
		}
	}
	return inputSource;
}

function initWeekButton() {
	console.log("initWeekButton call!");
	$(".weeks-enable-toggle").click(function() {
		$(this).toggleClass("btn-primary");
	});
}


$("#offtimerUpdateBtn").on("click", function() {
	initProgress(1);
	callMessage("getOffTimerList");
});

$("#ontimerUpdateBtn").on("click", function() {
	initProgress(1);
	callMessage("getOnTimerList");
});

$("#ontimer-ok-btn").on("click", function() {
	initProgress(1);
	var param = createCallParamForOnTimer();

	/*
	param.index = $("#ontimer-no-btn").text();
	param.enabled = getToggleValue("#ontimer-enable-toggle");
	*/
	param.hour = $("#ontimer-hour-value").val();
	param.minute = $("#ontimer-min-value").val();
	param.week = getEnableToggles("#ontimer-week-toggles");

	var inputSource = $("#ontimer-inputsource-combo-value").text();
	param.inputSource = parseTimerInputSource(inputSource);

	var cmd = {};
    cmd.api = "setOnTimer";
    cmd.param = param;
    callMessage(cmd);
    
//	if (param.index != "-") {
//		
//	}

});

$("#offtimer-ok-btn").on("click", function() {
	initProgress(1);
	var param = createCallParamForOffTimer();
	/*
	param.index = $("#offtimer-no-btn").text();
	param.enabled = getToggleValue("#offtimer-enable-toggle");
	*/
	param.hour = $("#offtimer-hour-value").val();
	param.minute = $("#offtimer-min-value").val();
	param.week = getEnableToggles("#offtimer-week-toggles");

	var cmd = {};
    cmd.api = "setOffTimer";
    cmd.param = param;
    callMessage(cmd);
    
//	if (param.index != "-") {
//		
//	}

});


$("#timer_eventlistener").on('click', function() {

	initProgress(4);
	completeReceiveCB();
	callMessage("getOnTimerList");

	parser.getOnTimerList = function(data) {
		console.log("call parser for getOnTimerList!!!!!!");
		var ontimers = data.result.timerList;
		onTimerList = ontimers;
		var html = "";
		for (var i = 0; i < ontimers.length; i++) {
			var node = ontimers[i];
			var seq = i + 1;
			console.log("ontimer list no> " + i + " view seq >" + seq);

			$("#ontimer-table").find("tbody").html("");

			/*
			var link = document.createElement("a");
			$(link).attr("href", "javascript:getOnTimer(" + seq + ")");
			$(link).text(seq);
			*/
			
			var tdNo = document.createElement("td");
			$(tdNo).text(seq);

			/*
			var tdEnable = document.createElement("td");
			$(tdEnable).text(node.enabled);
            */

			var tdInputSource = document.createElement("td");
			$(tdInputSource).text(node.inputSource);

			var tdHour = document.createElement("td");
			$(tdHour).text(node.hour + ":" + node.minute);


			var txtWeek = "";
			var weekValue = node.week;
			var weekRet = weekValue;

			var weekOfSun = (weekRet > 0 && weekRet % 64 != weekRet ? true : false);
			weekRet -= ( weekOfSun ? 64 : 0);
			if (weekOfSun) {
				txtWeek += (txtWeek !=""?",":"");
				txtWeek +="Sun";
			}

			var weekOfSat = (weekRet > 0 && weekRet % 32 != weekRet ? true : false);
			weekRet -= ( weekOfSat ? 32 : 0);
			if (weekOfSat) {
				txtWeek += (txtWeek !=""?",":"");
				txtWeek +="Sat";
			}

			var weekOfFri = (weekRet > 0 && weekRet % 16 != weekRet ? true : false);
			weekRet -= ( weekOfFri ? 16 : 0);
			if (weekOfFri) {
				txtWeek += (txtWeek !=""?",":"");
				txtWeek +="Fri";
			}

			var weekOfThu = (weekRet > 0 && weekRet % 8 != weekRet ? true : false);
			weekRet -= ( weekOfThu ? 8 : 0);
			if (weekOfThu) {
				txtWeek += (txtWeek !=""?",":"");
				txtWeek +="Thu";
			}

			var weekOfWed = (weekRet > 0 && weekRet % 4 != weekRet ? true : false);
			weekRet -= ( weekOfWed ? 4 : 0);
			if (weekOfWed) {
				txtWeek += (txtWeek !=""?",":"");
				txtWeek +="Wed";
			}

			var weekOfTue = (weekRet > 0 && weekRet % 2 != weekRet ? true : false);
			weekRet -= ( weekOfTue ? 2 : 0);
			if (weekOfTue) {
				txtWeek += (txtWeek !=""?",":"");
				txtWeek +="Tue";
			}

			var weekOfMon = (weekRet > 0 && weekRet % 1 != weekRet ? true : false);
			weekRet -= ( weekOfMon ? 1 : 0);
			if (weekOfMon) {
				txtWeek += (txtWeek !=""?",":"");
				txtWeek +="Mon";
			}


			var tdWeek = document.createElement("td");
			$(tdWeek).text(txtWeek);
			
            clickOnTimerDeleteBtn = function(param) {
                initProgress(1);
                var option = JSON.parse(param.value);
                
                var cmd = {};
                
                var param = createCallParamForOnTimer();
                
                param.hour = ""+option.hour;
                param.minute = ""+option.minute;
                param.week = ""+option.week;
                param.inputSource = option.inputSource;
                
                cmd.api = "deleteOnTimer";
                cmd.param = param;
                
                console.log(JSON.stringify(cmd));
                
                callMessage(cmd);
            };
            
			var tdDelete = document.createElement("td");
            $(tdDelete).html("<button onclick='clickOnTimerDeleteBtn(this)' value='"+JSON.stringify(ontimers[i])+"' id='ontimer-del-btn' type='button' class='btn btn-primary'>Delete</button>");

            
			var tr = document.createElement("tr");
			$(tr).append(tdNo);
			//$(tr).append(tdEnable);
			$(tr).append(tdInputSource);
			$(tr).append(tdHour);
			$(tr).append(tdWeek);
			$(tr).append(tdDelete);

			html += "<tr>" + $(tr).html() + "</tr>";
		}
		$("#ontimer-table-tbody").html(html);
		if (callcomplete != callcount) {
			callMessage("getOffTimerList");
		}
		completeReceiveCB();
	};

	parser.getOffTimerList = function(data) {
		completeReceiveCB();
		console.log("call parser for getOffTimerList!!!!!!");
		var offtimers = data.result.timerList;
		offTimerList = offtimers;
		var html = "";

		for (var i = 0; i < offtimers.length; i++) {
			var node = offtimers[i];
			var seq = i + 1;
			console.log("offtimer list no> " + i + " view seq >" + seq);

			$("#offtimer-table").find("tbody").html("");

			/*
			var link = document.createElement("a");
			$(link).attr("href", "javascript:getOffTimer(" + seq + ")");
			$(link).text(seq);
			*/
			
			var tdNo = document.createElement("td");
			$(tdNo).text(seq);

//			var tdEnable = document.createElement("td");
//			$(tdEnable).text(node.enabled);

			var tdHour = document.createElement("td");
			$(tdHour).text(node.hour + ":" + node.minute);

			var txtWeek = "";
			var weekValue = node.week;
			var weekRet = weekValue;

			var weekOfSun = (weekRet > 0 && weekRet % 64 != weekRet ? true : false);
			weekRet -= ( weekOfSun ? 64 : 0);
			if (weekOfSun) {
				txtWeek += (txtWeek !=""?",":"");
				txtWeek +="Sun";
			}

			var weekOfSat = (weekRet > 0 && weekRet % 32 != weekRet ? true : false);
			weekRet -= ( weekOfSat ? 32 : 0);
			if (weekOfSat) {
				txtWeek += (txtWeek !=""?",":"");
				txtWeek +="Sat";
			}

			var weekOfFri = (weekRet > 0 && weekRet % 16 != weekRet ? true : false);
			weekRet -= ( weekOfFri ? 16 : 0);
			if (weekOfFri) {
				txtWeek += (txtWeek !=""?",":"");
				txtWeek +="Fri";
			}

			var weekOfThu = (weekRet > 0 && weekRet % 8 != weekRet ? true : false);
			weekRet -= ( weekOfThu ? 8 : 0);
			if (weekOfThu) {
				txtWeek += (txtWeek !=""?",":"");
				txtWeek +="Thu";
			}

			var weekOfWed = (weekRet > 0 && weekRet % 4 != weekRet ? true : false);
			weekRet -= ( weekOfWed ? 4 : 0);
			if (weekOfWed) {
				txtWeek += (txtWeek !=""?",":"");
				txtWeek +="Wed";
			}

			var weekOfTue = (weekRet > 0 && weekRet % 2 != weekRet ? true : false);
			weekRet -= ( weekOfTue ? 2 : 0);
			if (weekOfTue) {
				txtWeek += (txtWeek !=""?",":"");
				txtWeek +="Tue";
			}

			var weekOfMon = (weekRet > 0 && weekRet % 1 != weekRet ? true : false);
			weekRet -= ( weekOfMon ? 1 : 0);
			if (weekOfMon) {
				txtWeek += (txtWeek !=""?",":"");
				txtWeek +="Mon";
			}


			var tdWeek = document.createElement("td");
			$(tdWeek).text(txtWeek);

			var tdDelete = document.createElement("td");
			
			
			clickOffTimerDeleteBtn = function(param) {
			    initProgress(1);
			    var option = JSON.parse(param.value);
			    
			    var cmd = {};
			    
			    var param = createCallParamForOffTimer();
			    
			    param.hour = ""+option.hour;
			    param.minute = ""+option.minute;
			    param.week = ""+option.week;
			    
			    
			    cmd.api = "deleteOffTimer";
			    cmd.param = param;
			    
			    console.log(JSON.stringify(cmd));
			    
			    callMessage(cmd);
			    
			    
			};
			
            $(tdDelete).html("<button onclick='clickOffTimerDeleteBtn(this)' value='"+JSON.stringify(offtimers[i])+"' id='offtimer-del-btn' type='button' class='btn btn-primary'>Delete</button>");
            

			var tr = document.createElement("tr");
			$(tr).append(tdNo);
			//$(tr).append(tdEnable);
			$(tr).append(tdHour);
			$(tr).append(tdWeek);
			$(tr).append(tdDelete);

			html += "<tr>" + $(tr).html() + "</tr>";
		}
		$("#offtimer-table-tbody").html(html);
		completeReceiveCB();
	};

	$("#ontimer_inputsource_combo_value_1").on("click", function() {
		$('#ontimer-inputsource-combo-value').text('dvi');
	});
	$("#ontimer_inputsource_combo_value_2").on("click", function() {
		$('#ontimer-inputsource-combo-value').text('hdmi1');
	});
	$("#ontimer_inputsource_combo_value_3").on("click", function() {
		$('#ontimer-inputsource-combo-value').text('hdmi2');
	});
	$("#ontimer_inputsource_combo_value_4").on("click", function() {
		$('#ontimer-inputsource-combo-value').text('displayport');
	});

});

parser.setOnTimer = function(data) {
	callMessage("getOnTimerList");
};

parser.setOffTimer = function(data) {
	callMessage("getOffTimerList");
};

initWeekButton(); 