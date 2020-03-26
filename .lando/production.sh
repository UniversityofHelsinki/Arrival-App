#!/bin/sh
set -exu

rm -Rf /app/production /app/production.tgz

mkdir -p /app/production/drupal/modules/custom
mkdir -p /app/production/drupal/themes/custom
mkdir -p /app/production/config/
mkdir -p /app/production/drupal/app
mkdir -p /app/production/drupal/sites/default

cp -a /app/composer.json /app/production/composer.json
cp -a /app/composer.lock /app/production/composer.lock
cp -a /app/load.environment.php /app/production/load.environment.php
cp -a /app/web/modules/custom/ /app/production/drupal/modules/
cp -a /app/web/themes/custom/ /app/production/drupal/themes/
cp -a /app/config/sync/ /app/production/config/
cp -a /app/arrival/dist/. /app/production/drupal/app/
cp -a /app/vendor/ /app/production/
cp -a /app/web/.htaccess /app/production/drupal/.htaccess
cp -a /app/web/index.php /app/production/drupal/index.php
cp -a /app/web/autoload.php /app/production/drupal/autoload.php
cp -a /app/conf/prod.settings.php /app/production/drupal/sites/default/settings.local.php
cp -a /app/web/sites/default/settings.php /app/production/drupal/sites/default/settings.php
cp -a /app/README.md /app/production/README.md

cd /app/production/drupal/sites/default
ln -sf ../../../../files files

cd /app/production
tar -czf /app/production.tgz .
