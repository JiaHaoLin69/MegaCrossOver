#!/bin/bash
set -e 

# --- Logging Utils ---
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

log_info() { echo -e "${CYAN}[$(date +'%Y-%m-%dT%H:%M:%S')] [INFO] $1${NC}"; }
log_success() { echo -e "${GREEN}[$(date +'%Y-%m-%dT%H:%M:%S')] [SUCCESS] $1${NC}"; }
log_warn() { echo -e "${YELLOW}[$(date +'%Y-%m-%dT%H:%M:%S')] [WARN] $1${NC}"; }
log_error() { echo -e "${RED}[$(date +'%Y-%m-%dT%H:%M:%S')] [ERROR] $1${NC}"; }

load_entrypoint_nginx(){
    log_info "Calling Nginx entrypoint..."
    if [ -f "/root/admin/nginx/admin/start.sh" ]; then
        bash /root/admin/nginx/admin/start.sh &
        # We run it in background or sequentially? 
        # The original script just ran it. Assuming it blocks or handles services.
        # Wait, original script had `service nginx restart` etc.
        # Let's trust the chain needs to run sequentially for setup.
        # However, if previous entrypoint has `tail -f`, we are blocked.
        # The previous Nginx entrypoint ends in `nginxreload` then `tail -f /dev/null` was commented out.
        # So it returns? No, `nginx -g daemon off` blocks.
        # This architecture is tricky. Node -> Nginx ?
        # If Nginx starts and blocks, Node code below won't run.
        # Let's assume we need to start Nginx in background or just setup configuration?
        # Looking at original: `load_entrypoint_nginx` was called FIRST.
        # Provide support for it not blocking.
        true
    else
        log_error "Nginx entrypoint not found at /root/admin/nginx/admin/start.sh"
    fi
}

workdir(){
    PROJECT_PATH="/root/admin/node/proyectos/pmegacrossover"
    if [ -d "$PROJECT_PATH" ]; then
        cd "$PROJECT_PATH"
        log_info "Working directory set to: $(pwd)"
    else
        log_error "Project path not found: $PROJECT_PATH"
        exit 1
    fi
}

dependencias(){
    if [ "$ENV_MODE" = "dev" ]; then
        log_info "Modo DESARROLLO detectado."
        if [ ! -d "node_modules" ]; then
            log_warn "node_modules no existe. Instalando..."
            npm install
        fi
        log_info "Iniciando servidor de desarrollo..."
        exec npm run dev
    else
        log_info "Modo PRODUCCIÓN (Build)."
        log_info "Instalando dependencias..."
        npm install
        
        log_info "Construyendo proyecto..."
        npm run build
        
        if [ -d "dist" ]; then
            log_success "Build completado. Copiando a /var/www/html..."
            cp -r dist/* /var/www/html/
        else
            log_error "No se generó la carpeta 'dist'. Fallo en build."
        fi
    fi
}

# NOTE: The original script called nginxreload at the end. 
# But this is inside the Node container? 
# The Dockerfile says `FROM jiahaolin69/nginx` -> which implies this image has Nginx.
# So we are responsible for starting Nginx too.

nginxreload(){
    log_info "Verificando configuración Nginx..."
    nginx -t
    log_info "Iniciando Nginx..."
    # If we are in dev mode, we already exec'd npm run dev, so we won't reach here?
    # FIX: Run Nginx in background if dev mode? 
    # Usually you don't run two services (Node + Nginx) in one container easily without supervisord.
    # But let's stick to the flow. 
    # If ENV_MODE=dev, we prioritize Node dev server output.
    
    if [ "$ENV_MODE" != "dev" ]; then
        nginx -g 'daemon off;'
    fi
}

main(){
    # 1. Setup Nginx (configuration, certs) - from inherited image scripts
    load_entrypoint_nginx
    
    # 2. Go to project
    workdir
    
    # 3. Handle Node (Install/Build/Run)
    dependencias
    
    # 4. If we didn't exec (production mode), start Nginx final
    # Note: dependencias() in Prod mode just builds and copies.
    nginxreload
    
    #tail -f /dev/null
}

main