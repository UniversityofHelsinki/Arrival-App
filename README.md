# The Uni Arrival Advisor

The [Uni Arrival Advisor](https://uniarrival.helsinki.fi/) will guide you through the steps you need to take on your path to the University of Helsinki. Answer these questions to get a checklist that guides you through the process of arriving in Finland and settling in.

## Local development

### Setup

1. Read the [Lando docs](https://docs.lando.dev/) and install the **latest** [Lando](https://github.com/lando/lando/releases).
2. Check out the repo: `git clone git@github.com:UniversityofHelsinki/Arrival-App.git uniarrival && cd uniarrival`.
3. Start the site by running `lando start`.
4. Import data:
   1. `lando syncdb` - (**add your public key to production server & connect to VPN first!**) synchronise local DB with production or
   2. `lando db-import <dumpfile>`.
5. Update database & enable develpoment components: `lando update`.
6. Go to <https://uniarrival.lndo.site/>.

### Services

- <https://adminer-uniarrival.lndo.site> - Adminer for database management, log in **without** entering the credentials.
- <https://mail-uniarrival.lndo.site> - Mailhog for mail management.

### Tools

Full commands/tools overview is available by running `lando`. Custom tools:

- `lando bower`, `lando gulp`, `lando npm` - frontend tooling,
- `lando syncdb` - synchronise local database with production,
- `lando update` - update local database,
- `lando xdebug-on` - enables xdebug,
- `lando xdebug-off` - disables xdebug.

## Deployment to production

1. Generate the production package: `lando production`.
2. Copy production package to the server: `scp production.tgz wunderkraut@uniarrival.it.helsinki.fi:`.
3. Log in to server: `ssh wunderkraut@uniarrival.it.helsinki.fi`.
4. Run deployment steps:

```sh
sudo rm -rf /var/www/current/production.tgz
sudo mv /home/wunderkraut/production.tgz /var/www/current/production.tgz
sudo tar xvfz /var/www/current/production.tgz
sudo chown -R wunderkraut:wunderkraut /var/www/current
sudo chown -R wunderkraut:wunderkraut /data/drupal/files
cd /var/www/current/drupal
/var/www/current/vendor/bin/drush updb -y
/var/www/current/vendor/bin/drush cim -y
/var/www/current/vendor/bin/drush cc drush -y
/var/www/current/vendor/bin/drush cr -y
sudo chown -R apache:apache /var/www/current
sudo chown -R apache:apache /data/drupal/files
```

Replace `wunderkraut` username here and in `drush/sites/uniarrival.site.yml` if needed.
