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
    
    # Creamos el archivo 'default' desde cero con la configuración correcta.
    # IMPORTANTE: Fíjate que usamos \$uri para que bash no intente interpretar la variable.
    cat > /etc/nginx/sites-available/default <<EOF
server {
    listen 80;
    listen [::]:80;

    server_name megacrossover.com www.megacrossover.com;

    root /var/www/html;
    index index.html index.htm;

    location / {
        # Esta linea es vital para React Router
        try_files \$uri \$uri/ /index.html;
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