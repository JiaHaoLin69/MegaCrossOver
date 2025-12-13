#!/bin/bash

set -e 

load_entrypoint_nginx(){
    bash /root/admin/nginx/admin/start.sh
}

workdir(){
    cd /root/admin/node/proyectos/pmegacrossover
}

ajustar_nginx(){
    local ARCHIVO_CONF="/etc/nginx/sites-available/default"
    
    # Si copiaste tu nginx.conf en el paso anterior, esta función lo corregirá.
    # Si NO lo copiaste y usas el de por defecto de Nginx, también funcionará.

    # 1. Corregir la ruta
    sed -i 's|root /usr/share/nginx/html;|root /var/www/html;|g' "$ARCHIVO_CONF"

    # 2. Poner el dominio debajo de listen 80;
    if ! grep -q "server_name megacrossover.com" "$ARCHIVO_CONF"; then
        sed -i '/listen 80;/a \    server_name megacrossover.com www.megacrossover.com;' "$ARCHIVO_CONF"
    fi
    
    # (Opcional) Asegurar que try_files esté correcto para React si usas el default de Nginx
    # Esto busca la línea de try_files y la reemplaza por la buena
    sed -i 's|try_files .*;|try_files $uri $uri/ /index.html;|g' "$ARCHIVO_CONF"
}

dependencias(){
    npm install
    npm run build
    cp -r dist/* /var/www/html/
}


nginxreload(){
    nginx -t
    service nginx reload
}


main(){
    load_entrypoint_nginx
    workdir
    dependencias
    ajustar_nginx
    nginxreload
    tail -f /dev/null
}

main