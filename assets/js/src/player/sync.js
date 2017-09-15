$(document).ready(function() {    

    var _video = $('#player-video'),
        _videoJS = _video[0],
        _rootUrl, _currentIndex,
        _subtitlesSRC = [], _imagesLeftSRC, _imagesRightSRC, _sideTextsSRC = [], _layoutChangesSRC, _chaptersSRC = [],
        _subtitlesSRT, _imagesLeftSRT, _imagesRightSRT, _sideTextSRT, _layoutChangesSRT, _chaptersSRT,
        _subtitlesIndex, _imagesLeftIndex, _imagesRightIndex, _sideTextIndex, _layoutChangesIndex, _oldLayoutChangesIndex,
        _oldSubtitlesIndex, _oldImagesLeftIndex, _oldImagesRightIndex, _oldSideTextIndex,
        _subtitlesDiv, _imagesLeftDiv, _imagesRightDiv, _sideTextDiv, _videoDiv,
        _language = getLanguage('lang');

    setDivs();
    setSRC();

    function setDivs() {
        _videoDiv = $('.player-grid-video');
        _subtitlesDiv = $('.player-grid-subtitles');
        _imagesLeftDiv = $('.player-grid-images-left');
        _imagesRightDiv = $('.player-grid-images-right');
        _sideTextDiv = $('.player-grid-side-text');
    }
    function setSRC() {
    	var _urls = $('#player-urls'),
    		_subtitles = _urls.find('#subtitles .subtitle'),
    		_sideTexts = _urls.find('#side-texts .side-text'),
    		_chapters = _urls.find('#chapters .chapter'),
    		_imagesLeft = _urls.find('#images-left'),
    		_imagesRight = _urls.find('#images-right'),
    		_layoutChanges = _urls.find('#layout-changes');

    	_rootUrl = _urls.attr('data-url');

    	// Set subtitles sources
    	_subtitles.each(function () {
    		var _this = $(this),
    			_code = _this.attr('data-code'),
    			_url = _this.attr('data-url');

    		_subtitlesSRC.push([_code, _url]);
    	});

    	// Set side-texts sources
    	_sideTexts.each(function () {
    		var _this = $(this),
    			_code = _this.attr('data-code'),
    			_url = _this.attr('data-url');
    		_sideTextsSRC.push([_code, _url]);
    	});

    	// Set chapters sources
    	_chapters.each(function () {
    		var _this = $(this),
    			_code = _this.attr('data-code'),
    			_url = _this.attr('data-url');
    		_chaptersSRC.push([_code, _url]);
    	});

    	_imagesLeftSRC = _imagesLeft.attr('data-url');
    	_imagesRightSRC = _imagesRight.attr('data-url');
    	_layoutChangesSRC = _layoutChanges.attr('data-url');

    	_urls.remove();
    }


    /* iOs fix
    /* -> metadata won't load unless triggered by a user click
    ---------------------------------------------------------*/
    
	$(document).on('touchstart', loadMetaData);
    $(document).trigger('touchstart');

	function loadMetaData(event) {
		_videoJS.load();
		$(document).unbind('touchstart', loadMetaData);
	}
    
    /* Interactions on timeupdate
    ------------------------------------------*/
    
    // Makes sure metadata are loaded, get the video duration and set the chapters
    _video.on('loadedmetadata', function() {
        var _time = _videoJS.duration,
            _time = formatTime(_time);

        $('#final-timer-number').text(_time);
        $('.volume').css('width', _videoJS.volume * 100 +'%');

        loadChapters(_language);
    });
    _video.on('loadeddata', function() {
        setTimeout(function() {
        	$('#player-open .player-loading-button').addClass('hide');
        	$('#player-open .player-open-button').removeClass('hide');
        }, 250);
    });
    // Update the progress-bar, buffer-bar and subtitles
    _video.on('timeupdate', function() {
        var _currentTime = _videoJS.currentTime,
            _maxTime = _videoJS.duration;
        
        if (_currentTime == _maxTime) {
        	$('#btn-play').removeClass('hide');
        	$('#btn-pause').addClass('hide');
        	_currentTime = 0;
        }

        updateProgressBar(_currentTime, _maxTime);
        updateBufferBar(_currentTime, _maxTime)
        updateSRT(_currentTime);
    });
    
    function updateProgressBar(_currentTime, _maxTime) {
        // Loading bar
        var _progress = $('#progress-bar'),
            _progressWidth = _progress.width(),
            _percent = _currentTime * 100 / _maxTime,
            _currentTimeText = formatTime(_currentTime),
            _currentTimeText = (_currentTimeText.indexOf('mn') == -1) ? '00mn' + _currentTimeText : _currentTimeText;

        $('#current-time-bar').css('width', _percent +'%');
        $('#current-timer-number').text(_currentTimeText);
    }
    function updateBufferBar(_currentTime, _maxTime) {
        var _range = 0,
            _buffer = _videoJS.buffered;

        // Return at first progress
        if (!_buffer.length) {
        	return;
        }

        if (_videoJS.readyState == 4) {
	        while (!(_buffer.start(_range) <= _currentTime && _currentTime <= _buffer.end(_range))) {
	            _range += 1;
	        }

	        var _bufferPercent = _buffer.end(_range) / _maxTime * 100,
	        	_bufferPercent = Math.floor(_bufferPercent);

	        $('#buffer-bar').css('width', _bufferPercent + "%");
		}
    }
    function updateSRT(_currentTime) {
        
        _subtitlesIndex = null;
        _imagesLeftIndex = null;
        _imagesRightIndex = null;
        _sideTextIndex = null;
        _layoutChangesIndex = null;

        if (_subtitlesSRT) {
			// Sync subtitles
	        _subtitlesSRT.forEach(function (element, index, array) {
	            if (_currentTime >= element.start && _currentTime <= element.end ) {
	                _subtitlesIndex = index;
	            }  
	        });
        	updateSubtitles(_subtitlesIndex); 
	    }
	    if (_imagesLeftSRT) {
	        // Sync first flux of images
	        _imagesLeftSRT.forEach(function (element, index, array) {
	            if(_currentTime >= element.start && _currentTime <= element.end ) {
	                _imagesLeftIndex = index;
	            }
	        });
	        updateImagesLeft(_imagesLeftIndex);
	    }
	    if (_imagesRightSRT) {
	        // Sync second flux of images
	        _imagesRightSRT.forEach(function (element, index, array) {
	            if(_currentTime >= element.start && _currentTime <= element.end ) {
	                _imagesRightIndex = index;
	            }
	        });
	        updateImagesRight(_imagesRightIndex);
	    }
	    if (_sideTextSRT) {
	        // Sync the side text
	        _sideTextSRT.forEach(function (element, index, array) {
	            if(_currentTime >= element.start && _currentTime <= element.end ) {
	                _sideTextIndex = index;
	            }
	        });
	        updateSideText(_sideTextIndex);
	    }
	    if (_layoutChangesSRT) {
	        // Sync the layout changes
	        _layoutChangesSRT.forEach(function (element, index, array) {
	            if(_currentTime >= element.start && _currentTime <= element.end ) {
	                _layoutChangesIndex = index;
	            }
	        });
	        updateLayout(_layoutChangesIndex);
	    }
    }
    
    function updateSubtitles(_index) {
    	var _p = _subtitlesDiv.find('p');

    	// if there's no subtitle matching
    	if (_index == null) {
    		// if the subtitle is not empty
    		if (_p.length && _p.html().trim() != '') {
    			_p.empty();
    		}
    		_oldSubtitlesIndex = null;
    		return;
    	}
    	// if it's the same subtitle
    	if (_index == _oldSubtitlesIndex) {
    		return;
    	}

        var element = _subtitlesSRT[_index],
        	_sub = element.text,
        	_p = _subtitlesDiv.find('p');
        
        if (!_p.length) {
            _subtitlesDiv.empty().append('<p></p>');
        }

        _p.html(_sub); 
        _oldSubtitlesIndex = _index;
    }
    function updateImagesLeft(_index) {

		// if there's no image matching
    	if (_index == null) {
    		// if the image is still here
    		if (_imagesLeftDiv.find('.image:not(.fading)').length) {
    			var _img = _imagesLeftDiv.find('.image');

    			_img.addClass('fading');
    			setTimeout(function() {
    				_img.remove();
    				_oldImagesLeftIndex = null;
    			}, 1000);

    		}
    		return;
    	}
    	// if it's the same image
    	if (_index == _oldImagesLeftIndex) {
    		return;
    	}

        var element = _imagesLeftSRT[_index],
            _src = _rootUrl + '/images/' + element.text,
            img = new Image();
            img.src = _src;

        img.onload = function() {
            var _imageChild = _imagesLeftDiv.find('.image');
            
            if (!_imageChild.length) {
                _imagesLeftDiv.empty().html('<div class="image fading" style="background-image: url('+ _src +')"></div>');

                setTimeout(function() {
                	_imagesLeftDiv.find('.image').removeClass('fading');
                }, 50);
            }
            else {
                _imageChild.css('background-image', 'url("'+ _src +'")').removeClass('fading');
            }
        }

        _oldImagesLeftIndex = _index;   
    }
    function updateImagesRight(_index) {

    	// if there's no image matching
        if (_index == null) {
    		// if the image is still here
    		if (_imagesRightDiv.find('.image:not(.fading)').length) {
    			var _img = _imagesRightDiv.find('.image');

    			_img.addClass('fading');
    			setTimeout(function() {
    				_imagesRightDiv.empty();
    				_oldImagesRightIndex = null;
    			}, 1000);
    		}
    		
    		return;
    	}
    	// If it's the same image
    	if (_index == _oldImagesRightIndex) {
    		return;
    	}

    	var element = _imagesRightSRT[_index],
            _src = _rootUrl + '/images/' + element.text,
            img = new Image();
            img.src = _src;

        img.onload = function() {
            var _imageChild = _imagesRightDiv.find('.image');
            
            if (!_imageChild.length) {
                _imagesRightDiv.empty().html('<div class="image fading" style="background-image: url('+ _src +')"></div>');
                setTimeout(function() {
                	_imagesRightDiv.find('.image').removeClass('fading');
                }, 50);
            }
            else {
                _imageChild.css('background-image', 'url("'+ _src +'")').removeClass('fading');
            } 
        }

        _oldImagesRightIndex = _index;   
    }
    function updateSideText(_index) {

    	// if there's no side text matching
    	if (_index == null) {
    		// if the side text is not empty
    		if (_sideTextDiv.html().trim() != '') {
    			_sideTextDiv.empty();
    		}
    		_oldSideTextIndex = null;
    		return;
    	}
    	// if it's the same side text
    	if (_index == _oldSideTextIndex) {
    		return;
    	}

        var element = _sideTextSRT[_index],
            _content = element.text,
            _type = _content.indexOf(' + ') ? 'array' : 'string',
            _content = _content.indexOf(' + ') ? _content.split(' + ') : _content,
            _newContent = '';

        if (_type == 'string') {
            var _breaker = _content.split('::')[0],
                _elContent = _content.split(':: ')[1];

            _newContent += '<p class="'+ _breaker +'">'+ _elContent +'</p>';
        }
        else if (_type == 'array') {
            _content.forEach(function(element, index, array) {
                var _breaker = element.split('::')[0],
                    _elContent = element.split(':: ')[1];

                _newContent += '<p class="'+ _breaker +'">'+ _elContent +'</p>';
            })
        }

        _sideTextDiv.html(_newContent);
        _oldSideTextIndex = _index;
    }
    function updateLayout(_index) {

    	if (_index == null) {
    		return false;
    	}
    	if (_index == _oldLayoutChangesIndex) {
    		return false;
    	}

    	var _newLayout = _layoutChangesSRT[_index];
	    	_newLayout = _newLayout.text,
	    	_newLayout = _newLayout.split(' + '),
	    	_contents = [];

	    	setContents();
	    	function setContents() {
	    		_contents['side-text'] = _sideTextDiv.html();
	    		_contents['images-left'] = _imagesLeftDiv.html();
	    		_contents['images-right'] = _imagesRightDiv.html();
	    	}

                // Refresh the divs
                _newLayout.forEach(function(element, index, array) {
                    var index = index + 1,
                        _div = $('#player-grid-'+ index);

                    // if the current content isn't what's expected
                    if (_div.attr('data-content') != element) {
                        _div.attr('class', 'player-grid-entry player-grid-'+ element).attr('data-content', element).html(decodeEntities(_contents[element]));
                    }
                });

        setDivs();

        function decodeEntities(encodedString) {
		    var textArea = document.createElement('textarea');
		    textArea.innerHTML = encodedString;
		    return textArea.value;
		}

        _oldLayoutChangesIndex = _index;

    }

    
    /* Jump to chapters
    ------------------------------------------*/
    
    $(document).on({
    	mouseenter: function() {
    		var _this = $(this),
    			_tooltip = $('#tooltip-chapter'),
    			_text = _this.attr('data-content'),
    			_left = _this.offset().left + _this.width() / 2;

    			_tooltip.html(_text);

    		var _posLeft = _left - _tooltip.outerWidth() / 2;
    			
    			_tooltip.css('left', _posLeft).removeClass('visually-hidden');
    	},
    	mouseleave: function() {
    		$('#tooltip-chapter').not('.visually-hidden').addClass('visually-hidden');
    	},
    	mousedown: function(e) {
    		e.preventDefault();
    		e.stopPropagation();

    		return false;
    	},
    	click: function() {
    		var _this = $(this),
    			_left = _this.offset().left + _this.width() / 2,
    			_progress = $('#progress-bar'),
	            _progressWidth = _progress.width(),
	            _maxTime = _videoJS.duration,
	            _propPosition = _left * 100 / _progressWidth,
	            _propPosition = Math.max(0, _propPosition),
	            _propPosition = Math.min(_propPosition, 100);

	        // Met à jour l'aperçu de la barre et la position de la vidéo
	        $('#current-time-bar').css('width', _propPosition +'%');
	        _videoJS.currentTime = _maxTime * _propPosition / 100;
    	}
    }, '.chapter');


    /* Load subtitles
    ------------------------------------------*/
    
    loadAllSRT(_language);

    function loadAllSRT(_language) {
        loadSubtitles(_language);
        loadImagesLeft();
        loadImagesRight();
        loadSideText(_language);
        loadLayoutChanges();
        
        // Règle la langue du dropdown
        var _selectedDrop = $('#drop-language li.selected'),
            _selectedLang = _selectedDrop.attr('data-lang');    
        if (!_selectedLang != _language) {
            _selectedDrop.removeClass('selected');
            $('#drop-language li[data-lang="'+ _language +'"]').addClass('selected');
            $('#drop-language > span').first().text(_language.toUpperCase());
        }
    }
    function loadSubtitles(_language) {
    	var _newUrl = getUrl(_subtitlesSRC, _language);

        $.get(_newUrl, function(data) {
            _subtitlesSRT = parseSRT(data);
        });
    }
    function loadImagesLeft() {
        $.get(_imagesLeftSRC, function(data) {
            _imagesLeftSRT = parseSRT(data);
        });
    }
    function loadImagesRight() {
        $.get(_imagesRightSRC, function(data) {
            _imagesRightSRT = parseSRT(data);
        });
    }
    function loadSideText(_language) {
    	var _newUrl = getUrl(_sideTextsSRC, _language);

        $.get(_newUrl, function(data) {
            _sideTextSRT = parseSRT(data);
        });
    }
    function loadChapters(_language) {
    	var _newUrl = getUrl(_chaptersSRC, _language);

        $.get(_newUrl, function(data) {
            _chaptersSRT = parseSRT(data);
            setChapters();
        });

        function setChapters() {
        	// For each chapter
        	_chaptersSRT.forEach(function (chapter, index, array) {
        		var _progressBar = $('#progress-bar'),
        			_chapterTime = chapter.start,
        			_chapterText = chapter.text,
        			_existingChapter = _progressBar.find('.chapter[data-time="'+ _chapterTime +'"]');

        		var _maxTime = _videoJS.duration,
        			_chapterPos = _chapterTime * 100 / _maxTime;

        		if (_existingChapter.length) {
        			_existingChapter.attr('data-content', _chapterText);
        		}
        		else {
					var _div = '<div class="chapter" style="left: '+ _chapterPos +'%" data-content="'+ _chapterText +'" data-time="'+ _chapterTime +'"></div>';
					$('#progress-bar').append(_div);
        		}	            
	        });
        }
    }
    function loadLayoutChanges() {
        $.get(_layoutChangesSRC, function(data) {
            _layoutChangesSRT = parseSRT(data);
        });
    }
    
    
    /* Change subtitles language
    ------------------------------------------*/
    
    // At first
    setDropdownLanguage(_language);

    function setDropdownLanguage(_language) {
    	var _dropdown = $('#player-language-picker'),
    		_target = _dropdown.find('li[data-lang='+ _language +']'),
    		_span = _dropdown.find('span.selected');

    	_span.text(_language.toUpperCase()).attr('data-lang', _language);
    	_target.remove();
    }

    // On user's choice
    $(document).on('click', '#player-language-picker li', function() {
        var _this = $(this),
            _language = _this.attr('data-lang');
        
        loadSubtitles(_language);
        loadSideText(_language);
        loadChapters(_language);

        var _href = window.location.href,
        	_newHref = _href.substr(0, _href.lastIndexOf('=')) + '=' + _language,
        	_newTitle = document.title;

		History.replaceState(null, _newTitle, _newHref);
    });

    
    /* Utils
    ------------------------------------------*/
    
    // Get language from url
    function getLanguage(name) {
	    var rx = new RegExp('[\&|\?]'+name+'=([^\&\#]+)'),
	        val = window.location.search.match(rx);

	        if (!val) {
	        	History.replaceState(null, document.title, window.location.href + '?lang=en');
	        }

	    return !val ? 'en' : val[1];
	}
	// Get url from sources array
	function getUrl(array, code) {
		for (var i = 0; i < array.length; i++) {
			if (array[i][0] == code) {
				return array[i][1];
			}
		}
	}
    // .srt to array
    function parseSRT(srt) {
        var subs = [], index, time, text, start, end;

        if (!srt) {
            return 'No SRT to parse';
        }

        srt = srt.trim();
        srt += '\n';
        srt = srt.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n').split('\n');

        srt.forEach(function(line) {
            line = line.toString();
            line = line.replace(/\*(.*?)\*/g, "<i>$1</i>")

            // if we don't have an index, so we should expect an index
            if (!index) {
                if (/^\d+$/.test(line)) {
                    index = parseInt(line);
                    return;
                }
            }

            // now we have to check for the time
            if (!time) {
                var match = line.match(/^(\d{2}:\d{2}:\d{2},\d{2,}) --> (\d{2}:\d{2}:\d{2},\d{2,})$/);
                if (match) {
                    start = match[1];
                    end = match[2];
                    time = true;
                    return;
                }
            }

            // now we get all the strings until we get an empty line
            if (line.trim() === '') {
                var endMs = srtToS(end),
                    startMs = srtToS(start);

                subs.push({
                    index: index,
                    start: startMs,
                    end: endMs,
                    text: text || ''
                });
                index = time = start = end = text = null;
            } 
            else {
                if (!text) {
                    text = line;
                } else {
                    text += '\n' + line;
                }
            }
        })

        return subs;
    }
    // Convert duration (s -> 00h00mn00s)
    function formatTime(_seconds) {
        var sec_num = parseInt(_seconds, 10),
            hours   = Math.floor(sec_num / 3600),
            minutes = Math.floor((sec_num - (hours * 3600)) / 60),
            seconds = sec_num - (hours * 3600) - (minutes * 60),
            _newTime = '';


        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}


        if (hours == '00') {
            _newTime = minutes +' mn '+ seconds +' s';
        }
        else {
            _newTime = hours+' h'+ minutes +' mn '+ seconds +' s'
        }
        return _newTime;
    }
    // Convert duration (00:00:00,000 -> s)
    function srtToS(_time) {
        var match = _time.match(/^(\d{2}):(\d{2}):(\d{2}),(\d{2,})$/)

        if (!match) {
            throw new Error('Invalid SRT time format')
        }

        var hours = parseInt(match[1], 10),
            minutes = parseInt(match[2], 10),
            seconds = parseInt(match[3], 10),
            milliseconds = parseInt(match[4], 10)

        hours *= 3600000
        minutes *= 60000
        seconds *= 1000

        ms = hours + minutes + seconds + milliseconds;
        s = ms / 1000;
        
        return s
    }
    // Convert duration (s -> 00:00:00,000)
    function toSrtTime (milliseconds) {
    	milliseconds = Math.round(milliseconds * 1000);

		  if (!/^\d+$/.test(milliseconds.toString())) {
		    throw new Error('Time should be an Integer value in milliseconds')
		  }

		  milliseconds = parseInt(milliseconds)

		  var date = new Date(0, 0, 0, 0, 0, 0, milliseconds)

		  var hours = date.getHours() < 10
		    ? '0' + date.getHours()
		    : date.getHours()

		  var minutes = date.getMinutes() < 10
		    ? '0' + date.getMinutes()
		    : date.getMinutes()

		  var seconds = date.getSeconds() < 10
		    ? '0' + date.getSeconds()
		    : date.getSeconds()

		  var ms = milliseconds - ((hours * 3600000) + (minutes * 60000) + (seconds * 1000))

		  if (ms < 100 && ms >= 10) {
		    ms = '0' + ms
		  } else if (ms < 10) {
		    ms = '00' + ms
		  }

		  var srtTime = hours + ':' + minutes + ':' + seconds + ',' + ms

		  return srtTime
		}

});