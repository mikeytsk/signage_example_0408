var express = require('express');    //Express Web Server 
//var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
//var fs = require('fs-extra');       //File System - for file manipulation
//var util = require('util');

var app = express();
//app.use(busboy());
app.use(express.static(path.join(__dirname, './')));

/* ========================================================== 
Create a Route (/upload) to handle the Form submission 
(handle POST requests to /upload)
Express v4  Route definition
============================================================ */
/*
app.route('/upload')
    .post(function (req, res, next) {
        //console.log("request : " + JSON.stringify(req));
        
        var fstream;
        var files;
        var contentType;
        var contentDeviceID;
        
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);
            console.log("Uploading: fieldname " + fieldname);
            
            
            files = {uploadFile : []};
            var upload = {
                    'path' : 'upload/' + filename,
                    'originalFilename' : filename
            };
            
            files.uploadFile[0] = upload;
            
           
            
            //Path where image will be uploaded
            fstream = fs.createWriteStream(__dirname + '/upload/' + filename);
            file.pipe(fstream);
            fstream.on('close', function () {    
                console.log("Upload Finished of " + filename);
                res.end(insertDB(files, contentType, contentDeviceID));
                //res.redirect('back');           //where to go next
            });
        });
        
     // handle text field data (code taken from multer.js)
        req.busboy.on('field', function(fieldname, val, valTruncated, keyTruncated) {
            console.log("fieldname : " + fieldname + " val : " + val);
            
            switch (fieldname) {
            case 'contentDeviceID' :
                contentDeviceID = val + "";
                break;
            case 'contentType' :
                contentType = val + "";
                break;
            }
        });
    });

*/
//db for upload file
/*
var dbFile = "upload_db.json";
var db = [];

function insertDB(reqFile, reqType, reqId) {
    
    var db = [];
    try {
        var db = JSON.parse(fs.readFileSync(dbFile));    
    } catch(e) {
        console.log("DB was not initialized")
    }
    

    if (db.contents == undefined) {
        db.contents = [];
    }

    var content = {
        id : reqId,
        type : reqType,
        files : reqFile
    };

    db.contents.push(content);

    var str = JSON.stringify(db);
    console.log("insertDB, str  : " + str);
    
    fs.writeFileSync(dbFile, str);
}
*/

var server = app.listen(8592, function() {
    console.log('Listening on port %d', server.address().port);
});