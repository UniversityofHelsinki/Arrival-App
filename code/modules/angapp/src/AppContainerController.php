<?php


/**
 * @file
 * Contains \Drupal\angapp\AppContainerController.
 */

namespace Drupal\angapp;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

use Drupal\Component\Serialization\Json;
use GuzzleHttp\Exception\RequestException;

/**
 * AppContainerController.
 */
class AppContainerController extends ControllerBase {

  /**
   * Redirect user from the homepage to the app page.
   */
  public function homepageRedirect() {
    return new RedirectResponse('/app/index.html');
  }

  /**
   * Mailer.
   */
  public function mailer(Request $request) {

    $email = $request->get('email');
    $result = $request->get('result');

    // Handle errors.
    if (!valid_email_address($email) ||
        strlen($result) < 2) {
      return new JsonResponse([
        'status' => 'error',
      ]);
    }

    // Prepare email.
    $to = [
      $email,
    ];

    $view = views_embed_view('answer', 'rest_export_1', $result);
    $content = \Drupal::service('renderer')->render($view);

    $params = Json::decode($content);

    $result = \Drupal::service('plugin.manager.mail')->mail(
      'angapp',
      'results',
      implode(', ', $to),
      \Drupal::currentUser()->getPreferredLangcode(),
      $params
    );

    return new JsonResponse([
      'status' => 'ok',
    //  'result' => $result
    ]);
  }

}
