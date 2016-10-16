cd ..
copy /y upload_db.json_org upload_db.json
IF "%1"=="" (
start /b "" "node" rpc-server.js
start /b "" "node" server.js
) ELSE (
start /b "" "node" rpc-server.js %1
start /b "" "node" server.js
)
cd bin