#!/bin/bash
set -exu

# Synchronise local database with the production environment.
cd /app/drupal
drush sql-drop -y
drush sql-sync @prod @local -y
drush sqlsan -y
drush cc drush
drush cr
