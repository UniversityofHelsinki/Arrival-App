<?php

/**
 * @file
 * Contains \Drupal\angapp\AppContainerController.
 */

namespace Drupal\angapp;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;
use Symfony\Component\HttpFoundation\RedirectResponse;

/**
 * AppContainerController.
 */
class AppContainerController extends ControllerBase {

  /**
   * Redirect user from the homepage to the app page.
   */
  public function homepageRedirect() {
    //Url::fromRoute('sc_app.app_container')->toString();
    return new RedirectResponse('/app/index.html');
  }

}
