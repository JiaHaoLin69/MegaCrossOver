#!/bin/bash

set -e 

load_entrypoint_nginx(){
    bash /root/admin/nginx/admin/start.sh
}

workdir(){
    cd /root/admin/node/proyectos/pmegacrossover
}

ajustar_nginx(){
    echo "Sobrescribiendo configuración de Nginx..."
    
    # IMPORTANTE: Usamos 'EOF' (con comillas) para proteger $uri
    cat > /etc/nginx/sites-available/default <<'EOF'
server {
    listen 80;
    listen [::]:80;

    server_name megacrossover.com www.megacrossover.com;

    root /var/www/html;
    index index.html index.htm;

    location / {
        # Ahora sí se escribirá correctamente $uri
        try_files $uri $uri/ /index.html;
    }
}
EOF
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