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

## Production

### Generation of production build

```sh
lando production
```

### Deploying to production

```sh
scp production.tgz $kevari@uniarrival.it.helsinki.fi:
ssh $kevari@uniarrival.it.helsinki.fi
cd /var/www/current
sudo mv /home/$kevari/production.tgz .
sudo tar xvfz production.tgz
sudo chown -R apache:apache .
cd drupal && ../vendor/bin/drush cim -y
```

$kevari is your kevyttunnus which you can get from HY.
