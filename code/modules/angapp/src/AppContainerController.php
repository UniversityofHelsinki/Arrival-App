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

    $content = $request->getContent();

    if (empty($content)) {
      return new JsonResponse([
        'status' => 'error',
      ]);
    }

    $params = Json::decode($content);

    $email = $params['email'];
    $result = $params['selection'];

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
    $nodes = Json::decode($content);

    // Get the hidden fields
    $view = views_embed_view('hideanswers', 'rest_export_1', $result);
    $content = \Drupal::service('renderer')->render($view);
    $hidden = Json::decode($content);
    $hidden = array_map(function ($item) {
      return $item['nid'];
    }, $hidden);

    $view = views_embed_view('disclaimer', 'rest_export_1', $result);
    $content = \Drupal::service('renderer')->render($view);
    $disclaimer = Json::decode($content);

    $view = views_embed_view('intro_email', 'rest_export_1', $result);
    $content = \Drupal::service('renderer')->render($view);
    $intro = Json::decode($content);

    $result = \Drupal::service('plugin.manager.mail')->mail(
      'angapp',
      'results',
      implode(', ', $to),
      \Drupal::currentUser()->getPreferredLangcode(),
      [
        'intro' => $intro,
        'disclaimer' => $disclaimer,
        'nodes' => $nodes,
        'hidden' => $hidden,
      ]
    );

    return new JsonResponse([
      'status' => 'ok',
    //  'result' => $result
    ]);
  }

}
