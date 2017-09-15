<?php

$options = array();
// $languages = panel()->site()->languages();

// foreach ($languages as $language) {
//   $options[] = array(
//     'text' => str::upper($language->code()),
//     'icon' => false,
//     'link' => url('panel') . '?language=' . $language->code(),
//   );
// }

return array(
  'title' => l::get('translations.widget.headline','Missing Translations') . ' (' . str::upper(site()->language()->code()) . ')',
  'options' => $options,
  'html'    => function() {
    return tpl::load(__DIR__ . DS . 'translations.html.php', array(
      'language' => panel()->site()->language(),
      'items' => panel()->site()->index()->filter(function($page) {
        return !$page->content(site()->language()->code())->exists();
      })->paginate(10),
    ));
  }
);