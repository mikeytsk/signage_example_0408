#!/bin/bash

app="signage_example"
if [ -a "pid/$app.pid" ];
then
	echo "success";
	for pid in `cat "pid/$app.pid"`
	do
		kill -9 $pid;
	done
	rm "pid/$app.pid"
else 
	echo "not running";
fi
