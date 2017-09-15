$(document).ready(function() {

    var _video = $('#player-video'),
        _videoJS = _video[0],
        _hideTimeOut = 0,
        _hideInterval = null;


    $('#player-open button').on('click', function() {
    	$('#overlay-instructions').addClass('out');

    	var _w = $('#player-grid-1').outerWidth(),
    		_h = $('#player-grid-1').outerHeight();

    	$('#overlay-instructions').css({
    		height: _h,
    		width: _w
    	});

    	setTimeout(function() {
    		$('#btn-play').trigger('click');
    		$('#player-grid-handler').removeClass('hidden');
    		$('#overlay-instructions').remove();
    		$('#timecode').removeClass('hide');
    		$('#player-controls').addClass('inactive');
    		// Touch devices tryagain
    		setTimeout(function() {
    			if(_videoJS.paused) {
    				$('#btn-play.hide').removeClass('hide');
    				$('#btn-pause').not('.hide').removeClass('hide');
    			}
    		}, 500);
    	}, 650);
    });

    $(document).on('touchmove', function(e) {
	    e.preventDefault();
	});

    /* Toggle controls
    ------------------------------------------*/

    $('#player-controls').on('mouseenter', function(e) {
    	var _this = $(this),
    		_delay = 250;

    	if (_this.hasClass('inactive')) {
    		_this.removeClass('inactive');
    		e.preventDefault();
    		e.stopPropagation();
    		return;
    	}

    	if (_hideTimeOut < _delay) {
            clearCounter();
        }

        
    });
    $('#player-controls').on('touchstart', function(e) {
    	var _this = $(this),
    		_delay = 1000;

    	if (_this.hasClass('inactive')) {
    		_this.removeClass('inactive');
    		e.preventDefault();
    		e.stopPropagation();

    		return;
    	}

		if (_hideTimeOut < _delay) {
            clearCounter();
        }
    });
    $('#player-controls').on('mouseleave', function() {
        triggerCounter();
    });
    $('#player-controls').on('touchend', function() {
        triggerCounter();
    });


    function triggerCounter() {
        _hideInterval = setInterval(function() {
            _hideTimeOut++;
            if (_hideTimeOut == 250) {
                $('#player-controls').addClass('inactive');

                clearCounter();
            }
        }, 1);
    }
    function clearCounter() {
        clearInterval(_hideInterval);
        _hideTimeOut = 0;
        _hideInterval = null;
    }

    /* Close
    ------------------------------------------*/

    $('#btn-close').on('click', function() {
    	window.location.href = $(this).attr('data-fallback');
    });

    /* Play / Pause
    ------------------------------------------*/

    $('#btn-play').on('click', function() {
        var _this = $(this);

        _videoJS.play();
        _this.not('.hide').addClass('hide');
        $('#btn-pause.hide').removeClass('hide');
    });
    $('#btn-pause').on('click', function() {
        var _this = $(this);

        _videoJS.pause();
        _this.addClass('hide');
        $('#btn-play').removeClass('hide');
    });

    
    /* Draggable progressbar
    ------------------------------------------*/
    
    var _draggingTime = false;

    // Trigger the following of the cursor
    $('#progress-bar').on('mousedown', function(e) {
    	var _this = $(this);
    	if (_this.closest('#player-controls').hasClass('inactive')) {
    		return false;
    	}

        var _pageX = e.pageX;

        _draggingTime = true;
        updateBar(_pageX);
    });
    // Follow the cursor (mousemove) or stop when released (mouseup)
    $(document)
        .on('mouseup', function(e) {
            if (_draggingTime) {
                var _pageX = e.pageX;

                _draggingTime = false;
                updateBar(_pageX);
            }
        })
        .on('mousemove', function(e) {
            if (_draggingTime) {
                var _pageX = e.pageX;
                updateBar(_pageX);
            }
        });

    // Update progress-bar's width and its associated currentTime
    function updateBar(_pageX) {
        var _progress = $('#progress-bar'),
            _progressWidth = _progress.width(),
            _maxTime = _videoJS.duration,
            _position = _pageX - _progress.offset().left,
            _propPosition = _position * 100 / _progressWidth,
            _propPosition = Math.max(0, _propPosition),
            _propPosition = Math.min(_propPosition, 100);

        $('#current-time-bar').css('width', _propPosition +'%');
        _videoJS.currentTime = _maxTime * _propPosition / 100;
    };

    
    /* Volume
    ------------------------------------------*/
    
    //  Mute / Unmute control clicked
    $('#player-btn-mute').on('click', function() {
        var _this = $(this);

        _this.toggleClass('muted');
        _videoJS.muted = !_videoJS.muted;
        return false;
    });

    //Volume control clicked
    $('#player-volume-bar').on('mousedown touchstart', function(e) {
        var _this = $(this),
            _position = e.pageX - _this.offset().left,
            _percent = _position * 100 / _this.width();
        
        $('#player-current-volume').css('width', _percent +'%');
        _videoJS.volume = _percent / 100;
    });


    /* Dropdown
    ------------------------------------------*/

    $('#player-language-picker').on('click', function(e) {
        var _this = $(this);

        if (!$(e.target).is('li')) {
            e.preventDefault();
            e.stopPropagation();
        }
    
        $(this).toggleClass('active');
    });
    $(document).on('click', '#player-language-options li', function() {
        var _this = $(this),
            _text = _this.text(),
            _parent = $(this).closest('.wrap-drop'),
            _drop = _parent.find('#player-language-options'),
            _span = _parent.find('span');

        var _currentCode = _span.attr('data-lang'),
            _currentContent = _span.text();

        var _newLi = _this,
            _newCode = _this.attr('data-lang'),
            _newContent = _this.text();

        _span.attr('data-lang', _newCode).text(_newContent);
        _newLi.remove();

        _drop.append('<li data-lang="'+ _currentCode +'">'+ _currentContent +'</li>');
        _drop.find('li').sort(asc_sort).appendTo(_drop);
    });
    $(document).click(function (e) {
        // close menu on document click
        $('#player-language-options.active').removeClass('active');
    });

    function asc_sort(a, b){
        return ($(b).text()) < ($(a).text()) ? 1 : -1;    
    }


    /* Keyboard support
    ------------------------------------------*/

    $(document).on('keydown', function(event){
	    var keycode = (event.keyCode ? event.keyCode : event.which);

	    // Play / pause on Enter / Space
	    if (keycode == 13 || keycode == 32) {
	        $('#btn-play, #btn-pause').not('.hide').trigger('click');
	    }

	    // Mute on m
	    if (keycode == 77) {
	        $('#player-btn-mute').trigger('click');
	    }

	    // -5 sec on left arrow
	    if (keycode == 37) {
	        _videoJS.currentTime = Math.max(0, _videoJS.currentTime - 5);
	    }
	    // +5 sec on right arrow
	    if (keycode == 39) {
	        _videoJS.currentTime = Math.min(_videoJS.duration, _videoJS.currentTime + 5);
	    }
	});
    

});