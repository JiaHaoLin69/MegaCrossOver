#!/bin/bash

dependencias(){
    npm install
}

start-dev() {
    npm run dev   
}

main(){
    dependencias
    start-dev
    tail -f /dev/null
}