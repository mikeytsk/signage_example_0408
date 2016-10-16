// for webos client
try {
	var _FAIL_CHECK = "check fail!";
	var webos = [];
	var webServerPort = 8592;

	webos.setSchedulingCineTimer = function(data) {
	};

	webos.clean = function() {
		$("#msgLog").html('');
	};

	webos.refresh = function() {
		writeMessage("execute refresh!");
		location.reload();
	};

	webos.restart = function() {
		function successCb() {
			console.log("restart success : ");
		}

		function failureCb(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;

			console.log("Error Code [" + errorCode + "]: " + errorText);
		}

		var configuration = new Configuration();
		configuration.restartApplication(successCb, failureCb);
	};

	webos.reboot = function() {
		function successCb() {
			console.log("success reboot!");
		}

		function failureCb(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;

			writeMessage("reboot Error Code [" + erroCode + "]: " + errorText);
		}

		var options = {};
		options.powerCommand = Power.PowerCommand.REBOOT;

		var power = new Power;
		power.executePowerCommand(successCb, failureCb, options);
	};

	webos.shutdown = function() {
		function successCb() {
			console.log("success reboot!");
		}

		function failureCb(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;

			writeMessage("reboot Error Code [" + erroCode + "]: " + errorText);
		}

		var options = {};
		options.powerCommand = Power.PowerCommand.SHUTDOWN;

		var power = new Power;
		power.executePowerCommand(successCb, failureCb, options);
	};

	webos.initNetworkInfo = function() {

		writeMessage("execute initNetworkInfo");

		try {
			var deviceInfo = new DeviceInfo;

			deviceInfo.getNetworkInfo(function(networkInfoCBObject) {
				this.localIP = networkInfoCBObject.wired.ipAddress;
				deviceInfo.getNetworkMacInfo(function(networkMacInfoCBObject) {
					this.macAddr = networkMacInfoCBObject.wiredInfo.macAddress;
					callbackMessage('initNetworkInfo', "");
				}, function(cbObject) {
					writeMessage("Error Code [" + cbObject.erroCode + "]: " + cbObject.errorText);
				});

			}, function(cbObject) {
				// TODO: mock data : must remove (start)!!!!
				localIP = "10.10.10.10";
				macAddr = "PC:00:US:ER:00";
				callbackMessage('initNetworkInfo', "");
				// TODO: mock data : must remove (end)!!!!
				writeMessage("initNetworkInfo Error Code [" + cbObject.erroCode + "]: " + cbObject.errorText);
			});
		} catch(e) {
			writeMessage(e.stack);
		}
	};

	/* webos api pseudo code start */

	webos.getNetworkInfo = function() {
		var deviceInfo = new DeviceInfo;

		function successCb(cbObject) {
			writeMessage("cbObject : " + JSON.stringify(cbObject));
			writeMessage("isInternetConnectionAvailable : " + cbObject.isInternetConnectionAvailable);
			writeMessage("wired.state : " + cbObject.wired.state);
			writeMessage("wired.method : " + cbObject.wired.method);
			writeMessage("wired.ipAddress : " + cbObject.wired.ipAddress);
			writeMessage("wired.netmask : " + cbObject.wired.netmask);
			writeMessage("wired.dns1 : " + cbObject.wired.dns1);
			writeMessage("wired.dns2 : " + cbObject.wired.dns2);
			writeMessage("wifi.state : " + cbObject.wifi.state);
			writeMessage("wifi.method : " + cbObject.wifi.method);
			writeMessage("wifi.ipAddress : " + cbObject.wifi.ipAddress);
			writeMessage("wifi.netmask : " + cbObject.wifi.netmask);
			writeMessage("wifi.dns1 : " + cbObject.wifi.dns1);
			writeMessage("wifi.dns2 : " + cbObject.wifi.dns2);
			writeMessage("wired.ipAddress : " + cbObject.wired.ipAddress);
			this.localIP = cbObject.wired.ipAddress;
			callbackMessage('getNetworkInfo', cbObject);
		}

		function failureCb(cbObject) {
			writeMessage(cbObject);
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;

			writeMessage("getNetworkInfo Error Code [" + erroCode + "]: " + errorText);
		}


		deviceInfo.getNetworkInfo(successCb, failureCb);
	};

	webos.getNetworkMacInfo = function() {
		var deviceInfo = new DeviceInfo;

		function successCb(cbObject) {
			writeMessage("cbObject : " + JSON.stringify(cbObject));
			writeMessage("wiredInfo.macAddress : " + cbObject.wiredInfo.macAddress);
			this.macAddr = cbObject.wiredInfo.macAddress;
			callbackMessage('getNetworkMacInfo', cbObject);
		}

		function failureCb(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;

			writeMessage("getNetworkMacInfo Error Code [" + erroCode + "]: " + errorText);
		}


		deviceInfo.getNetworkMacInfo(successCb, failureCb);
	};

	webos.getPlatformInfo = function() {
		var deviceInfo = new DeviceInfo;
		function successCb(cbObject) {
			writeMessage("cbObject : " + JSON.stringify(cbObject));
			writeMessage("hardwareVersion : " + cbObject.hardwareVersion);
			writeMessage("modelName : " + cbObject.modelName);
			writeMessage("sdkVersion : " + cbObject.sdkVersion);
			writeMessage("serialNumber : " + cbObject.serialNumber);
			writeMessage("firmwareVersion : " + cbObject.firmwareVersion);

			callbackMessage('getPlatformInfo', cbObject);
		}

		function failureCb(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;

			writeMessage("getPlatformInfo Error Code [" + erroCode + "]: " + errorText);
		}


		deviceInfo.getPlatformInfo(successCb, failureCb);
	};

	webos.getCurrentTime = function() {
		var configuration = new Configuration;
		function successCb(cbObject) {
			writeMessage("cbObject : " + JSON.stringify(cbObject));
			callbackMessage('getCurrentTime', cbObject);
		}

		function failureCb(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;
			writeMessage("getCurrentTime Error Code [" + erroCode + "]: " + errorText);
		}


		configuration.getCurrentTime(successCb, failureCb);
	};

	webos.getPictureMode = function() {
		var configuration = new Configuration;
		function successCb(cbObject) {
			writeMessage("cbObject : " + JSON.stringify(cbObject));
			writeMessage("mode : " + cbObject.mode);
			callbackMessage('getPictureMode', cbObject);
		}

		function failureCb(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;

			writeMessage("getPictureMode Error Code [" + erroCode + "]: " + errorText);
		}


		configuration.getPictureMode(successCb, failureCb);
	};

	webos.captureScreen = function() {
		var signage = new Signage();

		var successCB = function(cbobj) {
			var data = cbobj.data;
			var size = cbobj.size;
			var encoding = cbobj.encoding;
			writeMessage("Got Data size:" + size);
			writeMessage("Got Data encoding :" + encoding);
			writeMessage("Got Data :" + data);

			var capturedData = 'data:image/jpeg;base64,' + data;
			callbackMessage('captureScreen', capturedData);
		};

		var failureCB = function(cbobj) {
			writeMessage(JSON.stringify(cbobj, null, 3));
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;
			writeMessage("captureScreen Error Code [" + errorCode + "]: " + errorText);
		};

		signage.captureScreen(successCB, failureCB);
	};

	webos.getStorageInfo = function() {
		var storage = new Storage;

		var successCb = function(cbObject) {
			var free = cbObject.freeSpace;
			var total = cbObject.totalSpace;
			var used = cbObject.usedSize;

			writeMessage("Total: " + total + "Kbytes");
			writeMessage("Free: " + free + "Kbytes");
			writeMessage("change KByte => Byte");

			cbObject.usedSize = cbObject.usedSize * 1000;
			cbObject.freeSpace = cbObject.freeSpace * 1000;
			cbObject.totalSpace = cbObject.totalSpace * 1000;

			callbackMessage('getStorageInfo', cbObject);
		};

		var failureCb = function(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;
			writeMessage("getStorageInfo Error Code [" + errorCode + "]: " + errorText);
		};

		storage.getStorageInfo(successCb, failureCb);
	};

	webos.getUsageData = function() {
		var signage = new Signage;
		var successCb = function(cbObject) {
			var uptime = cbObject.uptime;
			var totalUsed = cbObject.totalUsed;

			writeMessage("Uptime: " + uptime);
			writeMessage("Total Used: " + totalUsed);
			callbackMessage('getUsageData', cbObject);
		};

		var failureCb = function(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;
			writeMessage("getUsageData Error Code [" + errorCode + "]: " + errorText);

			var data = {
				uptime : _FAIL_CHECK,
				totalUsed : _FAIL_CHECK
			};
			callbackMessage('getUsageData', data);
		};

		signage.getUsageData(successCb, failureCb);
	};

	webos.getSystemMonitoringInfo = function() {
		var signage = new Signage;
		var successCb = function(cbObject) {
			var fan = cbObject.fan;
			var signal = cbObject.signal;
			var lamp = cbObject.lamp;
			var screen = cbObject.screen;
			var temperature = cbObject.temperature;

			writeMessage("Monitor Fan: " + fan);
			writeMessage("Monitor signal: " + signal);
			writeMessage("Monitor lamp: " + lamp);
			writeMessage("Monitor screen: " + screen);
			writeMessage("Monitor temperature: " + temperature);

			//callbackMessage('getSystemMonitoringInfo', cbObject);
		};

		var failureCb = function(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;
			writeMessage("getSystemMonitoringInfo Error Code [" + errorCode + "]: " + errorText);
			var data = {
				fan : _FAIL_CHECK,
				signal : _FAIL_CHECK,
				lamp : _FAIL_CHECK,
				temperature : _FAIL_CHECK,
				screen : _FAIL_CHECK
			};
			callbackMessage('getSystemMonitoringInfo', data);
		};

		signage.getSystemMonitoringInfo(successCb, failureCb);
		webos['registerSystemMonitor']();
	};

	webos.registerSystemMonitor = function() {
		var eventHandler = function(event) {
			console.log("Received Event from : " + event.source);
			console.log("Event Type is : " + event.type);
			console.log("Additional Info : " + JSON.stringify(event.data));
			console.log("event >"+JSON.stringify(event));
			callbackMessage('getSystemMonitoringInfo', event);
		};
		var options = {
			monitorConfiguration : {
				fan : true,
				signal : true,
				lamp : true,
				screen : true,
				temperature :true
			},
			eventHandler : eventHandler
		};
		var successCb = function() {
			console.log("successfully Set");
		};

		var failureCb = function(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;
			console.log(" Error Code [" + errorCode + "]: " + errorText);
		};

		var signage = new Signage;
		signage.registerSystemMonitor(successCb, failureCb, options);
	};

	webos.disableConsole = function() {
		writeMessage("execute disableConsole");
		var options = {};
		options.enabled = false;

		var configure = new Configuration;
		configure.debug(function() {
			writeMessage("success disable console!");
			callbackMessage('disableConsole', "success");
		}, function() {
			writeMessage("fail disable console!");
		}, options);
	};

	webos.enableConsole = function() {
		writeMessage("execute enableConsole");
		var options = {};
		options.enabled = true;

		var configure = new Configuration;

		configure.debug(function() {
			writeMessage("success enable console!");
			callbackMessage('enableConsole', "success");
		}, function() {
			writeMessage("fail enable console!");
		}, options);
	};

	webos.getPictureProperty = function() {
		var configuration = new Configuration;

		function successCb(cbObject) {
			writeMessage("cbObject : " + JSON.stringify(cbObject));
			writeMessage("back light : " + cbObject.backlight);
			writeMessage("contrast : " + cbObject.contrast);
			writeMessage("brightness : " + cbObject.brightness);
			writeMessage("color : " + cbObject.color);
			writeMessage("tint : " + cbObject.tint);
			callbackMessage('getPictureProperty', cbObject);
		}

		function failureCb(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;
			writeMessage("Error Code [" + erroCode + "]: " + errorText);
		}


		configuration.getPictureProperty(successCb, failureCb);
	};

	webos.setPictureProperty = function(param) {
		var options = param.options;

		for (var i in options) {
			writeMessage("<code>setPictureProperty > param> " + i + ":" + options[i] + "</code>");
		}

		function successCb() {
			writeMessage("success!");
			for (var i in options) {
				writeMessage("<code>successCb > " + i + ":" + options[i] + "</code>");
			}
			callbackMessage("setPictureProperty", "success");
		}

		function failureCb(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;
			for (var i in options) {
				writeMessage("<code>failureCb > " + i + ":" + options[i] + "</code>");
			}
			writeMessage("Error Code [" + erroCode + "]: " + errorText);
		}

		var configuration = new Configuration;
		configuration.setPictureProperty(successCb, failureCb, options);
	};

	webos.getTileInfo = function() {
		var signage = new Signage;

		var successCb = function(cbObject) {
			var enabled = cbObject.enabled;
			var row = cbObject.row;
			var column = cbObject.column;
			var tileId = cbObject.tileId;
			var naturalMode = cbObject.naturalMode;
			writeMessage("enable: " + enabled);
			writeMessage("row: " + row);
			writeMessage("column: " + column);
			writeMessage("tileId: " + tileId);
			writeMessage("naturalMode: " + naturalMode);
			callbackMessage('getTileInfo', cbObject);

		};
		var failureCb = function(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;
			writeMessage(" Error Code [" + errorCode + "]: " + errorText);
		};
		signage.getTileInfo(successCb, failureCb);
	};

	webos.setTileInfo = function(options) {
		options['row'] = options['row'] * 1;
		options['column'] = options['column'] * 1;
		options['tileId'] = options['tileId'] * 1;

		var signage = new Signage;
		var apiOption = {
			tileInfo : options
		};

		writeMessage("execute webos.setTileInfo");
		for (var i in options) {
			writeMessage("<code>setTileInfo > param> " + i + ":" + options[i] + "</code>");
		}

		function successCb() {
			writeMessage("success!");
			for (var i in options) {
				writeMessage("<code>successCb > " + i + ":" + options[i] + "</code>");
			}
			callbackMessage("setTileInfo", "success");
		}

		function failureCb(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;
			writeMessage(" Error Code [" + errorCode + "]: " + errorText);
		};

		signage.setTileInfo(successCb, failureCb, apiOption);
	};

	webos.getVideoStatus = function() {
		var video = new Video;
		function successCb(cbObject) {
			writeMessage("cbObject : " + JSON.stringify(cbObject.source));
			writeMessage("source.x : " + cbObject.source.x);
			writeMessage("source.y : " + cbObject.source.y);
			writeMessage("source.width : " + cbObject.source.width);
			writeMessage("source.height : " + cbObject.source.height);
			callbackMessage('getVideoStatus', cbObject);
		}

		function failureCb(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;
			writeMessage("Error Code [" + erroCode + "]: " + errorText);
		}


		video.getVideoStatus(successCb, failureCb);
	};

	webos.setVideoSize = function(cmd) {
		var options = {
			source : {
				x : cmd.x * 1,
				y : cmd.y * 1,
				width : cmd.width * 1,
				height : cmd.height * 1
			}
		};

		writeMessage("execute webos.setVideoSize");
		for (var i in cmd) {
			writeMessage("<code>setVideoSize > param> " + i + ":" + cmd[i] + "</code>");
		}

		function successCb() {
			writeMessage("success!");
			for (var i in cmd) {
				writeMessage("<code>successCb > " + i + ":" + cmd[i] + "</code>");
			}
			callbackMessage("setTileInfo", "success");
		}

		function failureCb(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;
			writeMessage(" Error Code [" + errorCode + "]: " + errorText);
		};

		var video = new Video;
		video.setVideoSize(successCb, failureCb, options);
	};

	webos.getSoundStatus = function() {
		var sound = new Sound;

		function successCb(cbObject) {
			writeMessage("cbObject : " + JSON.stringify(cbObject));
			writeMessage("level : " + cbObject.level);
			writeMessage("muted : " + cbObject.mute);
			writeMessage("externalSpeaker : " + cbObject.externalSpeaker);
			callbackMessage('getSoundStatus', cbObject);
		}

		function failureCb(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;

			writeMessage("<code>Error Code [" + erroCode + "]: " + errorText + "</code>");
		}


		sound.getSoundStatus(successCb, failureCb);
	};

	webos.setVolumnLevel = function(options) {
		var sound = new Sound;
		options['level'] = options['level'] * 1;
		function successCb() {
			writeMessage("success setVolumnLevel [" + options.level + "]");
			callbackMessage('setVolumnLevel', "success");
		}

		function failureCb(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;
			writeMessage("<code>Error Code [" + erroCode + "]: " + errorText + "</code>");
		}


		sound.setVolumeLevel(successCb, failureCb, options);
	};

	webos.setMuted = function(param) {
		var options = {};
		options.muted = (param.muted == "1");

		writeMessage("request setMuted [" + options.muted + "]");

		function successCb() {
			writeMessage("success setMuted [" + options.muted + "]");
			callbackMessage('setMuted', "success");
		}

		function failureCb(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;

			writeMessage("<code>Error Code [" + erroCode + "]: " + errorText + "</code>");
		}

		var sound = new Sound;
		sound.setMuted(successCb, failureCb, options);
	};

	webos.setExternalSpeaker = function(param) {
		var options = {};
		options.externalSpeaker = (param.externalSpeaker == "1");

		function successCb() {
			writeMessage("success setExternalSpeaker [" + options.externalSpeaker + "]");
			callbackMessage('setExternalSpeaker', "success");
		}

		function failureCb(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;

			writeMessage("<code>Error Code [" + erroCode + "]: " + errorText + "</code>");
		}

		var sound = new Sound;
		sound.setExternalSpeaker(successCb, failureCb, options);
	};

	webos.getSignageInfo = function() {
		writeMessage("execute getSignageInfo !!!!!!!!!!!!!!!!!");

		var successCb = function(cbObject) {
			writeMessage("execute getSignageInfo !!!!!!!!!!!!!!!!!!!! success");

			var portraitMode = cbObject.siangeInfo;
			writeMessage("execute getSignageInfo !!!!!!!!!!!!!!!!!!!! success1");
			var ismMethod = cbObject.ismMethod;
			writeMessage("execute getSignageInfo !!!!!!!!!!!!!!!!!!!! success2");
			var digitalAudioInputMode = cbObject.digitalAudioInputMode;
			writeMessage("execute getSignageInfo !!!!!!!!!!!!!!!!!!!! success3");

			writeMessage("portraitMode: " + portraitMode);
			writeMessage("ismMethod: " + ismMethod);
			console.log("digitalAudioInputMode >> " + jsonEncode(digitalAudioInputMode));

			for (var input in digitalAudioInputMode) {
				var audioInput = digitalAudioInputMode[input];
				writeMessage("digitalAudioInputMode for " + input + " = " + audioInput);
			}
			callbackMessage('getSignageInfo', cbObject);
		};

		var failureCb = function(cbObject) {
			writeMessage("<code>execute getSignageInfo ++++++++++++++++++++++ fail</code>");
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;
			writeMessage("<code>" + jsonEncode(cbObject) + "</code>");
			writeMessage("<code> Error Code [" + errorCode + "]: " + errorText + "</code>");
			callbackMessage('getSignageInfo', cbObject);
		};

		var signage = new Signage;
		signage.getSignageInfo(successCb, failureCb);
	};

	webos.setDigitalAudioInput = function(param) {
		writeMessage("setDigitalAudioInput param >" + jsonEncode(param));
		param.hdmi1 = (param.hdmi1 == "HDMI_DP" ? Signage.DigitalAudioInput.HDMI_DP : Signage.DigitalAudioInput.AUDIO_IN);
		param.hdmi2 = (param.hdmi2 == "HDMI_DP" ? Signage.DigitalAudioInput.HDMI_DP : Signage.DigitalAudioInput.AUDIO_IN);
		param.dp = (param.dp == "HDMI_DP" ? Signage.DigitalAudioInput.HDMI_DP : Signage.DigitalAudioInput.AUDIO_IN);

		var options = {
			digitalAudioInputList : {
				'ext://hdmi:1' : param.hdmi1,
				'ext://hdmi:2' : param.hdmi2,
				'ext://dp:1' : param.dp
			}
		};
		writeMessage("setDigitalAudioInput options >" + jsonEncode(options));

		var successCb = function() {
			writeMessage("Successfully Done");
			callbackMessage('setDigitalAudioInput', "success");
		};

		var failureCb = function(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;
			writeMessage(" Error Code [" + errorCode + "]: " + errorText);
		};

		var signage = new Signage;
		signage.setDigitalAudioInputMode(successCb, failureCb, options);
	};

	webos.setDisplayMode = function(param) {
		var options = {};
		if (param.displayMode == "1") {
			options.displayMode = Power.DisplayMode.DISPLAY_ON;
		} else {
			options.displayMode = Power.DisplayMode.DISPLAY_OFF;
		}

		function successCb() {
			writeMessage("success setDisplayMode");
			callbackMessage('setDisplayMode', "success");
		}

		function failureCb(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;
			writeMessage("Error Code [" + erroCode + "]: " + errorText);
		}

		var power = new Power;
		power.setDisplayMode(successCb, failureCb, options);
	};

	webos.getPowerStatus = function() {
		function successCb(cbObject) {
			writeMessage("cbObject : " + JSON.stringify(cbObject));
			writeMessage("wakeOnLan : " + cbObject.wakeOnLan);
			writeMessage("displayMode : " + cbObject.displayMode);
			writeMessage("allOnTimer : " + cbObject.onTimer);
			writeMessage("allOffTimer : " + cbObject.offTimer);
			callbackMessage('getPowerStatus', cbObject);
		}

		function failureCb(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;

			writeMessage("<code>Error Code [" + erroCode + "]: " + errorText + "</code>");
		}

		var power = new Power;
		power.getPowerStatus(successCb, failureCb);
	};

	webos.enableWakeOnLan = function(param) {
		var options = {};

		if (param.wakeOnLan == "1") {
			options.wakeOnLan = true;
		} else {
			options.wakeOnLan = false;
		}

		function successCb() {
			writeMessage("success enabledWakeOnLan : " + param.wakeOnLan);
			callbackMessage('enableWakeOnLan', "success");
		}

		function failureCb(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;

			writeMessage("Error Code [" + erroCode + "]: " + errorText);
		}

		var power = new Power;
		power.enableWakeOnLan(successCb, failureCb, options);
	};

	webos.changeInputSource = function(param) {
		var options = {};
		options.src = param.src;

		writeMessage("execute changeInputSource!!");
		writeMessage("select source >" + param.src);
		console.log("execute changeInputSource!!");
		console.log("select source >" + param.src);

		function successCb(cbObject) {
			writeMessage("success changeInputSource!");
			callbackMessage('changeInputSource', cbObject);
		}

		function failureCb(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;
			writeMessage("<code>Error Code [" + erroCode + "]: " + errorText + "</code>");
		}

		var inputSource = new InputSource;
		inputSource.changeInputSource(successCb, failureCb, options);
	};

	webos.getInputSourceStatus = function() {

		function successCb(cbObject) {
			var inputSourceList = cbObject.inputSourceList;
			for (var i = 0; i < inputSourceList.length; i++) {
				writeMessage("inputSourceList[" + i + "] : " + JSON.stringify(inputSourceList[i]));
				writeMessage("inputSourceList[" + i + "].inputPort : " + inputSourceList[i].inputPort);
			}
			writeMessage("currentInputSource : " + cbObject.currentInputSource);
			writeMessage("currentSignalState : " + cbObject.currentSignalState);
			callbackMessage('getInputSourceStatus', cbObject);
		}

		function failureCb(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;
			writeMessage("Error Code [" + erroCode + "]: " + errorText);
		}

		var inputSource = new InputSource;
		inputSource.getInputSourceStatus(successCb, failureCb);
	};

	webos.getFailOverMode = function() {
		writeMessage("execute getFailOverMode!");
		var successCb = function(cbObject) {
			var mode = cbObject.mode;
			var priority = cbObject.priority;
			console.log('Failover Mode : ' + mode);
			console.log('Priority : ' + priority);
			writeMessage('Failover Mode : ' + mode);
			writeMessage('Priority : ' + priority);
			callbackMessage('getFailOverMode', cbObject);
		};

		var failureCb = function(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;
			writeMessage(" Error Code [" + errorCode + "]: " + errorText);
		};

		var signage = new Signage;
		signage.getFailoverMode(successCb, failureCb);
	};

	webos.setFailOverMode = function(param) {
		var options = {};

		switch(param.mode) {
			case 'auto':
				options = {
					failoverMode : {
						mode : Signage.FailoverMode.AUTO,
					}
				};
				break;
			case 'manual':
				options = {
					failoverMode : {
						mode : Signage.FailoverMode.MANUAL,
						priority : param.priority
					}
				};
				for (var i = 0; i < param.priority.length; i++) {
					writeMessage("failover manual priority setting [index:" + i + ", value:" + param.priority[i] + "]");
				}
				break;
			default:
				options = {
					failoverMode : {
						mode : Signage.FailoverMode.OFF,
					}
				};
				break;
		}

		var successCb = function() {
			writeMessage('Successfully set Failover Mode');
			callbackMessage('setFailOverMode', "success");
		};

		var failureCb = function(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;
			writeMessage(" Error Code [" + errorCode + "]: " + errorText);
		};

		var signage = new Signage;
		signage.setFailoverMode(successCb, failureCb, options);
	};

	webos.getOnTimerList = function() {
		function successCb(cbObject) {
			var timerList = cbObject.timerList;
			for (var i = 0; i < timerList.length; i++) {
				writeMessage("on timer timerList[" + i + "] : " + JSON.stringify(timerList[i]));
			}
			callbackMessage("getOnTimerList", cbObject);
		}

		function failureCb(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;

			writeMessage("<code>Error Code [" + erroCode + "]: " + errorText + "</code>");
		}

		var power = new Power;
		power.getOnTimerList(successCb, failureCb);
	};

	webos.getOffTimerList = function() {
		function successCb(cbObject) {
			var timerList = cbObject.timerList;
			for (var i = 0; i < timerList.length; i++) {
				writeMessage("off timer timerList[" + i + "] : " + JSON.stringify(timerList[i]));
			}
			callbackMessage("getOffTimerList", cbObject);
		}

		function failureCb(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;
			writeMessage("Error Code [" + erroCode + "]: " + errorText);
		}

		var power = new Power;
		power.getOffTimerList(successCb, failureCb);
	};

	webos.setOnTimer = function(param) {
		var options = param;
		/*
		options.index *= 1;
		options.index -= 1;
		*/
		options.hour *= 1;
		options.minute *= 1;
		options.week = calcurateWeek(options.week);
		//options.enabled = (options.enabled == 'On' ? true : false);

		console.log("param >" + JSON.stringify(param));
		console.log("options >" + JSON.stringify(options));
		writeMessage("param >" + JSON.stringify(param));
		writeMessage("options >" + JSON.stringify(options));

		function successCb() {
			callbackMessage("setOnTimer", "success");
		}

		function failureCb(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;

			writeMessage("<code>Error Code [" + errorCode + "]: " + errorText + "</code>");
		}

		var power = new Power;
		power.addOnTimer(successCb, failureCb, options);
		power.enableAllOnTimer(null, null, {"allOnTimer":true});
		
	};
	
	webos.deleteOnTimer = function(param) {
        var options = param;

        options.hour *= 1;
        options.minute *= 1;
        options.week *= 1;

        console.log("param >" + JSON.stringify(param));
        console.log("options >" + JSON.stringify(options));
        writeMessage("param >" + JSON.stringify(param));
        writeMessage("options >" + JSON.stringify(options));

        function successCb() {
            callbackMessage("setOnTimer", "success");
        }

        function failureCb(cbObject) {
            var errorCode = cbObject.errorCode;
            var errorText = cbObject.errorText;

            writeMessage("<code>Error Code [" + errorCode + "]: " + errorText + "</code>");
        }
        
        var power = new Power;
        power.deleteOnTimer(successCb, failureCb, options);
        
    };

	webos.setOffTimer = function(param) {

		var options = param;

		options.hour *= 1;
		options.minute *= 1;
		options.week = calcurateWeek(options.week);

		console.log("param >" + JSON.stringify(param));
		console.log("options >" + JSON.stringify(options));
		writeMessage("param >" + JSON.stringify(param));
		writeMessage("options >" + JSON.stringify(options));

		function successCb() {
			callbackMessage("setOffTimer", "success");
		}

		function failureCb(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;

			writeMessage("<code>Error Code [" + errorCode + "]: " + errorText + "</code>");
		}

		var power = new Power;
		power.addOffTimer(successCb, failureCb, options);
		power.enableAllOffTimer(null, null, {"allOffTimer":true});
	};
	
	webos.deleteOffTimer = function(param) {
	    
        var options = param;
        
        options.hour *= 1;
        options.minute *= 1;
        options.week *= 1;

        console.log("param >" + JSON.stringify(param));
        console.log("options >" + JSON.stringify(options));
        writeMessage("param >" + JSON.stringify(param));
        writeMessage("options >" + JSON.stringify(options));

        function successCb() {
            callbackMessage("setOffTimer", "success");
        }

        function failureCb(cbObject) {
            var errorCode = cbObject.errorCode;
            var errorText = cbObject.errorText;

            writeMessage("<code>Error Code [" + errorCode + "]: " + errorText + "</code>");
        }

        var power = new Power;
        power.deleteOffTimer(successCb, failureCb, options);
        
    };

	webos.setPortraitMode = function(param) {
		// options.portraitMode
		var options = param;
		var successCb = function() {
			writeMessage("Portrait Mode successfully Set");
		};

		var failureCb = function(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;
			writeMessage("<code>Error Code [" + errorCode + "]: " + errorText + "</code>");
		};

		var signage = new Signage;
		signage.setPortraitMode(successCb, failureCb, options);
	};

	webos.getPowerSaveMode = function() {
		var successCb = function(cbObject) {
			var ses = cbObject.ses;
			var dpmMode = cbObject.dpmMode;
			var automaticStandby = cbObject.automaticStandby;
			var do15MinOff = cbObject.do15MinOff;

			writeMessage("Smart Energy Saving: " + ses);
			writeMessage("Display Power Management: " + dpmMode);
			writeMessage("Automatic Standby Mode: " + automaticStandby);
			writeMessage("15 Minutes Off: " + do15MinOff);
			callbackMessage("getPowerSaveMode", cbObject);
		};

		var failureCb = function(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;
			writeMessage("<code> Error Code [" + errorCode + "]: " + errorText + "</code>");
		};

		var signage = new Signage;
		signage.getPowerSaveMode(successCb, failureCb);
	};

	webos.setPowerSaveMode = function(param) {
		var mode = param.powerSaveMode;
		var options = {
			powerSaveMode : {

				ses : (mode == 'SES(Smart Energy Saving)' ? true : false),

				dpmMode : (mode == 'DPM(Display Power Management)' ? Signage.DpmMode.POWER_OFF_10MINUTE : Signage.DpmMode.OFF),

				automaticStandby : (mode == 'Automatic Standby' ? Signage.AutomaticStandbyMode.STANDBY_4HOURS : Signage.AutomaticStandbyMode.OFF),

				do15MinOff : false,
			}
		};
		writeMessage(jsonEncode(options));
		var successCb = function() {
			writeMessage("successfully Set");
		};

		var failureCb = function(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;
			writeMessage("<code> Error Code [" + errorCode + "]: " + errorText + "</code>");
		};

		var signage = new Signage;
		signage.setPowerSaveMode(successCb, failureCb, options);
	};

	webos.getUsagePermission = function() {
		var successCb = function(cbObject) {
			writeMessage(jsonEncode(cbObject));
			var remoteKeyOperationMode = cbObject.remoteKeyOperationMode;
			var localKeyOperationMode = cbObject.localKeyOperationMode;

			writeMessage("================================================================");
			writeMessage("remoteKeyOperationMode: " + remoteKeyOperationMode);
			writeMessage("localKeyOperationMode: " + localKeyOperationMode);
			writeMessage("================================================================");
			callbackMessage("getUsagePermission", cbObject);
		};

		var failureCb = function(cbObject) {
			writeMessage(jsonEncode(cbObject));
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;
			writeMessage("================================================================");
			writeMessage("<code> Error Code [" + errorCode + "]: " + errorText + "</code>");
			writeMessage("================================================================");
		};

		var signage = new Signage;
		signage.getUsagePermission(successCb, failureCb);
	};

	webos.setUsagePermission = function(param) {
		function getParamForUsagePermission(val) {
			switch(val) {
				case 'All Block':
					return Signage.KeyOperationMode.BLOCK_ALL;
				case 'All Allow':
					return Signage.KeyOperationMode.ALLOW_ALL;
				case 'Power Only':
					return Signage.KeyOperationMode.POWER_ONLY;
			}
		}

		var local = getParamForUsagePermission(param.local);
		var remote = getParamForUsagePermission(param.remote);

		var options = {
			policy : {
				remoteKeyOperationMode : remote,
				localKeyOperationMode : local,
			}
		};

		var successCb = function() {
			writeMessage("successfully Set");
		};

		var failureCb = function(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;
			writeMessage("<code> Error Code [" + errorCode + "]: " + errorText + "</code>");
		};

		var signage = new Signage;
		signage.setUsagePermission(successCb, failureCb, options);
	};

	webos.setPictureMode = function(param) {
		var options = {};
		options.mode = param;
		writeMessage("<code>request api call [method:setPictureMode, param:" + param + "]");

		function successCb() {
			writeMessage("<code>success change picture mode " + param + "</code>");
			callbackMessage("setPictureMode", "success");
		}

		function failureCb(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;
			writeMessage("<code>Error Code [" + erroCode + "]: " + errorText + "</code>");
		}

		var configuration = new Configuration;
		configuration.setPictureMode(successCb, failureCb, options);
	};

	webos.setPortraitMode = function(param) {

		var options = {
			portraitMode : (param.portraitMode == 'On' ? Signage.OsdPortraitMode.ON : Signage.OsdPortraitMode.OFF)
		};

		var successCb = function() {
			writeMessage("Portrait Mode successfully Set options> " + options.portraitMode + ", request param >" + param.portraitMode);
			callbackMessage("setPortraitMode", "success");
		};

		var failureCb = function(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;
			writeMessage("<code> Error Code [" + errorCode + "]: " + errorText + "</code>");
		};

		var signage = new Signage;
		signage.setPortraitMode(successCb, failureCb, options);
	};

	webos.enableCineScheduling = function(param) {
		if (param.enable == 'On') {
			console.log("enableCineScheduling");
			try {
				enableCineScheduling();
			} catch(e) {
				console.log("not implement enableCineScheduling()");
				console.log(e.stack);
			}
		} else {
			console.log("disableCineScheduling");
			try {
				disableCineScheduling();
			} catch(e) {
				console.log("not implement disableCineScheduling()");
				console.log(e.stack);
			}
		}
	};

	webos.enableDebugMode = function() {
		enableDebugMode();
	};

	webos.disableDebugMode = function() {
		disableDebugMode();
	};

	webos.playMedia = function() {
		mediaplay();
	};

	webos.upgradeApplication = function() {
		var successCb = function(cbObject) {
			writeMessage("Application Update successful");
		};

		var failureCb = function(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;
			writeMessage(" Error Code [" + errorCode + "]: " + errorText);
		};

		var storage = new Storage;
		storage.upgradeApplication(successCb, failureCb);
	};

	webos.copyFile = function(param) {

	    
		writeMessage("execute copyFile!!");
		var remoteFile = param.remoteFile;
		var saveFile = param.saveFile;
		var options_remote_to_local = {
			source : 'http://' + url + ":" + webServerPort+ '/' + remoteFile,
			destination : 'file://internal/' + saveFile
		};

		console.log("webos.copyFile " + JSON.stringify(options_remote_to_local));
		
		writeMessage("copyFile param [src:" + 'http:///' + url +":"+ webServerPort +'/' + remoteFile + ",dest:" + 'file://internal/' + saveFile + "]");
		function successCb() {
			writeMessage("success copyFile!!");
		}

		function failureCb(cbObject) {
			writeMessage("<code>failure copyFile!!</code>");
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;
			writeMessage("<code> Error Code [" + errorCode + "]: " + errorText + "</code>");
		}

		var storage = new Storage;
//		console.log("copyfile is called !!!");
		storage.copyFile(successCb, failureCb, options_remote_to_local);
//		console.log("after copyfile is called !!!");
	};

	webos.listFiles = function() {

		var successCb = function(cbObject) {
			writeMessage("success file list");
			callbackMessage('listFiles', cbObject);
		};

		var failureCb = function(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;
			writeMessage("<code> listFiles Error Code [" + errorCode + "]: " + errorText + "</code>");
		};

		var storage = new Storage;
		storage.listFiles(successCb, failureCb);
	};

	webos.removeFile = function(param) {
		var successCb = function() {
			writeMessage("Removing File done.");
			callbackMessage('removeFile', "success");
		};

		var failureCb = function(cbObject) {
			var errorCode = cbObject.errorCode;
			var errorText = cbObject.errorText;
			writeMessage("<code> removeFile Error Code [" + errorCode + "]: " + errorText + "</code>");
			callbackMessage('removeFile', "fail");
		};

		var options = {
			file : 'file://internal/' + param.filename,
		};

		var storage = new Storage;
		storage.removeFile(successCb, failureCb, options);
	};

	/* webos api pseudo code end */

} catch(e) {
	console.log("=================================");
	console.log("webos client api define fail!");
	console.log("must client refresh!");
	console.log("=================================");
}

function jsonEncode(obj) {
	return JSON.stringify(obj);
}

function calcurateWeek(selects) {
	var sum = 0;
	console.log("calcurateWeek arg>" + jsonEncode(selects));
	for (var i = 0; i < selects.length; i++) {
		sum += getWeekValue(selects[i]);
		console.log("loop sum >" + sum);
		console.log("loop week >" + selects[i]);
		console.log("loop week static >" + getWeekValue(selects[i]));
	}
	return sum;
}

function getWeekValue(week) {
	switch(week) {
		case 'Sun':
			return Power.TimerWeek.SUNDAY;
		case 'Mon':
			return Power.TimerWeek.MONDAY;
		case 'Sat':
			return Power.TimerWeek.SATURDAY;
		case 'Fri':
			return Power.TimerWeek.FRIDAY;
		case 'Tue':
			return Power.TimerWeek.TUESDAY;
		case 'Thu':
			return Power.TimerWeek.THURSDAY;
		case 'Wed':
			return Power.TimerWeek.WEDNESDAY;
	}
}