#!/bin/bash

app="signage_example";



if [ -a "pid/$app.pid" ];
then
	echo "Already Run!"
else
	echo "[`date`] Start Sample Application!" > "log/rpc-server.log"

	cd "..";
	cp -r upload_db.json_org upload_db.json

	if [ $# -eq 0 ]; then
	    node server.js > "bin/log/web-server.log" &
	    node rpc-server.js > "bin/log/rpc-server.log" &
	else
	    node server.js > "bin/log/web-server.log" &
	    node rpc-server.js $1 > "bin/log/rpc-server.log" &
	fi


	ps -C node |tail -n2 | cut -d' ' -f1-2 >> "bin/pid/$app.pid"

	echo "Application Run!"
fi

