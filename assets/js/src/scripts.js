$(document).ready(function() {

	var _window = $(window),
		_windowJS = window,
		_mobile = false;

	if (_window.width() < 800) {
		_mobile = true;
		$('#pages').addClass('not-animated').removeClass('out');
		$('#prompter').remove();
	}

	_window.on('resize', function() {
		if (_window.width() < 800) {
			_mobile = true;
		}
		else {
			_mobile = false;
		}
		setBudget();
	});


	/* RAF Polyfill
	---------------------------------------*/

	(function() {
	    var lastTime = 0;
	    var vendors = ['ms', 'moz', 'webkit', 'o'];
	    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
	        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
	                                    || window[vendors[x]+'CancelRequestAnimationFrame'];
	    }

	    if (!window.requestAnimationFrame)
	        window.requestAnimationFrame = function(callback, element) {
	            var currTime = new Date().getTime();
	            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
	                timeToCall);
	            lastTime = currTime + timeToCall;
	            return id;
	        };

	    if (!window.cancelAnimationFrame)
	        window.cancelAnimationFrame = function(id) {
	            clearTimeout(id);
	        };
	}());


	/* Intro sequence
	---------------------------------------*/

	if ($('#intro').length) {
		var _intro = $('#intro'),
			_changeCircles;

		// Make steps slide
		var slideStep = setInterval(function() {
			var _out = _intro.find('.intro-step.out').first();
			_out.removeClass('out');

			if (_out.index() == _intro.find('.intro-step').length - 1) {
				clearInterval(slideStep);

				setTimeout(function() {
					$('#circles .section-circles-ctn .hidden').first().removeClass('hidden').addClass('playing');
					_changeCircles = setInterval(function() {
						var _circles = $('#circles .section-circles-ctn'),
							_currentCircle = _circles.find('.playing'),
							_nextCircle = _currentCircle.next('img').length ? _currentCircle.next('img') : _circles.find('img').first();

						_currentCircle.removeClass('playing').addClass('hidden');
						_nextCircle.removeClass('hidden').addClass('playing');
					}, 5000);
				}, 2500);

				return false;
			}
		}, 1400);

		// Skip the intro on click on the button
		$('#intro-skip button').on('click', function(e) {
			var _pages = $('#pages'),
				_currentLang = $('html').attr('lang'),
				_contentLang = _pages.attr('data-lang');

			// If the loaded content is already in the right language
			if (_contentLang == _currentLang) {
				showMenu();
			}
			else {
				var _this = $(this),
					_loading = _this.attr('data-loading'),
					_baseUrl = _pages.attr('data-baseurl');

				// Show a waiting message
				_this.html(_loading);

				// And query the new content
				$.ajax({
		            type: 'post',
		            url: _baseUrl + '/set-content/get-correct-language',
		            data: {lang: _currentLang},
		            success: function(content) {
		            	_pages.html(content).attr('data-lang', _currentLang);
		            	showMenu();
		            	setBudget();
		            },
		            error: function (xhr, ajaxOptions, thrownError) { }
				});
			}


			
			function showMenu() {
				clearInterval(_changeCircles);
				$('#circles .section-circles-ctn .playing').removeClass('playing').addClass('hidden');

				$('#circles').removeClass('animated').addClass('out');
				_intro.addClass('out');
				_pages.removeClass('out');

				var _newTitle = document.title,
					_newHref = window.location.href.replace(/\/$/, "") + '/menu';

				History.pushState(null, _newTitle, _newHref);

				setTimeout(function() {
					_intro.remove();
				}, 410);
			}
		});
		// Change language on the preview
		$(document).on('click', '.change-language', function() {
			var _this = $(this),
				_current = $('.content-lang').not('.hide'),
				_next = $('.content-lang.hide'),
				_code = _next.attr('data-lang'),
				_url = checkProtocol(_next.attr('data-url'));

			History.replaceState(null, document.title, _url);
			$('html').attr('lang', _code);

			_current.addClass('hide');
			_next.removeClass('hide');
		})
		function checkProtocol(url) {
		   if (url && !/^(f|ht)tps?:\/\//i.test(url)) {
		      url = window.location.protocol + url;
		   }
		   return url;
		}
	}


	/* Interaction of pages
	---------------------------------------*/
    
	$(document).on({
		'mouseenter': function() {
			if (!_mobile) {
				var _this = $(this),
					_index = _this.index(),
					_prefix = ['first', 'second', 'third'],
					_class = _prefix[_index] + '-hovered';

				$('.pages').addClass(_class);
			}
		},
		'mouseleave': function() {
			if (!_mobile) {
				var _this = $(this),
					_index = _this.index(),
					_prefix = ['first', 'second', 'third'],
					_class = _prefix[_index] + '-hovered';

				$('.pages').removeClass(_class);
			}
		},
		'click touchstart': function(e) {
			var _this = $(this),
				_index = _this.index(),
				_prefix = ['first', 'second', 'third'],
				_class = _prefix[_index] + '-open';

			e.preventDefault();

			if (_window.width() < 800) {
				resetPagesMobile();
			}

			$('.pages').removeClass('first-hovered second-hovered third-hovered first-open second-open third-open').addClass(_class);


			_this.removeClass('close').addClass('open');
			$('.ctn-page').not(_this).removeClass('open close').addClass('close');

			var _href = window.location.href,
				_uid = _this.attr('data-uid');
				_newTitle = document.title,
				_newHref = _href.substr(0, _href.lastIndexOf('/')) + '/' + _uid;

			History.pushState(null, _newTitle, _newHref);
		}
	}, '.ctn-page:not(.open)');


	// Trigger the closePage() function
	$(document).on('click', '.page-close', function(e) {
		closePage();
		e.stopPropagation();

		var _href = window.location.href,
			_newTitle = document.title,
			_newHref = _href.substr(0, _href.lastIndexOf('/')) + '/menu';

		History.pushState(null, _newTitle, _newHref);
	});


	/* Tabs accordion
	---------------------------------------*/

	$(document).on('click', '.page-tabslist-tab', function() {
		var _this = $(this),
			_parent = _this.closest('.page'),
			_content = _this.next('.page-tabslist-tab-content');

		if (_content.hasClass('closed')) {
			var _height = _content.find('.height-container').outerHeight();
			_content.css('height', _height).removeClass('closed').addClass('open');
			setScroll(_height, _content, _parent, true);
		}
		else if (_content.hasClass('open')) {
			_content.css('height', 0).removeClass('open').addClass('closed');
		}
	});

	function setScroll(_height, _content, _parent, _top) {
		setTimeout(function() {
			var _currentScroll = _parent.scrollTop(),
				_positionEl = _content.position().top,
				_windowH = _window.height(),
				_newScroll;

			if (_top) {
				_newScroll = _positionEl - _windowH / 5;
			}
			else {
				var _bottom = _positionEl + _height;

				if (_bottom < _currentScroll + _windowH) {
					return false;
				}

				_newScroll = _bottom - _windowH;
			}
			_parent.animate({ scrollTop: _newScroll }, 600, $.bez([0.215, 0.61, 0.355, 1]));
		}, 50);
	}

	$(document).on('click', '.tab-content-participant, .tab-content-credit', function() {
		var _this = $(this),
			_content = _this.next('.tab-content-participant-links, .tab-content-credit-details'),
			_parent = _this.closest('.page-tabslist-tab-content, .page-tabslist-tab-content'),
			_parentHeight = _parent.outerHeight(),
			_contentHeight = _content.find('.height-container').outerHeight(),
			_scrollableParent = _this.closest('.page');

		if (_content.hasClass('closed')) {
			_content.css('height', _contentHeight).removeClass('closed').addClass('open');
			_parent.css('height', _parentHeight + _contentHeight);
			setScroll(_contentHeight, _content, _scrollableParent, false);
		}
		else if (_content.hasClass('open')) {
			_content.css('height', 0).removeClass('open').addClass('closed');
			_parent.css('height', _parentHeight - _contentHeight);
		}
	});


	/* Budget
	---------------------------------------*/

	setBudget();

	function setBudget() {
		var _budgetDIV = $('#svg-budget'),
			_budgetData = {
			    name: "Budget",
			    children: $.parseJSON(_budgetDIV.attr('data-json'))
			};

		var _total = getTotal(_budgetData),
			_w = _budgetDIV.width(),
		    _h = _budgetDIV.height();

	    var color = d3.scale.linear().domain([0, 35]).range(["#ef5c59", "#ffffff"]);

		var div = d3.select("#svg-budget")
		    		.append("div")
		       		.style("position", "relative");

		var treemap = d3.layout.treemap()
		    			.size([_w, _h])
		    			.sticky(true)
		    			.value(function(d) { return d.value; });
		 
		var node = div.datum(_budgetData)
					  .selectAll(".node")
		      	      .data(treemap.nodes)
		    	      .enter()
		    	      .append("div")
			  		  .attr("class", "node")
		      		  .call(position)
		      		  .style("background-color", function(d) { return color(getProp(d.value, _total)); })
		      		  .append("div")
		      		  .attr('class', 'texte')
		      		  .html(function(d) { return d.children ? null : "<p>" +d.name + "</p><p>" +Math.round(d.value)+" €</p>"; });
	}
	 
	function getTotal(data) {
		var _arr = data.children,
			_total = 0;

		for (var i = 0; i < _arr.length; i++) {
			_total += parseInt(_arr[i].value);
		}

		return _total;
	}
	function getProp(value, total) {
		var _percent = Math.floor(parseInt(value) * 100 / total);

		return _percent;
	}
	function position() {
	    this.style("left", function(d) { return d.x + "px"; })
	        .style("top", function(d) { return d.y + "px"; })
	        .style("width", function(d) { return Math.max(0, d.dx) + "px"; })
	        .style("height", function(d) { return Math.max(0, d.dy) + "px"; });
	}


	/* Questions before video
	---------------------------------------*/

	$(document).on('click', '#page-watch button', function(e) {
		var _this = $(this);

		if (_this.val() == 'yes') {
			$('#step-1').addClass('hide');
			$('#step-2').removeClass('hide');
		}
		else if (_this.val() == 'no') {
			closePage();
		}

		e.stopPropagation();
	});
	$(document).on('click', '#page-languages button', function(e) {
		var _this = $(this),
			_language = _this.val(),
			_href = _this.attr('data-href');

		_this.closest('.page').addClass('hide');
		$('#pages').addClass('closing');
		setTimeout(function() {
			window.location = _href;
		}, 210);

		e.stopPropagation();
	});


	/* Functions
	---------------------------------------*/

	// Resets the pages
	function closePage() {
		$('.pages').removeClass('first-hovered second-hovered third-hovered first-open second-open third-open');
		$('.ctn-page').removeClass('open close');
		$('.page-tabslist-tab-content.open, .tab-content-participant-links.open, .tab-content-credit-details.open').css('height', 0).removeClass('open').addClass('closed');
		$('#step-1.hide').removeClass('hide');
		$('#step-2').not('.hide').addClass('hide');

		if (_window.width() < 800) {
			$('.page').each(function() {
				$(this).scrollTop(0);
			});
		}
	}
	// Resets the mobile pages
	function resetPagesMobile() {
		$('.page-tabslist-tab-content.open, .tab-content-participant-links.open, .tab-content-credit-details.open').css('height', 0).removeClass('open').addClass('closed');
		$('.page').each(function() {
			$(this).scrollTop(0);
		});
	}

});