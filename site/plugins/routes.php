<?php

kirby()->routes(array(
    array(
    	'pattern' => 'set-content/get-correct-language',
    	'method'  => 'POST',
    	'action'  => function() {
      		$lang = $_POST["lang"];

      		$data = array(
      			'site' => site(),
      			'page' => site()->find('home'),
      			'open' => ''
      		);

      		site()->visit('home', $lang);

      		$watch = snippet('menu/watch', $data, true);
      		$about = snippet('menu/about', $data, true);
      		$informations = snippet('menu/informations', $data, true);

      		$response = new Response($watch . $about . $informations);
      		return $response;
    	}
    ),
    array(
		'pattern' => '(?:(fr)/)?(?:(menu))',
		'action' => function ($lang, $uid) {
			if(!$lang) $lang = 'en';

			$data = array(
			    'intro' => '',
			    'openClass' => '',
			);

			site()->visit('home', $lang);
			
			return array('home', $data);
		}
	),
	array(
		'pattern' => '(?:(fr)/)?(?:(regarder|watch))',
		'action' => function ($lang, $uid) {
			if(!$lang) $lang = 'en';

			$data = array(
			    'intro' => '',
			    'openClass' => 'first-open',
			);

			site()->visit('home', $lang);
			
			return array('home', $data);
		}
	),
	array(
		'pattern' => '(?:(fr)/)?(?:(a-propos|about))',
		'action' => function ($lang, $uid) {
			if(!$lang) $lang = 'en';

			$data = array(
			    'intro' => '',
			    'openClass' => 'second-open',
			);

			site()->visit('home', $lang);
			
			return array('home', $data);
		}
	),
	array(
		'pattern' => '(?:(fr)/)?(?:(informations))',
		'action' => function ($lang) {
			if(!$lang) $lang = 'en';

			$data = array(
			    'intro' => '',
			    'openClass' => 'third-open',
			);

			site()->visit('home', $lang);
			
			return array('home', $data);
		}
	),
));