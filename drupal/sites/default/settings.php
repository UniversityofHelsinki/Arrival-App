<?php

/**
 * Config directory path.
 */
$settings['config_sync_directory'] = '../config/sync';

/**
 * Install profile.
 */
$settings['install_profile'] = 'config_installer';

/**
 * Environment specific override configuration, if available.
 */
if (file_exists(__DIR__ . '/settings.local.php')) {
  include __DIR__ . '/settings.local.php';
}

/**
 * Lando configuration overrides.
 */
if (getenv('LANDO_INFO') && file_exists($app_root . '/' . $site_path . '/settings.lando.php')) {
  include $app_root . '/' . $site_path . '/settings.lando.php';
}