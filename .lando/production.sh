#!/bin/sh
set -exu

rm -Rf /app/production
rm -f /app/production.tgz
mkdir -p /app/production/drupal/modules/custom
mkdir -p /app/production/drupal/themes/custom
mkdir -p /app/production/config/
mkdir -p /app/production/drupal/app
mkdir -p /app/production/drupal/sites/default

cp -a /app/composer.json /app/production/composer.json
cp -a /app/drupal/modules/custom/ /app/production/drupal/modules/custom/
cp -a /app/drupal/themes/custom/ /app/production/drupal/themes/custom/
cp -a /app/config/sync/ /app/production/config/
cp -a /app/arrival/dist/ /app/production/drupal/app/
cp -a /app/drupal/.htaccess /app/production/drupal/.htaccess
cp -a /app/drupal/index.php /app/production/drupal/index.php
cp -a /app/drupal/autoload.php /app/production/drupal/autoload.php
cp -a /app/conf/prod.settings.php /app/production/drupal/sites/default/settings.php
cd /app/production/drupal/sites/default
ln -sf ../../../files files

cd /app/production && tar cvfz ../production.tgz .
