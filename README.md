
    __  ____  _____    ____  ____  _____    _____    __
   / / / /\ \/ /   |  / __ \/ __ \/  _/ |  / /   |  / /
  / /_/ /  \  / /| | / /_/ / /_/ // / | | / / /| | / /
 / __  /   / / ___ |/ _, _/ _, _// /  | |/ / ___ |/ /___
/_/ /_/   /_/_/  |_/_/ |_/_/ |_/___/  |___/_/  |_/_____/


This is a small site so use build.sh + drush rs.

Production builds are done with the command:

$ ./build.sh package production

Do update production, do:

$ scp production.tgz $kevari@uniarrival.it.helsinki.fi:
$ ssh $kevari@uniarrival.it.helsinki.fi
$ cd /var/www/current
$ sudo mv /home/$kevari/production.tgz .
$ sudo tar xvfz production.tgz
$ sudo chown -R apache:apache .
$ cd drupal && ../vendor/bin/drush cim -y

$kevari is your kevyttunnus which you can get from HY.
