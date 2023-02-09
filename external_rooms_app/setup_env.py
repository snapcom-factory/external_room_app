import os

IN_DOCKER = not os.path.isfile("../Dockerfile")

if IN_DOCKER:
    print("\nApp running in Docker container...")
    ENV_VARIABLES = os.environ

    OBTP_IP = ENV_VARIABLES["OBTP_IP"] # 192.168.30.76 ?
    OBTP_PORT = ENV_VARIABLES["OBTP_PORT"] # default to 8000

    MAGNIFY_FRONTEND_URL = ENV_VARIABLES["MAGNIFY_FRONTEND_URL"] # http://ip:port
    MAGNIFY_API_URL = ENV_VARIABLES["MAGNIFY_API_URL"] # http://ip:port
    KEYCLOAK_URL = ENV_VARIABLES["KEYCLOAK_URL"] # http://ip:port

    AUTHORIZED_HOSTS = ENV_VARIABLES["AUTHORIZED_HOSTS"] # "10.92.11.15-192.168.30.76" for example

    POSTGRES_HOST = ENV_VARIABLES["POSTGRES_HOST"] # ip
    POSTGRES_DB = ENV_VARIABLES["POSTGRES_DB"] # name of the database
    POSTGRES_USER = ENV_VARIABLES["POSTGRES_USER"] # username
    POSTGRES_PASSWORD = ENV_VARIABLES["POSTGRES_PASSWORD"] # user password
    POSTGRES_PORT = ENV_VARIABLES["POSTGRES_PORT"] # 8008

    MODE = ENV_VARIABLES["MODE"] # pull/push
else:
    print("\nApp running outside of a Docker container...")

    OBTP_IP = "192.168.30.76"
    OBTP_PORT = 8000

    MAGNIFY_FRONTEND_URL = "http://localhost:8070"
    MAGNIFY_API_URL = "http://localhost:8071"
    KEYCLOAK_URL = "http://localhost:8080"

    AUTHORIZED_HOSTS = "localhost"

    POSTGRES_HOST = "localhost"
    POSTGRES_DB = "external_database"
    POSTGRES_USER = "admin"
    POSTGRES_PASSWORD = "admin"
    POSTGRES_PORT = 8008

    MODE = "pull"