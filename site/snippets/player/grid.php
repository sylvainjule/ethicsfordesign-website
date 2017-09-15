<div id="player-grid" class="player-grid">

	<div id="player-grid-1" class="player-grid-entry player-grid-subtitles" data-content="subtitles"><p></p></div>

	<div id="player-grid-2" class="player-grid-entry player-grid-video" data-content="video">
	    <video id="player-video" preload>

		    <?php $mp4 = $page->mainvideo()->toFile()->url();
		    	  $webm = str_replace('.mp4', '.webm', $mp4);
		    	  $ogv = str_replace('.mp4', '.ogv', $mp4); ?>

	        <source src="<?php echo $mp4 ?>" type="video/mp4">
	        <source src="<?php echo $webm ?>" type="video/webm">
	        <source src="<?php echo $ogv ?>" type="video/ogg">
	        <p>Your browser does not support the video tag.</p>
		</video> 
	</div>

	<div id="player-grid-3" class="player-grid-entry player-grid-images-left" data-content="images-left"></div>
	<div id="player-grid-4" class="player-grid-entry player-grid-images-right" data-content="images-right"></div>

	<div id="player-grid-5" class="player-grid-entry player-grid-side-text" data-content="side-text"></div>

	<div id="player-grid-handler" class="hidden"></div>

</div>