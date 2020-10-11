<?php

$databases['default']['default'] = array(
  'driver' => 'mysql',
  'database' => 'drupal',
  'username' => 'drupal',
  'password' => 'dfhgjw78yrg078',
  'host' => 'localhost',
  'collation' => 'utf8mb4_swedish_ci',
);

$conf['drupal_http_request_fails'] = FALSE;

$settings['trusted_host_patterns'] = array(
  '^uniarrival\.helsinki\.fi$',
);

$settings['hash_salt'] = '_Yfo_5ZbqO2oOOrypjh7QlMMmnpkeA2_Egvdn09ZTAa3ajv19494SKvJ06NZcsdb_2piGYqqGA';

// Warden settings.
// Location of your Warden server. No trailing slash.
$config['warden.settings']['warden_server_host_path'] = 'https://warden.wunder.io';
// Allow external callbacks to the site. When set to FALSE pressing refresh site
// data in Warden will not work.
$config['warden.settings']['warden_allow_requests'] = TRUE;
// Basic HTTP authorization credentials.
$config['warden.settings']['warden_http_username'] = 'warden';
$config['warden.settings']['warden_http_password'] = 'wunder';
// IP address of the Warden server. Only these IP addresses will be allowed to
// make callback # requests.
$config['warden.settings']['warden_public_allow_ips'] = '35.228.188.78,35.228.81.50';
// Define module locations.
$config['warden.settings']['warden_preg_match_custom'] = '{^modules\/custom\/*}';
$config['warden.settings']['warden_preg_match_contrib'] = '{^modules\/contrib\/*}';
$config['warden.settings']['warden_match_contrib'] = TRUE;
