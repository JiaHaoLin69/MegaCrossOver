#!/bin/bash
set -e

# --- Logging Utils ---
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log_info() { echo -e "${CYAN}[$(date +'%Y-%m-%dT%H:%M:%S')] [INFO] $1${NC}"; }
log_success() { echo -e "${GREEN}[$(date +'%Y-%m-%dT%H:%M:%S')] [SUCCESS] $1${NC}"; }
log_error() { echo -e "${RED}[$(date +'%Y-%m-%dT%H:%M:%S')] [ERROR] $1${NC}"; }

config_nginx() {
    log_info "Reiniciando servicios de Nginx..."
    if service nginx restart; then
        log_success "Nginx reiniciado correctamente."
        service nginx stop # Stop to allow manual control later if needed, or let typical entrypoint flow handle it
    else
        log_error "Fallo al reiniciar Nginx."
    fi
}

load_entrypoint_base(){
    log_info "Cargando entrypoint BASE..."
    if [ -f "/root/admin/base/start.sh" ]; then
        bash /root/admin/base/start.sh
    else
        log_error "Base entrypoint no encontrado."
    fi
}

certificados_ssl(){
    log_info "Preparando certificados SSL..."
    mkdir -p /etc/nginx/certs
    if [ -d "/root/admin/nginx/cert" ]; then
        cp -r /root/admin/nginx/cert/* /etc/nginx/certs/
        log_success "Certificados copiados."
    else
        log_error "Directorio de certificados /root/admin/nginx/cert no encontrado."
    fi
}

ajustar_nginx(){
    log_info "Generando configuración de Nginx (SSL)..."
    
    # Sobrescribimos el archivo 'default' de Nginx
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
    log_success "Configuración de Nginx generada."
}

main(){
 log_info "--- Iniciando Nginx Entrypoint ---"
 load_entrypoint_base
 certificados_ssl
 ajustar_nginx
 config_nginx
    # Mantener el contenedor en ejecución
    #tail -f /dev/null
}

main