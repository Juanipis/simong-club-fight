# VARIABLES DE ENTORNO NECESARIAS

POSTGRES_USER=test_user
POSTGRES_PASSWORD=test_password
POSTGRES_DB=test_db
PGADMIN_DEFAULT_EMAIL=test@example.com
PGADMIN_DEFAULT_PASSWORD=secret

# databese users

DB_ADMIN_USER=admin_user
DB_ADMIN_PASSWORD=admin_pass
DB_DEV_USER=dev_user
DB_DEV_PASSWORD=dev_pass
DB_APP_USER=app_user
DB_APP_PASSWORD=app_password
DB_READONLY_USER=readonly_user
DB_READONLY_PASSWORD=readonly_pass

# CORRER BASE DE DATOS

docker-compose --env-file test.env up -d

docker-compose --env-file production.env up -d
