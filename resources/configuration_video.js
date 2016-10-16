// video configuration js
var _initPageStatusOfConfigurationVideo = false;
function setPictureProperty() {
    var cmd = {};
    cmd.api = "setPictureProperty";
    cmd.param = {
        'backlight' : $("#backlight-slider-value").val(),
        'brightness' : $("#brightness-slider-value").val(),
        'contrast' : $("#contrast-slider-value").val(),
        'color' : $("#color-slider-value").val(),
        'tint' : $("#tint-slider-value").val()
    };
    callMessage(cmd);
}

function setComboValue(elId, val) {
    $("#" + elId + "-value").val(val);
    $("#" + elId).text(val);
    $("#" + elId).change();

    console.log("execute setComboValue [el:" + elId + ", value:" + val + "]");
    console.log("combo -value change");
    console.log("combo text change");
    console.log("combo event dispatch");
}

function setTileInfo(e) {
    setTileInfo();
}

function setTileInfo() {
    console.log("=============================================");
    console.log("execute setTileInfo");
    console.log("enalbed:" + $("#enabled-toggle-value").val());
    console.log("naturalMode:" + $("#naturalMode-toggle-value").val());
    console.log("row:" + $("#row-combo-value").val());
    console.log("column:" + $("#column-combo-value").val());
    console.log("tileId:" + $("#tileid-combo-value").val());
    console.log("=============================================");
    var cmd = {};
    cmd.api = "setTileInfo";
    cmd.param = {
        'enabled' : ($("#enabled-toggle-value").val() == 1 ? true : false),
        'row' : $("#row-combo-value").val(),
        'column' : $("#column-combo-value").val(),
        'tileId' : $("#tileid-combo-value").val(),
        'naturalMode' : ($("#naturalMode-toggle-value").val() == 1 ? true : false)
    };
    callMessage(cmd);
}


$("#video_eventlistener").on('click', function() {

    initProgress(4);

    function setPictureModeValue(id) {
        $("#pictureMode-combo").text(id);

        switch(id) {
            case 'standard':
                id = "normal";
                break;
            case 'aps':
                id = "eco";
                break;
        }

        var cmd = {
            api : 'setPictureMode',
            param : id
        };

        callMessage(cmd);
    }

    function showEl(id) {
        $("#property-" + id).show();
    }

    function hideEl(id) {
        $("#property-" + id).hide();
    }

    function getValueByEl(id) {
        return $("#pictureMode-property-" + id).val();
    }

    function setValueByEl(id, value) {
        $("#pictureMode-property-" + id).val(value);
    }

    function getTextByEl(id) {
        return $("#pictureMode-property-" + id).text();
    }

    function setTextByEl(id, value) {
        $("#pictureMode-property-" + id).text(value);
    }

    if (!_initPageStatusOfConfigurationVideo) {
        hideEl("backlight");
        hideEl("contrast");
        hideEl("brightness");
        hideEl("color");
        hideEl("tint");
        hideEl("noisereduction");
        hideEl("mpegnoisereduction");
        hideEl("blacklevel");
        hideEl("gamma");
        hideEl("sharpness");
        hideEl("colortemperature");
        hideEl("hsharpness");
        hideEl("vsharpness");
        hideEl("dynamiccontrast");
        hideEl("superresolution");
        hideEl("colorgamut");
        hideEl("dynamiccolor");
        _initPageStatusOfConfigurationVideo = true;
    }

    $("#btnUpdatePictureMode").click(function() {
        var mode = $("#pictureMode-combo").text();
        var options = {};

        switch(mode) {
            case 'vivid':
                options.backlight = getValueByEl("backlight");
                options.contrast = getValueByEl("contrast");
                options.brightness = getValueByEl("brightness");
                options.sharpness = getValueByEl("sharpness");
                options.color = getValueByEl("color");
                options.tint = getValueByEl("tint");
                options.colorTemperature = getValueByEl("colortemperature");
                options.noiseReduction = getTextByEl("noisereduction");
                options.mpegNoiseReduction = getTextByEl("mpegnoisereduction");
                options.blackLevel = getTextByEl("blacklevel");
                options.gamma = getTextByEl("gamma");
                break;
            case 'standard':
                options.backlight = getValueByEl("backlight");
                options.contrast = getValueByEl("contrast");
                options.brightness = getValueByEl("brightness");
                options.sharpness = getValueByEl("sharpness");
                options.color = getValueByEl("color");
                options.tint = getValueByEl("tint");
                options.colorTemperature = getValueByEl("colortemperature");
                options.dynamicContrast = getTextByEl("dynamiccontrast");
                options.superResolution = getTextByEl("superresolution");
                options.colorGamut = getTextByEl("colorgamut");
                options.dynamicColor = getTextByEl("dynamiccolor");
                options.noiseReduction = getTextByEl("noisereduction");
                options.mpegNoiseReduction = getTextByEl("mpegnoisereduction");
                options.blackLevel = getTextByEl("blacklevel");
                options.gamma = getTextByEl("gamma");
                break;
            case 'aps':
                options.backlight = getValueByEl("backlight");
                options.contrast = getValueByEl("contrast");
                options.brightness = getValueByEl("brightness");
                options.sharpness = getValueByEl("sharpness");
                options.color = getValueByEl("color");
                options.tint = getValueByEl("tint");
                options.colorTemperature = getValueByEl("colortemperature");
                options.dynamicContrast = getTextByEl("dynamiccontrast");
                options.superResolution = getTextByEl("superresolution");
                options.colorGamut = getTextByEl("colorgamut");
                options.dynamicColor = getTextByEl("dynamiccolor");
                options.noiseReduction = getTextByEl("noisereduction");
                options.mpegNoiseReduction = getTextByEl("mpegnoisereduction");
                options.blackLevel = getTextByEl("blacklevel");
                options.gamma = getTextByEl("gamma");
                break;
            case 'cinema':
                options.backlight = getValueByEl("backlight");
                options.contrast = getValueByEl("contrast");
                options.brightness = getValueByEl("brightness");
                options.sharpness = getValueByEl("sharpness");
                options.color = getValueByEl("color");
                options.tint = getValueByEl("tint");
                options.dynamicContrast = getTextByEl("dynamiccontrast");
                options.superResolution = getTextByEl("superresolution");
                options.colorGamut = getTextByEl("colorgamut");
                options.dynamicColor = getTextByEl("dynamiccolor");
                options.noiseReduction = getTextByEl("noisereduction");
                options.mpegNoiseReduction = getTextByEl("mpegnoisereduction");
                options.blackLevel = getTextByEl("blacklevel");
                options.gamma = getTextByEl("gamma");
                break;
            case 'sports':
                options.backlight = getValueByEl("backlight");
                options.contrast = getValueByEl("contrast");
                options.brightness = getValueByEl("brightness");
                options.sharpness = getValueByEl("sharpness");
                options.color = getValueByEl("color");
                options.tint = getValueByEl("tint");
                options.colorTemperature = getValueByEl("colortemperature");
                options.dynamicContrast = getTextByEl("dynamiccontrast");
                options.superResolution = getTextByEl("superresolution");
                options.colorGamut = getTextByEl("colorgamut");
                options.dynamicColor = getTextByEl("dynamiccolor");
                options.noiseReduction = getTextByEl("noisereduction");
                options.mpegNoiseReduction = getTextByEl("mpegnoisereduction");
                options.blackLevel = getTextByEl("blacklevel");
                options.gamma = getTextByEl("gamma");
                break;
            case 'game':
                options.backlight = getValueByEl("backlight");
                options.contrast = getValueByEl("contrast");
                options.brightness = getValueByEl("brightness");
                options.sharpness = getValueByEl("sharpness");
                options.color = getValueByEl("color");
                options.tint = getValueByEl("tint");
                options.colorTemperature = getValueByEl("colortemperature");
                options.dynamicContrast = getTextByEl("dynamiccontrast");
                options.superResolution = getTextByEl("superresolution");
                options.colorGamut = getTextByEl("colorgamut");
                options.dynamicColor = getTextByEl("dynamiccolor");
                options.noiseReduction = getTextByEl("noisereduction");
                options.mpegNoiseReduction = getTextByEl("mpegnoisereduction");
                options.blackLevel = getTextByEl("blacklevel");
                options.gamma = getTextByEl("gamma");
                break;
            case 'expert1':
                options.backlight = getValueByEl("backlight");
                options.contrast = getValueByEl("contrast");
                options.brightness = getValueByEl("brightness");
                options.hSharpness = getValueByEl("hsharpness");
                options.vsharpness = getValueByEl("vsharpness");
                options.color = getValueByEl("color");
                options.tint = getValueByEl("tint");
                options.dynamicContrast = getTextByEl("dynamiccontrast");
                options.superResolution = getTextByEl("superresolution");
                options.colorGamut = getTextByEl("colorgamut");
                options.dynamicColor = getTextByEl("dynamiccolor");
                options.noiseReduction = getTextByEl("noisereduction");
                options.mpegNoiseReduction = getTextByEl("mpegnoisereduction");
                options.blackLevel = getTextByEl("blacklevel");
                options.gamma = getTextByEl("gamma");
                break;
            case 'expert2':
                options.backlight = getValueByEl("backlight");
                options.contrast = getValueByEl("contrast");
                options.brightness = getValueByEl("brightness");
                options.hSharpness = getValueByEl("hsharpness");
                options.vsharpness = getValueByEl("vsharpness");
                options.color = getValueByEl("color");
                options.tint = getValueByEl("tint");
                options.dynamicContrast = getTextByEl("dynamiccontrast");
                options.superResolution = getTextByEl("superresolution");
                options.colorGamut = getTextByEl("colorgamut");
                options.dynamicColor = getTextByEl("dynamiccolor");
                options.noiseReduction = getTextByEl("noisereduction");
                options.mpegNoiseReduction = getTextByEl("mpegnoisereduction");
                options.blackLevel = getTextByEl("blacklevel");
                options.gamma = getTextByEl("gamma");
                break;
        }

        var cmd = {
            api : 'setPictureProperty',
            param : {
                'options' : options
            }
        };

        console.log(options);

        callMessage(cmd);

    });

    $("#pictureMode-property-dynamiccontrast-value1").click(function(e) {
        $("#pictureMode-property-dynamiccontrast").text(e.target.text);
    });
    $("#pictureMode-property-dynamiccontrast-value2").click(function(e) {
        $("#pictureMode-property-dynamiccontrast").text(e.target.text);
    });
    $("#pictureMode-property-dynamiccontrast-value3").click(function(e) {
        $("#pictureMode-property-dynamiccontrast").text(e.target.text);
    });
    $("#pictureMode-property-dynamiccontrast-value4").click(function(e) {
        $("#pictureMode-property-dynamiccontrast").text(e.target.text);
    });

    $("#pictureMode-property-superresolution-value1").click(function(e) {
        $("#pictureMode-property-superresolution").text(e.target.text);
    });
    $("#pictureMode-property-superresolution-value2").click(function(e) {
        $("#pictureMode-property-superresolution").text(e.target.text);
    });
    $("#pictureMode-property-superresolution-value3").click(function(e) {
        $("#pictureMode-property-superresolution").text(e.target.text);
    });
    $("#pictureMode-property-superresolution-value4").click(function(e) {
        $("#pictureMode-property-superresolution").text(e.target.text);
    });

    $("#pictureMode-property-colorgamut-value1").click(function(e) {
        $("#pictureMode-property-colorgamut").text(e.target.text);
    });
    $("#pictureMode-property-colorgamut-value2").click(function(e) {
        $("#pictureMode-property-colorgamut").text(e.target.text);
    });

    $("#pictureMode-property-dynamiccolor-value1").click(function(e) {
        $("#pictureMode-property-dynamiccolor").text(e.target.text);
    });
    $("#pictureMode-property-dynamiccolor-value2").click(function(e) {
        $("#pictureMode-property-dynamiccolor").text(e.target.text);
    });
    $("#pictureMode-property-dynamiccolor-value3").click(function(e) {
        $("#pictureMode-property-dynamiccolor").text(e.target.text);
    });
    $("#pictureMode-property-dynamiccolor-value4").click(function(e) {
        $("#pictureMode-property-dynamiccolor").text(e.target.text);
    });

    $("#pictureMode-property-noisereduction-value1").click(function(e) {
        $("#pictureMode-property-noisereduction").text(e.target.text);
    });
    $("#pictureMode-property-noisereduction-value2").click(function(e) {
        $("#pictureMode-property-noisereduction").text(e.target.text);
    });
    $("#pictureMode-property-noisereduction-value3").click(function(e) {
        $("#pictureMode-property-noisereduction").text(e.target.text);
    });
    $("#pictureMode-property-noisereduction-value4").click(function(e) {
        $("#pictureMode-property-noisereduction").text(e.target.text);
    });
    $("#pictureMode-property-noisereduction-value5").click(function(e) {
        $("#pictureMode-property-noisereduction").text(e.target.text);
    });

    $("#pictureMode-property-mpegnoisereduction-value1").click(function(e) {
        $("#pictureMode-property-mpegnoisereduction").text(e.target.text);
    });
    $("#pictureMode-property-mpegnoisereduction-value2").click(function(e) {
        $("#pictureMode-property-mpegnoisereduction").text(e.target.text);
    });
    $("#pictureMode-property-mpegnoisereduction-value3").click(function(e) {
        $("#pictureMode-property-mpegnoisereduction").text(e.target.text);
    });
    $("#pictureMode-property-mpegnoisereduction-value4").click(function(e) {
        $("#pictureMode-property-mpegnoisereduction").text(e.target.text);
    });
    $("#pictureMode-property-mpegnoisereduction-value5").click(function(e) {
        $("#pictureMode-property-mpegnoisereduction").text(e.target.text);
    });

    $("#pictureMode-property-blacklevel-value1").click(function(e) {
        $("#pictureMode-property-blacklevel").text(e.target.text);
    });
    $("#pictureMode-property-blacklevel-value2").click(function(e) {
        $("#pictureMode-property-blacklevel").text(e.target.text);
    });

    $("#pictureMode-property-gamma-value1").click(function(e) {
        $("#pictureMode-property-gamma").text(e.target.text);
    });
    $("#pictureMode-property-gamma-value2").click(function(e) {
        $("#pictureMode-property-gamma").text(e.target.text);
    });
    $("#pictureMode-property-gamma-value3").click(function(e) {
        $("#pictureMode-property-gamma").text(e.target.text);
    });

    $("#pictureMode-combo-cinema").click(function() {
        setPictureModeValue('cinema');
        callMessage('getPictureProperty');
        showEl("backlight");
        showEl("contrast");
        showEl("brightness");
        showEl("sharpness");
        showEl("color");
        showEl("tint");
        showEl("dynamiccontrast");
        showEl("superresolution");
        showEl("colorgamut");
        showEl("dynamiccolor");
        showEl("noisereduction");
        showEl("mpegnoisereduction");
        showEl("blacklevel");
        showEl("gamma");
        hideEl("hsharpness");
        hideEl("vsharpness");
        hideEl("colortemperature");
    });

    $("#pictureMode-combo-expert1").click(function() {
        setPictureModeValue('expert1');
        callMessage('getPictureProperty');
        showEl("backlight");
        showEl("contrast");
        showEl("brightness");
        showEl("hsharpness");
        showEl("vsharpness");
        showEl("color");
        showEl("tint");
        showEl("dynamiccontrast");
        showEl("superresolution");
        showEl("colorgamut");
        showEl("dynamiccolor");
        showEl("noisereduction");
        showEl("mpegnoisereduction");
        showEl("blacklevel");
        showEl("gamma");
        hideEl("sharpness");
        hideEl("colortemperature");
    });

    $("#pictureMode-combo-expert2").click(function() {
        setPictureModeValue('expert2');
        callMessage('getPictureProperty');
        showEl("backlight");
        showEl("contrast");
        showEl("brightness");
        showEl("hsharpness");
        showEl("vsharpness");
        showEl("color");
        showEl("tint");
        showEl("dynamiccontrast");
        showEl("superresolution");
        showEl("colorgamut");
        showEl("dynamiccolor");
        showEl("noisereduction");
        showEl("mpegnoisereduction");
        showEl("blacklevel");
        showEl("gamma");
        hideEl("sharpness");
        hideEl("colortemperature");
    });

    $("#pictureMode-combo-aps").click(function() {
        setPictureModeValue('aps');
        callMessage('getPictureProperty');
        showEl("backlight");
        showEl("contrast");
        showEl("brightness");
        showEl("sharpness");
        showEl("color");
        showEl("tint");
        showEl("dynamiccontrast");
        showEl("superresolution");
        showEl("colorgamut");
        showEl("dynamiccolor");
        showEl("noisereduction");
        showEl("mpegnoisereduction");
        showEl("blacklevel");
        showEl("gamma");
        hideEl("hsharpness");
        hideEl("vsharpness");
        hideEl("colortemperature");
    });

    $("#pictureMode-combo-game").click(function() {
        setPictureModeValue('game');
        callMessage('getPictureProperty');
        showEl("backlight");
        showEl("contrast");
        showEl("brightness");
        showEl("color");
        showEl("tint");
        showEl("dynamiccontrast");
        showEl("superresolution");
        showEl("colorgamut");
        showEl("dynamiccolor");
        showEl("noisereduction");
        showEl("mpegnoisereduction");
        showEl("blacklevel");
        showEl("gamma");
        showEl("sharpness");
        showEl("colortemperature");
        hideEl("hsharpness");
        hideEl("vsharpness");
    });

    $("#pictureMode-combo-sports").click(function() {
        setPictureModeValue('sports');
        callMessage('getPictureProperty');
        showEl("backlight");
        showEl("contrast");
        showEl("brightness");
        showEl("color");
        showEl("tint");
        showEl("dynamiccontrast");
        showEl("superresolution");
        showEl("colorgamut");
        showEl("dynamiccolor");
        showEl("noisereduction");
        showEl("mpegnoisereduction");
        showEl("blacklevel");
        showEl("gamma");
        showEl("sharpness");
        showEl("colortemperature");
        hideEl("hsharpness");
        hideEl("vsharpness");
    });

    $("#pictureMode-combo-standard").click(function() {
        setPictureModeValue('standard');
        callMessage('getPictureProperty');
        showEl("backlight");
        showEl("contrast");
        showEl("brightness");
        showEl("color");
        showEl("tint");
        showEl("dynamiccontrast");
        showEl("superresolution");
        showEl("colorgamut");
        showEl("dynamiccolor");
        showEl("noisereduction");
        showEl("mpegnoisereduction");
        showEl("blacklevel");
        showEl("gamma");
        showEl("sharpness");
        showEl("colortemperature");
        hideEl("hsharpness");
        hideEl("vsharpness");
    });

    $("#pictureMode-combo-vivid").click(function() {
        setPictureModeValue('vivid');
        callMessage('getPictureProperty');
        showEl("backlight");
        showEl("contrast");
        showEl("brightness");
        showEl("color");
        showEl("tint");
        showEl("noisereduction");
        showEl("mpegnoisereduction");
        showEl("blacklevel");
        showEl("gamma");
        showEl("sharpness");
        showEl("colortemperature");
        hideEl("hsharpness");
        hideEl("vsharpness");
        hideEl("dynamiccontrast");
        hideEl("superresolution");
        hideEl("colorgamut");
        hideEl("dynamiccolor");
    });

    completeReceiveCB();
    parser.getPictureProperty = function(data) {
        completeReceiveCB();

        setValueByEl("backlight", data.result.backlight);
        setValueByEl("color", data.result.color);
        setValueByEl("tint", data.result.tint);
        setValueByEl("brightness", data.result.brightness);
        setValueByEl("contrast", data.result.contrast);
        setValueByEl("sharpness", data.result.sharpness);
        setValueByEl("hsharpness", data.result.hsharpness);
        setValueByEl("vsharpness", data.result.vsharpness);
        var colTemp = data.result.colorTemperature;
        if(colTemp>100){
            colTemp = 100;
        }
        setValueByEl("colortemperature", colTemp);
        setTextByEl("dynamiccontrast", data.result.dynamicContrast);
        setTextByEl("superresolution", data.result.superResolution);
        setTextByEl("colorgamut", data.result.colorGamut);
        setTextByEl("dynamiccolor", data.result.dynamicColor);
        setTextByEl("noisereduction", data.result.noiseReduction);
        setTextByEl("mpegnoisereduction", data.result.mpegNoiseReduction);
        setTextByEl("blacklevel", data.result.blackLevel);
        setTextByEl("gamma", data.result.gamma);
    };

    callMessage('getTileInfo');
    parser.getTileInfo = function(data) {
        console.log("getTileInfo tileId> " + data.result.tileId);
        console.log("getTileInfo enabled> " + data.result.enabled);
        console.log("getTileInfo row> " + data.result.row);
        console.log("getTileInfo naturalMode> " + data.result.naturalMode);
        console.log("getTileInfo column> " + data.result.column);

        var tileEnable = data.result.enabled;
        var tileNaturalMode = data.result.naturalMode;
        
        console.log("enabled-toggle > " + getToggleValue("#enabled-toggle"));
        console.log("tileEnable > " + tileEnable);

    $("#enabled-toggle-value").val(tileEnable ? 1 : 0);
    $("#naturalMode-toggle-value").val(tileNaturalMode ? 1 : 0);
    
        //$("#enabled-toggle-value").val(getToggleValue("#enabled-toggle") ? 1 : 0);
        if (getToggleValue("#enabled-toggle") != ( tileEnable ? 'On' : 'Off')) {
            $("#enabled-toggle").click();
        }

        $("#enabled-toggle").on('click', function() {
            var value = getToggleValue("#enabled-toggle");
            value = (value == 'On' ? 1 : 0);
            $("#enabled-toggle-value").val(value);
            setTileInfo();
        });

        
        console.log("naturalMode-toggle > " + getToggleValue("#naturalMode-toggle"));
        console.log("tileNaturalMode > " + tileNaturalMode);

        //$("#naturalMode-toggle-value").val(getToggleValue("#naturalMode-toggle") ? 1 : 0);
        if (getToggleValue("#naturalMode-toggle") != ( tileNaturalMode ? 'On' : 'Off')) {
            $("#naturalMode-toggle").click();
        }

        $("#naturalMode-toggle").on('click', function() {
            var value = getToggleValue("#naturalMode-toggle");
            value = (value == "On" ? 1 : 0);
            $("#naturalMode-toggle-value").val(value);
            setTileInfo();
        });

        $("#tileid-combo-value").val(data.result.tileId);
        $("#row-combo-value").val(data.result.row);
        $("#column-combo-value").val(data.result.column);
        
        $("#tileid-combo").on("change", setTileInfo);
        $("#row-combo").on("change", setTileInfo);
        $("#column-combo").on("change", setTileInfo);
        
        setComboValue('tileid-combo', data.result.tileId);
        setComboValue('row-combo', data.result.row);
        setComboValue('column-combo', data.result.column);
        


        completeReceiveCB();
        callMessage('getVideoStatus');
    };

    parser.getVideoStatus = function(data) {
        writeMessage("getVideoStatus x> " + data.result.source.x);
        writeMessage("getVideoStatus y> " + data.result.source.y);
        writeMessage("getVideoStatus height> " + data.result.source.height);
        writeMessage("getVideoStatus width> " + data.result.source.width);

        $("#video_x").val(data.result.source.x);
        $("#video_y").val(data.result.source.y);
        $("#video_height").val(data.result.source.height);
        $("#video_width").val(data.result.source.width);
        completeReceiveCB();
    };

    $("#tileid_combo_value_1").click(function() {
        setComboValue('tileid-combo', 1);
    });
    $("#tileid_combo_value_2").click(function() {
        setComboValue('tileid-combo', 2);
    });
    $("#tileid_combo_value_3").click(function() {
        setComboValue('tileid-combo', 3);
    });
    $("#tileid_combo_value_4").click(function() {
        setComboValue('tileid-combo', 4);
    });
    $("#tileid_combo_value_5").click(function() {
        setComboValue('tileid-combo', 5);
    });
    $("#tileid_combo_value_6").click(function() {
        setComboValue('tileid-combo', 6);
    });
    $("#tileid_combo_value_7").click(function() {
        setComboValue('tileid-combo', 7);
    });
    $("#tileid_combo_value_8").click(function() {
        setComboValue('tileid-combo', 8);
    });
    $("#tileid_combo_value_9").click(function() {
        setComboValue('tileid-combo', 9);
    });

    $("#row_combo_value_1").click(function() {
        setComboValue('row-combo', 1);
    });
    $("#row_combo_value_2").click(function() {
        setComboValue('row-combo', 2);
    });
    $("#row_combo_value_3").click(function() {
        setComboValue('row-combo', 3);
    });

    $("#column_combo_value_1").click(function() {
        setComboValue('column-combo', 1);
    });
    $("#column_combo_value_2").click(function() {
        setComboValue('column-combo', 2);
    });
    $("#column_combo_value_3").click(function() {
        setComboValue('column-combo', 3);
    });

    $("#videoclippingBtn").on("click", function() {
        var cmd = {};
        cmd.api = "setVideoSize";
        cmd.param = {
            'x' : $("#video_x").val(),
            'y' : $("#video_y").val(),
            'width' : $("#video_width").val(),
            'height' : $("#video_height").val()
        };
        callMessage(cmd);
    });

});

$("#video_eventlistener").click();
