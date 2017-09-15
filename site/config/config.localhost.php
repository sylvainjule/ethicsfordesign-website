<?php

c::set('debug', true);

// Prevent being inexpectedly logged out
s::$fingerprint = function() {
    return "dev-fingerprint";
};