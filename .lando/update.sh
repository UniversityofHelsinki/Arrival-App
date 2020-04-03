#!/bin/bash
set -exu

LOCAL=@uniarrival.local

# Update local database.
drush "$LOCAL" updb -y

# Import configuration.
drush "$LOCAL" cim -y

# Clear caches.
drush "$LOCAL" cc drush
drush "$LOCAL" cr -y

# Generate login URL.
drush "$LOCAL" uli
