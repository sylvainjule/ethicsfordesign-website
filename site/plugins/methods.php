<?php

field::$methods['apostrophe'] = function($field) {

	$str = $field->value;
	$str = str_replace('\'', '’', $str);

    $field->value = $str;
    return $field;

};

field::$methods['kirbytextRaw'] = function($field) {

    return kirbytextRaw($field->value);
    
};