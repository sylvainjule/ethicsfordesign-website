<?php

class FieldToggleField extends RadioField {

  public function template() {

    $langdir = 'languages';
    // Build translation file path
    $baseDir = __DIR__ . DS . $langdir . DS;
    // Get panel language
    if (version_compare(panel()->version(), '2.2', '>=')) {
        $lang = panel()->translation()->code();
    } else {
        $lang = panel()->language();
    }
    // Load language files
    if (file_exists($baseDir . $lang . '.php')) {
        $this->translation = include $baseDir . $lang . '.php';
    } else {
        $this->translation = include $baseDir . 'en.php';
    }

    return $this->element()
      ->append($this->label())
      ->append($this->content())
      ->append('<span class="l10n" data-required-hidden1="' . l::get('required-hidden1') . '" data-required-hidden2="' . l::get('required-hidden2') . '"></span>')
      ->append($this->help());
  }

  // Get JS and CSS files from the assets folder
  static public $assets = array(
    'js' => array(
      'f.js'
    ),
    'css' => array(
      'style.css'
    )
  );

  // Add information to the field data so we can access it with JavaScript
  public function item($value, $text) {

    $item = parent::item($value, $text);
    $item->addClass('fieldtoggle');

    if (isset($this->show)) {
      foreach ($this->show as $okey => $ovalue) {
        if ($value == $okey) {
          $item->data("show", strtolower($ovalue));
        }
      }
    }

    if (isset($this->hide)) {
      foreach ($this->hide as $okey => $ovalue) {
        if ($value == $okey) {
          $item->data("hide", strtolower($ovalue));
        }
      }
    }
    if (isset($this->keepvisible) && $this->keepvisible == "true") {
      $item->data("keepvisible", "true");
    }


    return $item;

  }


}
