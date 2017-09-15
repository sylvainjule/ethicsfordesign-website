<div id="overlay-instructions">
	
	<div id="player-step-1" class="player-step">
		<?php echo $page->quicktip()->kirbytext() ?>
		
		<form id="player-open">
			<button class="player-loading-button no-action" type="button" value="loading"><?php echo l::get('loading'); ?></button>
    	    <button class="player-open-button hide" type="button" value="yes"><?php echo l::get('begin'); ?></button> 
		</form>
	</div>

</div>