#!/bin/bash
PGPASSWORD=root
psql --username=root --dbname=root --file=docker-entrypoint-initdb.d/psql-import-csvs.txt