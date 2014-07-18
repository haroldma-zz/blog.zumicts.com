(function ($) {

  // MOBILE DETECTION

  var is_mobile = false;
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    is_mobile = true;
  }

  $(document).ready(function(){

    // On the home page, move the blog icon inside the header
    // for better relative/absolute positioning.

    // $("#blog-logo").prependTo("#site-head-content");

    // PARALLAX HEADER

    var $parallaxed = $('.parallaxed')
      , containerWidth = $parallaxed.width()
      , containerHeight = $parallaxed.height()
      , $window = $(window)
      , windowWidth = $window.width()
      , originalBgPosition = $parallaxed.css('background-position');

    // reset container size on window resize
    $window.resize(function() {
      if (is_mobile === true) return;
      containerWidth = $parallaxed.width()
      containerHeight = $parallaxed.height();
      // reset window width
      windowWidth = $(window).width();
    });

    var calculateParallax = function(el, posX, posY) {
      if (is_mobile === true) return;
      // reduce and invert
      var newPosX = posX * 0.2 * -1
        , newPosY = posY * 0.2 * -1
        , newBgPosition
        , constrainedPosX
        , constrainedPosY;

        // constrain horizontal movement
        if (posX <= containerWidth) {
          constrainedPosX = newPosX;
        } else {
          constrainedPosX = containerWidth * 0.2 * -1;
        }

        // constrain vertical movement
        if (posY <= containerHeight) {
          constrainedPosY = newPosY;
        } else {
          constrainedPosY = containerHeight * 0.2 * -1;
        }

        newBgPosition = constrainedPosX + 'px ' + constrainedPosY + 'px';

      // apply to header background
      if ($.browser.mozilla == true) {
        // FF Sucks, so they get the shitty version
        $parallaxed.css('background-position', newBgPosition);
      } else {
        // Smooth operation for other browsers
        $parallaxed.animate({
          'background-position-x': constrainedPosX,
          'background-position-y': constrainedPosY
        },
        {
          queue: false,
          duration: 1000,
          easing: 'easeOutExpo'
        });
      }
    };

    // only active if window width is greater than 700
    // (what's the point otherwise?)
    $('body').on('mousemove', function(e) {
      if (windowWidth > 700) {
        if (is_mobile === true) return;
        calculateParallax(this, e.pageX, e.pageY);
      } else {
        // reset bg
        $parallaxed.css('background-size', 'cover');
        $parallaxed.css('background-position', originalBgPosition);
      }

      // or if it's NOT a mobile browser
      if (is_mobile === true) {
        $parallaxed.css('background-size', 'cover');
        $parallaxed.css('background-position', originalBgPosition);
      }
    });

    // SHRINK OR EXPAND INDEX HEADER WHEN SCROLLING PAGE

    var $header = $("#site-head")
      , headerHeight = $header.height()
      , $headContent = $("#site-head-content")
      , $document = $(document)
      , newHeight
      , scrollPosition;

    $(window).scroll(function(e) {
      if (is_mobile === true) return;
      scrollPosition = $document.scrollTop();
      if (scrollPosition <= headerHeight) {
        // console.log(headerHeight, scrollPosition);

        newHeight = headerHeight - scrollPosition * 5;
        $header.animate({
          "height": newHeight
        },
        {
          queue: false,
          duration: 1000,
          easing:'easeOutQuint'
        });

        // fade header content
        if (scrollPosition * 5 >= headerHeight * 0.5) {
          $headContent.animate({"opacity": 0}, {
            queue:false,
            duration:1000,
            easing:'easeOutQuint'
          });
        } else {
          $headContent.animate({"opacity": 1}, {
            queue:false,
            duration:1000,
            easing:'easeOutQuint'
          });
        }
      }
    });

    // NAVIGATION

    $("#navigation > a").on("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      $("#navigation .navigation-options").slideToggle();
    });

    // SEARCH

    var searchField = $("#search-field").ghostHunter({
      results: "#results",
      onKeyUp: true,
      displaySearchInfo: false,
      zeroResultsInfo: false,
      info_template: "<p><i class='fa fa-file-text-o'></i> {{amount}}</p>",
      result_template: "<div class='result-cell'><a href='{{link}}'><div><b>{{title}}</b> <br> <small>{{pubDate}}</small></div></a></div>",
      onComplete: function(){
        $("#results .result-cell").velocity("transition.slideUpBigIn", { stagger: 250 }, { duration: 1500 });
      }
    });

  });


}(jQuery));

// DEFAULT GHOST BLOG STUFF

/**
 * Main JS file
 */

/*globals jQuery, document */
(function ($) {
    "use strict";

    $(document).ready(function(){

        $(".post-content").fitVids();

        function casperFullImg() {
            $("img").each( function() {
                var contentWidth = $(".post-content").outerWidth(); // Width of the content
                var imageWidth = $(this)[0].naturalWidth; // Original image resolution

                if (imageWidth >= contentWidth) {
                    $(this).addClass('full-img');
                } else {
                    $(this).removeClass('full-img');
                }
            });
        };

        casperFullImg();
        $(window).smartresize(casperFullImg);

        if ($('.post-content').length == 1){
            var pageText = $('.post-content').text().replace(/\r?\n/g,'');

            var read_time = function(text){
            var minutes = Math.floor(text.split(' ').length / 200 )
            if(minutes === 0) minutes = 1
            return minutes + ' min read'
            }
            $('.post-meta').append(' <i style="margin-left: 10px;" class="fa fa-clock-o"></i> <span>'
            + read_time(pageText) +'</span>');
        }
    });

}(jQuery));

(function($,sr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');
