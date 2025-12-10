#!/bin/bash

configurar_sudo() {
    if [ -f /etc/sudoers ]; then
    echo "$USUARIO ALL=(ALL) NOPASSWD: ALL" > "/etc/sudoers.d/$USUARIO"
    chmod 0440 "/etc/sudoers.d/$USUARIO"
    fi

}