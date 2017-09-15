<div id="player-controls" class="player-controls">
    <div id="tooltip-chapter" class="tooltip-chapter visually-hidden">Text sample</div>

    <div class="player-controls-top">

        <div id="progress-bar" class="player-progress-bar">
            <div id="current-time-bar" class="player-progress-bar-time">
                <div id="current-timer" class="current-timer">
                    <div id="current-timer-number" class="current-timer-number">00 mn 00 s</div>
                </div>
            </div>
            <div id="buffer-bar" class="player-progress-bar-buffer"></div>
            <div id="final-timer" class="final-timer">
                <div id="final-timer-number" class="final-timer-number">00 mn 00 s</div>
            </div>
        </div>

    </div>


    <div class="player-controls-bottom">

        <div class="player-controls-bottom-left">
            <div class="player-btn-close">
            	<div id="btn-close" data-fallback="<?php echo $site->index()->findBy('autoid', 'watch')->url() ?>">
            		<div class="btn-close-inner"></div>
            	</div>
            </div>
            <div class="player-btn-actions">
                <div id="btn-play">
                	<div class="player-btn-actions-play"></div>
                </div>
                <div id="btn-pause" class="hide">
                	<div class="player-btn-actions-pause"></div>
                </div>
            </div>
        </div>

        <div class="player-controls-bottom-right">
            <div class="player-btn-volume">
                <div id="player-btn-mute" class="player-btn-volume-mute" data-other="Unmute">
                    <img src="<?php echo $page->file('volume-icon.svg')->url() ?>" alt="">
                </div>
                <div id="player-volume-bar" class="player-btn-volume-bar">
                    <div id="player-current-volume" class="player-btn-volume-bar-range"></div>
                </div>
            </div>
            <div id="player-language-picker" class="wrap-drop">
                <span class="selected" data-lang=""></span>
                <ul id="player-language-options" class="drop">
                	<?php $subtitles = $page->files()->filterBy('filename', '*=', 'subtitles-'); ?>
					<?php foreach($subtitles as $subtitle): ?>
						<li data-lang="<?php echo $subtitle->langcode() ?>"><?php echo $subtitle->langcode()->upper() ?></li>
			        <?php endforeach; ?>
                </ul>
            </div>
        </div>

    </div>
    
    
</div>