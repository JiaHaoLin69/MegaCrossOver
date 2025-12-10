#!/bin/bash

load_entrypoint_nginx(){
    bash /root/admin/nginx/admin/start.sh
}


dependencias(){
    npm install
}

start-dev() {
    npm run dev   
}

main(){
    load_entrypoint_nginx
    dependencias
    start-dev
    tail -f /dev/null
}

main