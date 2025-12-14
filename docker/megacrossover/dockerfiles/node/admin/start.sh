#!/bin/bash

set -e 

load_entrypoint_nginx(){
    bash /root/admin/nginx/admin/start.sh
}

workdir(){
    cd /root/admin/node/proyectos/pmegacrossover
}

certificados_ssl(){

    mkdir -p /etc/nginx/certs
    cp /root/admin/node/proyectos/pmegacrossover/cert/ /etc/nginx/certs/

}

ajustar_nginx(){
    echo "Configurando Nginx con SSL..."
    
    # Sobrescribimos el archivo 'default' de Nginx
    # Usamos 'EOF' con comillas para que no intente interpretar variables como $uri
    cat > /etc/nginx/sites-available/default <<'EOF'
# 1. BLOQUE HTTP (Puerto 80) -> Redirige a HTTPS
server {
    listen 80;
    listen [::]:80;

    # Lista de todos tus dominios
    server_name megacrossover.com www.megacrossover.com 
                megacrossover.es www.megacrossover.es 
                megacrossover.net www.megacrossover.net;

    # Redirección permanente
    return 301 https://$host$request_uri;
}

# 2. BLOQUE HTTPS (Puerto 443) -> Servidor Seguro
server {
    listen 443 ssl;
    listen [::]:443 ssl;

    # Lista de todos tus dominios
    server_name megacrossover.com www.megacrossover.com 
                megacrossover.es www.megacrossover.es 
                megacrossover.net www.megacrossover.net;

    root /var/www/html;
    index index.html index.htm;

    # --- TUS CERTIFICADOS ---
    # Nginx los buscará aquí. Asegúrate de haber mapeado el volumen en docker-compose
    ssl_certificate /etc/nginx/certs/fullchain.pem; 
    ssl_certificate_key /etc/nginx/certs/privkey.pem;

    # Configuración básica de seguridad SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        # Importante para que funcione React Router al recargar página
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