<?php

function stripProtocol($url) {

	$url = str_replace('http://', '', $url);
	$url = str_replace('https://', '', $url);
	$url = str_replace('www.', '', $url);

    return $url;

};

function kirbytextRaw($content) {

    $text = kirbytext($content);

    return preg_replace('/(.*)<\/p>/', '$1', preg_replace('/<p>(.*)/', '$1', $text));
    
}