#!/bin/bash
set -exu

# Update local database.
drush @local updb -y

# Remove production modules.
drush @local pmu warden -y

# Clear caches.
drush @local cc drush
drush @local cr -y

# Generate login URL.
drush @local uli
