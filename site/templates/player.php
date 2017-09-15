<?php if($site->login()->toString() == 'true' && !$site->user()) go('home') ?>

<?php snippet('head', array('class' => 'player')); ?>

	<?php snippet('player/urls', ['page' => $page]) ?>

	<?php snippet('player/mobile', ['page' => $page]) ?>

	<?php snippet('player/overlay', ['page' => $page]) ?>
	
	<?php snippet('player/controls', ['page' => $page]) ?>

	<?php snippet('player/grid', ['page' => $page]) ?>


<?php snippet('footer', array('page' => 'player')); ?>