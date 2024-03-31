#!/bin/bash

# Cargar las variables de entorno
source $1  # Pasa el archivo .env como argumento al script

# Conectarse a la base de datos utilizando las variables de entorno de PostgreSQL y crear los roles

PGPASSWORD=$POSTGRES_PASSWORD psql -U $POSTGRES_USER -d $POSTGRES_DB -c "
DO \$\$
BEGIN
    -- Crear el rol de administrador si no existe
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '$DB_ADMIN_USER') THEN
        CREATE ROLE $DB_ADMIN_USER LOGIN PASSWORD '$DB_ADMIN_PASSWORD' SUPERUSER;
    END IF;
    
    -- Crear el rol de desarrollador si no existe
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '$DB_DEV_USER') THEN
        CREATE ROLE $DB_DEV_USER LOGIN PASSWORD '$DB_DEV_PASSWORD' NOSUPERUSER;
    END IF;

    -- Crear el rol de aplicación si no existe
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '$DB_APP_USER') THEN
        CREATE ROLE $DB_APP_USER LOGIN PASSWORD '$DB_APP_PASSWORD' NOSUPERUSER;
    END IF;

    -- Crear el rol de solo lectura si no existe
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '$DB_READONLY_USER') THEN
        CREATE ROLE $DB_READONLY_USER LOGIN PASSWORD '$DB_READONLY_PASSWORD' NOSUPERUSER;
    END IF;
END
\$\$;"

# Asignar privilegios específicos aquí si es necesario
