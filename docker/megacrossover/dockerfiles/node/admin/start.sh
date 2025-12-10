#!/bin/bash

load_entrypoint_nginx(){
    bash /root/admin/nginx/admin/start.sh
}

workdir(){
    cd /root/admin/node/proyectos/pmegacrossover
}

dependencias(){
    npm install
    cp -r dist/* /var/www/html/
}

start-dev() {
    npm run dev   
}

main(){
    load_entrypoint_nginx
    workdir
    dependencias
    start-dev
    tail -f /dev/null
}

main