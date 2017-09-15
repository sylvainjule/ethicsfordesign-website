<?php
// image tag
kirbytext::$tags['gif'] = array(
  'attr' => array(
    'alt', 'border'
  ),
  'html' => function($tag) {

    $url     = $tag->attr('gif');
    $alt     = $tag->attr('alt');
    $file    = $tag->file($url);

    // use the file url if available and otherwise the given url
    $url = $file ? $file->url() : url($url);

    return '<img class="gif" src="'. $url .'" alt="'. $alt .'">';

  }
);
