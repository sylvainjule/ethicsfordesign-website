$(document).ready(function() {
	
	/* Grid's movement
    ------------------------------------------*/
    
    var _grille   = $('#player-grid'),
        _handler  = $('#player-grid-handler'),
        _grid1    = $('#player-grid-1'),
        _grid2    = $('#player-grid-2'),
        _grid3    = $('#player-grid-3'),
        _grid4    = $('#player-grid-4'),
        _grid5    = $('#player-grid-5'),
        _window  = $(window),
        _resizing = false,
        _video = $('#player-video'),
        _mousePos = { x: 0, y: 0 };

    var _window, _windowW, _windowH, 
        _videoW, _videoHProp, _videoWProp,
        _minX, _maxX, _minY, _maxY;


    _video.on('loadeddata', function() {
    	setVariables();
    	setVideo();
    	setSubtitleSize();
    });

    _window.on('resize', function(){
	  	setVariables();
	  	setVideo();
	});

    function setVariables() {
        _windowW = _window.width();
        _windowH = _window.height(),
        _videoH = _video.outerHeight();
        _videoW = _video.outerWidth();
        _videoHProp = _videoH * 100 / _windowH;
        _videoWProp = _videoW * 100 / _windowW;
	    
	    _minX = 100 - _videoWProp; // Left limit : not less than X%
	    _maxX = 60; // Right limit : not more than 60%
	    _minY = 40; // Top limit : not less than 30%
	    _maxY = _videoHProp; // Bottom limit : not more than X%
    }

    var getCoordinates = function(e) {
    	_mousePos.x = e.pageX;
    	_mousePos.y = e.pageY;
    }
    var resizeGrid = function(e) {

    	if (_resizing) {
		    requestAnimationFrame(resizeGrid); // Call self again, if still dragging
		}

        var _posX = _mousePos.x,
        	_posXProp = _posX * 100 / _windowW,
        	_posXProp = Math.max(_minX, _posXProp),
            _posXProp = Math.min(_maxX, _posXProp),
            _posX = _posXProp,
            _posY = _mousePos.y,
        	_posYProp = _posY * 100 / _windowH,
            _posYProp = Math.max(_minY, _posYProp),
            _posYProp = Math.min(_maxY, _posYProp),
            _posY = _posYProp;

            _handler.css({
                left : _posX + '%',
                top : _posY + '%'
            });

            _grid1.css({
                width: _posX + '%',
                height: _posY + '%'
            });
            _grid2.css({
                left: _posX + '%',
                width: 100 - _posX + '%',
                height: _posY + '%'
            });
            _grid3.css({
                width: _posX + '%',
                height: 100 - _posY + '%',
                top: _posY + '%'
            });
            _grid4.css({
                width: (100 - _posX) / 2 + '%',
                height: 100 - _posY + '%',
                left: _posX + '%',
                top: _posY + '%'
            });
            _grid5.css({
                width: (100 - _posX) / 2 + '%',
                height: 100 - _posY + '%',
                left: _posX + (100 - _posX) / 2 + '%',
                top: _posY + '%'
            });

            setSubtitleSize();

    };

    function setSubtitleSize() {
    	var _subWidth = _grid1.width() / 12,
        	_subWidth = Math.min(40, _subWidth),
        	_subWidth = (_window.width() < 1024) ? Math.max(24, _subWidth) : Math.max(30, _subWidth),
        	_lineHeight = _subWidth * (38 / 30);

    	_grid1.find('p').css({
    		'font-size': _subWidth,
    		'line-height': _lineHeight + 'px'
    	});
    }
    
    _handler.on({
    	'mouseenter': function() {

    		_handler.addClass('hovered');
    	},
    	'mouseleave': function() {
    		if (!_resizing) {
    			_handler.removeClass('hovered');
    		}
    	},
    	'mousedown': function () {
	    	_resizing = true;
	    	_handler.not('.hovered').addClass('hovered');
	    	requestAnimationFrame(resizeGrid);
	    },
    	'touchstart': function (e) {
    		e.preventDefault();

	    	_resizing = true;
	    	_handler.not('.hovered').addClass('hovered');
	    	requestAnimationFrame(resizeGrid);
	    }
	});
    $(document).on({
    	'mouseup': function () {
	    	_handler.removeClass('hovered');
			_resizing = false;
    	},
    	mousemove: function(e) {
    		getCoordinates(e);
    	},
    	touchmove: function(e) {
    		getCoordinates(e.originalEvent);
    	},
    	'touchend': function () {
	    	_handler.removeClass('hovered');
			_resizing = false;
    	},
    });

    /* Set to video's size
    ------------------------------------------*/

    setVideo();

    function setVideo() {
    	var _video = $('#player-video'),
			_e = $.Event('mousemove'),
			_left = _e.pageX = _video.offset().left,
			_top = _e.pageY = _video.height();

		_grille.on('mousemove', resizeGrid);
		_grille.trigger(_e);
		_grille.unbind('mousemove', resizeGrid);
    }
    
});