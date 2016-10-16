// audio configuration js

$("#audio_eventlistener").on('click', function() {

    initProgress(4);
    completeReceiveCB();

    function setVolumnLevel() {
        var cmd = {};
        cmd.api = "setVolumnLevel";
        cmd.param = {
            level : $("#level-slider-value").val()
        };
        callMessage(cmd);
    }

    function setMuted() {
        var cmd = {};
        cmd.api = "setMuted";
        cmd.param = {
            muted : $("#mute-toggle-value").val()
        };
        console.log("mute >" + $("#mute-toggle-value").val());
        callMessage(cmd);
    }

    function setExternalSpeaker() {
        var cmd = {};
        cmd.api = "setExternalSpeaker";
        cmd.param = {
            externalSpeaker : $("#externalspeaker-toggle-value").val()
        };
        console.log("externalSpeaker >" + $("#externalspeaker-toggle-value").val());
        callMessage(cmd);
    }

    callMessage("getSignageInfo");
    parser.getSignageInfo = function(data) {
        completeReceiveCB();
        var digitalAudioInputs = data.result.digitalAudioInputMode;
        console.log("==========================================");
        console.log("execute getSignageInfo!!");
        for (var i in digitalAudioInputs) {
            console.log("index:" + i + ", value" + digitalAudioInputs[i]);
        }
        console.log("==========================================");

        try{
            setComboValue('inputdp-combo', digitalAudioInputs['dp']);
        }catch(e){
            console.log(e.stack);
            setComboValue('inputdp-combo', 'None');
        }
        
        try{
            setComboValue('inputhdmi1-combo', digitalAudioInputs['hdmi1']);
        }catch(e){
            console.log(e.stack);
            setComboValue('inputhdmi1-combo', 'None');
        }
        
        try{
            setComboValue('inputhdmi2-combo', digitalAudioInputs['hdmi2']);
        }catch(e){
            setComboValue('inputhdmi2-combo', 'None');
            console.log(e.stack);
        }
        completeReceiveCB();
        callMessage("getSoundStatus");
    };

    parser.getSoundStatus = function(data) {
        console.log("===============================================");
        console.log("callback getSoundStatus");
        console.log("===============================================");
        console.log("hakjoo " + data.result.muted);
        
        createPercentSlider('level-slider', data.result.level / 100, setVolumnLevel);

        var mute = data.result.muted;
        $("#mute-toggle-value").val(getToggleValue("#mute-toggle") ? 1 : 0);
        if (getToggleValue("#mute-toggle") != ( mute ? 'On' : 'Off')) {
            $("#mute-toggle").click();
        }

    
        $("#mute-toggle").on('click', function() {
            var value = getToggleValue("#mute-toggle");
            value = (value == 'On' ? 1 : 0);
            $("#mute-toggle-value").val(value);
            setMuted();
        });

        var externalspeaker = data.result.externalSpeaker;
        $("#externalspeaker-toggle-value").val(getToggleValue("#externalspeaker-toggle") ? 1 : 0);
        if (getToggleValue("#externalspeaker-toggle") != ( externalspeaker ? 'On' : 'Off')) {
            $("#externalspeaker-toggle").click();
        }

        $("#externalspeaker-toggle").on('click', function() {
            var value = getToggleValue("#externalspeaker-toggle");
            value = (value == 'On' ? 1 : 0);
            $("#externalspeaker-toggle-value").val(value);
            setExternalSpeaker();
        });
        completeReceiveCB();
    };

    function setDigitalAudioInput() {
        var cmd = {};
        cmd.api = "setDigitalAudioInput";
        cmd.param = {
            hdmi1 : $("#inputhdmi1-combo-value").val(),
            hdmi2 : $("#inputhdmi2-combo-value").val(),
            dp : $("#inputdp-combo-value").val()
        };

        console.log("hdmi1 >" + $("#inputhdmi1-combo-value").val());
        console.log("hdmi2 >" + $("#inputhdmi2-combo-value").val());
        console.log("dp >" + $("#inputdp-combo-value").val());
        callMessage(cmd);
    }


    $("#inputdp_combo_value_1").click(function() {
        setComboValue('inputdp-combo', "HDMI_DP");
    });
    $("#inputdp_combo_value_2").click(function() {
        setComboValue('inputdp-combo', "AUDIO_IN");
    });

    $("#inputhdmi1_combo_value_1").click(function() {
        setComboValue('inputhdmi1-combo', "HDMI_DP");
    });
    $("#inputhdmi1_combo_value_2").click(function() {
        setComboValue('inputhdmi1-combo', "AUDIO_IN");
    });

    $("#inputhdmi2_combo_value_1").click(function() {
        setComboValue('inputhdmi2-combo', "HDMI_DP");
    });
    $("#inputhdmi2_combo_value_2").click(function() {
        setComboValue('inputhdmi2-combo', "AUDIO_IN");
    });

    $("#inputdp-combo").on("change", setDigitalAudioInput);
    $("#inputhdmi1-combo").on("change", setDigitalAudioInput);
    $("#inputhdmi2-combo").on("change", setDigitalAudioInput);
});
