#!/bin/bash
set -exu

chmod -R a+w /app/drupal/sites/default

LOCAL=@uniarrival.local

# Update local database.
drush "$LOCAL" updb -y

# Remove production modules.
drush "$LOCAL" pmu warden -y

# Clear caches.
drush "$LOCAL" cc drush
drush "$LOCAL" cr -y

# Generate login URL.
drush "$LOCAL" uli
