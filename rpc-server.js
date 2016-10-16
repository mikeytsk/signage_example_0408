/*
 * rpc server ip settting!! --start
 */

var os = require('os');
var fs = require('fs');
//var mv = require('mv');

var ifaces = os.networkInterfaces();
var rpcServerIP = "0.0.0.0";
var rpcClientFile = "resources/rpc-client.js";



for (var dev in ifaces) {
    var alias = 0;
    ifaces[dev].forEach(function(details) {
        if (details.family == 'IPv4' && details.address != "127.0.0.1" && alias == 0) {
            rpcServerIP = details.address;
            alias++;
        }
    });
}


process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
    
    if (index === 2 && val !== undefined && typeof val === 'string' ) {
        rpcServerIP = val;    
    }
    
});


fs.readFile(rpcClientFile, function(err, data) {
    if (!err) {
        data = data.toString();
        var position = data.toString().indexOf('\n');
        if (position != -1) {
            data = data.substr(position + 1);
            data = "var url='" + rpcServerIP + "';\n\n" + data;
            fs.writeFile(rpcClientFile, data, function(err) {
                if (err) {
                    console.log(err);
                }
            });
        } else {
            console.log('no lines found');
        }
    } else {
        console.log(err);
    }
});
/*
* rpc server ip settting!! --end
*/

/*
* rpc server --start
*/

// devices info array [key:mac address]
var _dbFile = "upload_db.json";

var _devices = [];
var _debug = false;
var _default_mac = "00:00:00:00:00:00";
var _default_ip = "0.0.0.0";

// default 5min
var cine1 = 300000;
var cine2 = 300000;
var cine3 = 300000;

var io = require('socket.io').listen(6953);

function device(id, ip, mac) {
    var deviceInfo = {
        id : "none",
        ip : _default_ip,
        mac : _default_mac
    };

    deviceInfo.id = id == undefined || id == null ? "" : id;
    deviceInfo.ip = ip == undefined || ip == null ? "" : ip;
    deviceInfo.mac = mac == undefined || mac == null ? "" : mac;

    return deviceInfo;
}

function isNewNode(node, exist) {
    return node.ip == _default_ip || node.mac == _default_mac || exist ? true : false;
}

function addDevice(node) {
    var exist = false;

    try {
        for (var i in _devices) {
            if (_devices[i].mac == node.mac) {
                _devices[i].ip = node.ip;
                exist = true;
            }
        }

        if (isNewNode(node, exist)) {
            console.log("=============================================");
            console.log("is exist device info!");
            console.log("=============================================");
            return;
        }

        console.log("=============================================");
        console.log("add device! ");
        console.log("=============================================");
        _devices.push(node);

    } catch(e) {
        console.log(e.stack);
    }
}

function removeDevices(id) {
    var nodeIndex = -1;

    for (var i in _devices) {
        if (id == _devices[i].id) {
            console.log("=============================================");
            console.log("find id:" + id + " = " + _devices[i].id);
            console.log("=============================================");
            nodeIndex = i;
        }
    }

    if (i > -1) {
        // _devices.splice(nodeIndex, 1);
        console.log("=============================================");
        console.log("removeDevice index:" + nodeIndex);
        console.log("=============================================");
    }
}

// everyone
io.on('connection', function(socket) {
    socket.broadcast.send("connect new slave");
    socket.on('connect', function(client) {
        socket.broadcast.send("enter slave [id:" + client.id + "]");
        if (_debug) {
            socket.broadcast.emit("call", "enableDebugMode");
        } else {
            socket.broadcast.emit("call", "disableDebugMode");
        }
    });

    socket.on('disconnect', function() {
        socket.broadcast.send("disconnect slave");
        console.log("====================================");
        console.log("disconnect slave [id:" + socket.id + "]");
        console.log("remove item in devices!");
        console.log("====================================");
        removeDevices(socket.id);
    });

    socket.on('callback', function(data) {
        socket.broadcast.emit("callback", data);
    });

    socket.on('call', function(cmd) {
        try {
            socket.broadcast.emit("call", cmd);
        } catch(e) {
            console.log(e.stack);
        }

        console.log("api call [cmd:" + cmd + "]");
    });

    socket.on('message', function(data) {
        socket.broadcast.emit("message", data.msg);
    });

});

// p2p
io.sockets.on('connection', function(socket) {

    socket.on('callback', function(data) {
        try {
            if (data.api == "initNetworkInfo") {
                var node = device(socket.id, data.ip, data.mac);
                addDevice(node);
            }
            console.log("===============================================");
            console.log("callback [api:" + data.api + "]");
            console.log("callback [ip:" + data.ip + "]");
            console.log("callback [mac:" + data.mac + "]");
            console.log("===============================================");
        } catch(e) {
            console.log("simple callback");
        } finally {
            socket.emit('callback', '[receive callback :' + data + ']');
            socket.emit('call', {
                api : 'setSchedulingCineTimer',
                param : {
                    'cine1' : cine1,
                    'cine2' : cine2,
                    'cine3' : cine3
                }
            });
        }
    });

    socket.on('call', function(data) {
        socket.emit('call', '[receive call :' + data + ']');
    });

    socket.on('message', function(data) {
        socket.emit('message', '[receive message:' + data.msg + ']');
    });

    socket.on("master", function(data) {
        var cmd = {};
        if (data.api != undefined) {
            console.log("master data:" + data.api);
            switch(data.api) {
                case 'getDevices':
                    cmd = {
                        api : 'getDevices',
                        result : _devices
                    };
                    socket.emit('master', cmd);
                    break;
                case 'getSchedulingCineTimer':
                    cmd = {
                        'api' : 'getSchedulingCineTimer',
                        'result' : {
                            'cine1' : cine1,
                            'cine2' : cine2,
                            'cine3' : cine3
                        }
                    };
                    console.log("trans getSchedulingCineTimer > " + JSON.stringify(cmd));
                    socket.emit('master', cmd);
                    break;
                case 'setSchedulingCineTimer':
                    if (data.param != undefined) {
                        if (data.param.cine1 != undefined) {
                            cine1 = data.param.cine1;
                            cine2 = data.param.cine2;
                            cine3 = data.param.cine3;
                        }
                    }
                    console.log("setSchedulingCineTimer cine1 > " + cine1);
                    console.log("setSchedulingCineTimer cine2 > " + cine2);
                    console.log("setSchedulingCineTimer cine3 > " + cine3);

                    cmd = {
                        'api' : data.api,
                        'selectedDevice' : "",
                        'param' : {
                            'cine1' : cine1,
                            'cine2' : cine2,
                            'cine3' : cine3
                        }
                    };
                    socket.broadcast.emit('call', cmd);
                    break;
                case 'getContents':
                    cmd = {
                        api : 'getContents',
                        result : JSON.parse(fs.readFileSync(_dbFile))
                    };
                    socket.emit('master', cmd);
                    break;
                case 'uploadContents':
                    var db = JSON.parse(fs.readFileSync(_dbFile));
                    var size = db.contents.length - 1;
                    console.log("db : " + db);
                    
                    if (typeof db.contents[size] == 'undefined' || db.contents[size] == null
                            || typeof db.contents[size].files == 'undefined') {
                        console.log("db is not ready.");
                        break;
                    }
                    
                    var file = db.contents[size].files.uploadFile[0];
                    cmd = {
                        api : 'copyFile',
                        selectedDevice : data.selectedDevice,
                        param : {
                            'remoteFile' : file.path,
                            'saveFile' : file.originalFilename
                        }
                    };
                    socket.broadcast.emit('call', cmd);
                    break;
                case 'deployApplication':
                    /*
                    var db = JSON.parse(fs.readFileSync(_dbFile));
                    var size = db.contents.length - 1;
                    var file = db.contents[size].files == undefined || db.contents[size].files.uploadFile == undefined ? null : db.contents[size].files.uploadFile[0];

                    if (fs.existsSync('procentric/scap/application/scap_app.zip')) {
                        fs.unlink('procentric/scap/application/scap_app.zip', function(err) {
                            console.log('successfully deleted : procentric/scap/application/scap_app.zip');
                        });
                    }
                    
                    if (file != null) {
                        mv(file.path, 'procentric/scap/application/scap_app.zip', function(err) {});    
                    }
                    
                    cmd = {
                        api : 'upgradeApplication',
                        selectedDevice : data.selectedDevice,
                    };
                    socket.broadcast.emit('call', cmd);
                    */
                    break;
                case 'deleteContents':
                    if (data.param != undefined) {
                        if (data.param.index != undefined) {
                            var index = data.param.index;
                            var db = JSON.parse(fs.readFileSync(_dbFile));
                            db.contents.splice(index, 1);
                            var str = JSON.stringify(db);
                            fs.writeFileSync(_dbFile, str);
                        } else {
                            console.log("deleteContents command required 'data.param.index'!!!!");
                        }
                    } else {
                        console.log("deleteContents command required 'data.param.index'!!!!");
                    }
                    cmd = {
                        api : 'getContents',
                        result : JSON.parse(fs.readFileSync(_dbFile))
                    };
                    socket.emit('master', cmd);
                    break;
                default:
                    console.log("master command > not implement command! [api:" + data.api + "]");
                    console.log("add command in rpc-server.js");
                    break;
            }
        }
    });

    socket.on('slave', function(data) {
        socket.emit("slave", data);
    });
});

/*
 * rpc server --start
 */