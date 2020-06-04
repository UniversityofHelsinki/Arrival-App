#!/bin/bash
set -exu

# Synchronise local database with selected environment.

# Set paths.
webroot=/app/drupal

# Set Drush aliases.
site=@uniarrival
local=@uniarrival.local

#Set default syncdb environment.
env=prod

function usage {
  echo "Usage: $0 [prod]"
  exit 1
}

if [ "$#" -gt 1 ]; then
  usage
fi

if [ "$#" -eq 1 ]; then
  if [ "$1" != "prod" ]; then
    usage
  fi
  env=prod
fi

# Synchronize & sanitize database from selected environment.
cd "$webroot"
rm -rf /app/dump.sql
drush "$local" sql-drop -y
drush "$site.$env" sql-dump --structure-tables-list=cache,history,sessions,watchdog > /app/dump.sql
drush "$local" sql-query --file=/app/dump.sql -y
drush "$local" cc drush
drush "$local" cr
rm -rf /app/dump.sql
