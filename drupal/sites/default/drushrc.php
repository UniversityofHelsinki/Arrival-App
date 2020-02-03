<?php

/**
 * @file
 * Settings for Drush.
 */

 /**
 * Lando configuration overrides.
 */
if (getenv('LANDO_INFO')) {
  $options['uri'] = 'https://uniarrival.lndo.site';
}
