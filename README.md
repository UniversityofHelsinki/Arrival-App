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
6. Import config if needed: `lando drush @local cim -y`.

### Sites

- <https://uniarrival.lndo.site/>

### Services

- <http://adminer-uniarrival.lndo.site> - Adminer for database management, log in **without** entering the credentials.
- <http://mail-uniarrival.lndo.site> - Mailhog for mail management.

### Tools

Full commands/tools overview is available by running `lando`. Custom tools:

- `lando bower`, `lando gulp`, `lando npm` - frontend tooling,
- `lando build` - build an app,
- `lando syncdb` - synchronise local database with production,
- `lando update` - update local database,
- `lando xdebug-on` - enables xdebug,
- `lando xdebug-off` - disables xdebug.

## Deployment to production

1. Generate the production package: `lando production`.
2. Copy production package to the server: `scp production.tgz [your-username]@uniarrival.it.helsinki.fi:.`.
3. Log in to server: `ssh [your-username]@uniarrival.it.helsinki.fi`.
4. Run deployment steps:

```sh
cd /var/www/current
./deploy.sh
```
Enter your username and password when asked

!NB helsinki.fi user required for server access
