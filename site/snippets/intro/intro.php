<section id="intro" class="intro">
	<div id="intro-ethics" class="intro-step intro-bigletter intro-ethics">
		<div class="word">Ethics</div>
	</div>
	<div id="intro-for" class="intro-step intro-bigletter intro-for out">
		<div class="word">for</div>
	</div>
	<div id="intro-design" class="intro-step intro-bigletter intro-design out">
		<div class="word">Design</div>
	</div>

	<div id="intro-maintext" class="intro-step intro-maintext out">

		<?php snippet('intro/circles') ?>

		<?php foreach($site->languages() as $language): $code = $language->code();?>

			<div class="content-lang content-lang-<?php echo $code;?><?php e($site->language() == $language, '', ' hide'); ?>" data-url="<?php echo $page->url($code); ?>" data-lang="<?php echo $code; ?>">
				<h2><?php echo $page->content($code)->title() ?></h2>
			    <?php echo $page->content($code)->maintext()->kirbytext() ?>
			
			    <form id="intro-skip">
			        <button class="intro-skip-button" type="button" value="skip" data-loading="<?php echo $page->content($code)->loading() ?>"><?php echo $page->content($code)->question() ?></button>
			    </form>

			    <div class="change-language"><?php echo $page->content($code)->switchlang()->kirbytext() ?></div>
			</div>

		<?php endforeach; ?>
	    
	    
	</div>
</section>