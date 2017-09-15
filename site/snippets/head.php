<!DOCTYPE html>
<html lang="<?php echo $site->language()->code() ?>">
<head>
    <meta charset="UTF-8">
    <meta name="author" content="<?php echo $site->author() ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
	<link rel="shortcut icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="shortcut icon" type="image/png" sizes="64x64" href="/favicon-64x64.png">
    <link rel="shortcut icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />

    <title><?php echo $site->title() ?></title>
    <meta name="description" content="<?php echo $site->description() ?>">
    
    <?php echo css('assets/css/styles.min.css') ?>
</head>

<body class="<?php echo $class ?>">