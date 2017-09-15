<?php

return function($site, $pages, $page) {

  if($site->user()) go('/');

  if(r::is('post') and get('login')) {
    if($user = $site->user(get('username')) and $user->login(get('password'))) {
      go('/');
    } else {
      $error = true;
    }
  } 
  else {
    $error = false;
  }

  return array('error' => $error);

};