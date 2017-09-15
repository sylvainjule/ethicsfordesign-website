<?php

namespace Kirby\Cachebuster;

use F;

/**
 * Kirby Cachebuster CSS Component
 * 
 * @author Lukas Bestle <lukas@getkirby.com>
 * @license MIT
 * @link https://getkirby.com
 */
class CSS extends \Kirby\Component\CSS {

  /**
   * Builds the html link tag for the given css file
   * 
   * @param string $url
   * @param null|string $media
   * @return string
   */
  public function tag($url, $media = null) {

    if(is_array($url)) {
      $css = array();
      foreach($url as $u) $css[] = $this->tag($u, $media);
      return implode(PHP_EOL, $css) . PHP_EOL;
    }

    $file = kirby()->roots()->index() . DS . $url;

    if(file_exists($file)) {
      $mod = f::modified($file);
      $url = dirname($url) . '/' . f::name($url) . '.' . $mod . '.css';
    }

    return parent::tag($url, $media);

  }

}
