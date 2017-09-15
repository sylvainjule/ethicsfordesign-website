<div id="player-urls" data-url="<?php echo $page->url('en') ?>">
	
	<?php $files = $page->files(); ?>

	<div id="subtitles">
		<?php $subtitles = $files->filterBy('filename', '*=', 'subtitles-'); ?>
		<?php foreach($subtitles as $subtitle): ?>
			<div class="subtitle" data-code="<?php echo $subtitle->langcode() ?>" data-url="<?php echo $subtitle->url() ?>"></div>
        <?php endforeach ?>
	</div>

	<div id="side-texts">
		<?php $sidetexts = $files->filterBy('filename', '*=', 'side-text-'); ?>
		<?php foreach($sidetexts as $sidetext): ?>
			<div class="side-text" data-code="<?php echo $sidetext->langcode() ?>" data-url="<?php echo $sidetext->url() ?>"></div>
        <?php endforeach ?>
	</div>

	<div id="chapters">
		<?php $chapters = $files->filterBy('filename', '*=', 'chapters-'); ?>
		<?php foreach($chapters as $chapter): ?>
			<div class="chapter" data-code="<?php echo $chapter->langcode() ?>" data-url="<?php echo $chapter->url() ?>"></div>
        <?php endforeach ?>
	</div>

	<div id="images-left" data-url="<?php echo $files->find('_images-left.srt')->url() ?>"></div>
	<div id="images-right" data-url="<?php echo $files->find('_images-right.srt')->url() ?>"></div>

	<div id="layout-changes" data-url="<?php echo $files->find('_layout-changes.srt')->url() ?>"></div>


</div>