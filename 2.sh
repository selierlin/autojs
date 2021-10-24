#!/bin/bash

echo "你好"

mydate=$(date --date='2021-09-02 09:18:00' +%s)
echo mydate = "$mydate"