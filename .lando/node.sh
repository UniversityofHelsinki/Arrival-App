#!/bin/sh
set -exu

cd /app/arrival
npm install
bower install
gulp

cd /app/drupal
ln -sf ../arrival/dist app

cd /app/drupal/sites/default
ln -sf ../../../files files

cd /app/
chmod -R a+w files
