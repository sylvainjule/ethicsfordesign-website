<?php $watch = $site->index()->findBy('autoid', 'watch');
      $player = $site->index()->findBy('autoid', 'player');
      $firstStep = $watch->children()->first();
      $secondStep = $watch->children()->nth(1); 

	if ($open == '') {
		$firstClass = '';
	}
	elseif ($open == 'first-open') {
		$firstClass = ' open';
	}
	elseif ($open == 'second-open' || $open == 'third-open') {
		$firstClass = ' close';
	}
?>

<div class="ctn-page<?php echo $firstClass ?>" data-uid="<?php echo $watch->urlKey() ?>">
    <div class="page desktop">
        <div class="page-proper-width">
        	<div class="page-close">&times;</div>
        	
        	<div id="step-1" class="page-step-1">
        	    <h2><?php echo $watch->title() ?></h2>
        	                
        	    <?php echo $firstStep->text()->kirbytext() ?>
        	                
        	    <form id="page-watch">
        	        <button class="page-watch-button" type="button" value="yes"><?php echo $firstStep->stepyes(); ?></button> 
        	        <button class="page-watch-button" type="button" value="no"><?php echo $firstStep->stepno(); ?></button>
        	    </form>
        	
        				<div class="page-step-1-warning">
        	    	<?php echo $firstStep->warning()->kirbytext() ?>
        				</div>
        	</div>
        	<div id="step-2" class="page-step-2 hide">      
        	    <p><?php echo $secondStep->text() ?></p>
        	                
        	    <form id="page-languages">
        	
        	    	<?php $subtitles = $player->files()->filterBy('filename', '*=', 'subtitles-'); ?>
        	
        					<?php foreach($subtitles as $subtitle): ?>
        	        	<button class="page-languages-button" type="button" value="<?php echo $subtitle->langcode() ?>" data-href="<?php echo $player->url() . '?lang=' . $subtitle->langcode() ?>"><?php echo $subtitle->langname() ?></button> 
        	        <?php endforeach ?>
        	
        	    </form>
        	</div>
        </div>
        
    </div>
    <div class="page mobile">
        <div class="page-close">&times;</div>

        <h2><?php echo $page->title() ?></h2>

        <?php echo $page->maintext()->kirbytext() ?>
                        
        <?php echo $page->mobiletext()->kirbytext() ?>
        
    </div>

</div>