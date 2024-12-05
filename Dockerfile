FROM postgres:15.5

RUN apt-get update && apt-get install -y postgresql-15-cron && apt-get clean

COPY setup.sql /docker-entrypoint-initdb.d/setup.sql
