# Usa una imagen base con PostgreSQL cliente instalado
FROM postgres:latest

# Instalar dockerize u otra herramienta de espera si es necesario
# Por ejemplo, para usar dockerize puedes descomentar la siguiente línea
# RUN apt-get update && apt-get install -y wget && \
#     wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz \
#     && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.6.1.tar.gz && rm dockerize-linux-amd64-v0.6.1.tar.gz

# Copiar el script al contenedor
COPY create_roles.sh /usr/local/bin/create_roles.sh

# Hacer el script ejecutable
RUN chmod +x /usr/local/bin/create_roles.sh

# El comando por defecto puede ser sobrescrito por docker-compose
CMD ["postgres"]
