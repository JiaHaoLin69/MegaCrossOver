#!/bin/bash

start-dev() {
    npm run dev   
}

main(){
    start-dev
    tail -f /dev/null
}