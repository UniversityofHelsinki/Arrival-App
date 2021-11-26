#!/bin/bash

set -euxo pipefail

read -p "Enter username: " user

FILE = /home/$user/production.tgz
if test -f "$FILE"; then
  sudo tar xvfz $FILE -C /var/www/current
  sudo chown -R $user:$user /var/www/current
  sudo chown -R $user:$user /data/drupal/files

  /var/www/current/vendor/bin/drush --root=/var/www/current/drupal updb -y
  /var/www/current/vendor/bin/drush --root=/var/www/current/drupal cim -y
  /var/www/current/vendor/bin/drush --root=/var/www/current/drupal cc drush
  /var/www/current/vendor/bin/drush --root=/var/www/current/drupal cr

  sudo chown -R apache:apache /var/www/current
  sudo chown -R apache:apache /data/drupal/files
else
  echo "Code archive $FILE does not exist"
fi
