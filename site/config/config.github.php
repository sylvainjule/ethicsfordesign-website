<?php


/* License
-> http://getkirby.com/license
-----------------------------------------------*/

c::set('license', 'put your license key here');


/* Kirby Configuration
-> http://getkirby.com/docs/advanced/options
-----------------------------------------------*/

c::set('panel.stylesheet', 'assets/css/panel.css');
c::set('typography.hyphenation', false);
c::set('typography.space.collapse', false);

c::set('language.detect', true);
c::set('cachebuster', true);


/* Languages
-----------------------------------------------*/

c::set('languages', array(
	array(
	  'code'    => 'en',
	  'name'    => 'English',
	  'default' => true,
	  'locale'  => 'en_US',
	  'url'     => '/',
	),
	array(
	  'code'    => 'fr',
	  'name'    => 'Français',
	  'locale'  => 'fr_FR',
	  'url'     => '/fr',
	),
));


/* Custom roles
-----------------------------------------------*/

c::set('roles', array(
  array(
    'id'      => 'admin',
    'name'    => 'Admin',
    'default' => true,
    'panel'   => true
  ),
  array(
    'id'      => 'editor',
    'name'    => 'Editor',
    'panel'   => true
  ),
  array(
    'id'      => 'reviewer',
    'name'    => 'Reviewer',
    'panel'   => false
  )
));

