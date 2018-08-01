$(document).ready(function () {
    'use strict';
    theme.init();
});

$(window).resize(function () {
    theme.resizeEvent();
});

var theme = {
    init: function () {
        theme.setTopSpace();
        theme.initIsoTope();
        theme.initNavbar();
        theme.initGoogleMap();
        theme.initProgressBar();
        theme.initNavbarPopup();
        theme.initLightGallery();
        theme.initCounter();
        theme.initCheckboxCollapse();
        theme.initCardLinkShare();
        theme.initWOW();
        theme.initOwlCarousel();
        theme.initParallax();
        theme.initVideo();
        theme.initChart();
    },
    resizeEvent: function () {
        theme.setTopSpace();
    },
    parallaxUpdate: function (evt, obj) {
        var vw = $(window).width();
        var vh = $(window).height();
        var st = $(window).scrollTop();
        var sl = $(window).scrollLeft();
        var pos = $(obj).offset();
        var ot = pos.top;
        var ol = pos.left;
        var ow = $(obj).innerWidth();
        var oh = $(obj).innerHeight();

        // Check if element is in viewport
        if (st + vh < ot) return;
        if (st > ot + oh) return;

        var iw = parseInt($(obj).attr('data-parallax-img-width'));
        var ih = parseInt($(obj).attr('data-parallax-img-height'));
        var parallax_ratio = parseFloat($(obj).attr('data-parallax-ratio'));
        parallax_ratio = (isNaN(parallax_ratio)) ? 1 : parallax_ratio;
        var expand_ratio = parseFloat($(obj).attr('data-parallax-expand'));
        expand_ratio = (isNaN(expand_ratio)) ? 1 : expand_ratio;

        // Calculate image size
        var img_wh = ((iw / ih) < (ow / oh));
        var img_ratio = (img_wh) ? (iw / ow) : (ih / oh);
        var fw = iw / img_ratio * expand_ratio;
        var fh = ih / img_ratio * expand_ratio;
        var fsize = fw + 'px ' + fh + 'px';

        // Calculate scroll delta
        var t = Math.abs((ot - vh - st));
        var m = vh + oh;
        var d = t / m;

        // Vertical parallax only - centralizing image horizontally
        var px = ((fw - ow) / 2) * -1;

        // Calculate image position
        var py = 0;
        py = ((fh - oh) * d) * -1;
        var fpos = px + 'px ' + py + 'px';

        // Settings properties
        $(obj).css({
            'background-size': fsize,
            'background-position': fpos
        });
    },
    parallaxUpdateAll: function (evt, cls) {
        $(cls).each(function (idx, obj) {
            theme.parallaxUpdate(null, obj);
        });
    },
    initParallax: function () {

        if ($('.parallax').length > 0) {
            var parallax = new Rellax('.parallax', {
                center: true
            });
        }

    },
    initChart: function(){

        var data = {
            // A labels array that can contain any sort of values
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            // Our series array that contains series objects or in this case series data arrays
            series: [
              [5, 2, 4, 2, 0]
            ]
          };
          
          // Create a new line chart object where as first parameter we pass in a selector
          // that is resolving to our chart container element. The Second parameter
          // is the actual data object.
          new Chartist.Line('.ct-chart', data);

    },
    // add animate.css class(es) to the elements to be animated
    setAnimation: function (elem, inOut) {
        // Store all animationend event name in a string.
        // cf animate.css documentation
        var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

        elem.each(function () {

            var element = $(this);
            var animationType = 'animated ' + element.data('animation-' + inOut);
            var animationDurations = {};

            if (element.data('animation-duration')) {
                animationDurations['animation-duration'] = element.data('animation-duration');
            }

            if (element.data('animation-delay')) {
                animationDurations['animation-delay'] = element.data('animation-delay');
            }

            if (element.data('animation-offset')) {
                animationDurations['animation-offset'] = element.data('animation-offset');
            }

            element.addClass(animationType).css(animationDurations).one(animationEndEvent, function () {
                element.removeClass(animationType);
                element.removeAttr('style');
            });

        });
    },
    initOwlCarousel: function () {

        var owl = $('.owl-carousel');
        owl.imagesLoaded(function () {
            owl.each(function () {

                var currentItem = {};
                var elemsToanim = {};
                var round = 0;
                var options = $(this).data("owl-carousel-options");
                var defaults = {
                    navText: "",
                }

                if (options != undefined) {
                    $(this).owlCarousel(options);
                }

                $(this).on('change.owl.carousel', function (event) {
                    currentItem = $('.owl-item', owl).eq(event.item.index);
                    elemsToanim = currentItem.find("[data-animation-out]");
                    theme.setAnimation(elemsToanim, 'out');
                });

                $(this).on('changed.owl.carousel', function (event) {
                    currentItem = $('.owl-item', $(this)).eq(event.item.index);
                    elemsToanim = currentItem.find("[data-animation-in]");
                    theme.setAnimation(elemsToanim, 'in');
                });

                currentItem = $('.owl-item', owl).eq(2);
                elemsToanim = currentItem.find("[data-animation-in]");
                theme.setAnimation(elemsToanim, 'in');

            });
        });
    },
    initIsoTope: function () {

        var $grid = $('.portfolio-grid').isotope();

        // filter functions
        var filterFns = {
            // show if number is greater than 50
            numberGreaterThan50: function () {
                var number = $(this).find('.number').text();
                return parseInt(number, 10) > 50;
            },
            // show if name ends with -ium
            ium: function () {
                var name = $(this).find('.name').text();
                return name.match(/ium$/);
            }
        };

        // bind filter on select change
        $('.portfolio-filter').on('change', function () {
            var filterValue = this.value;
            filterValue = filterFns[filterValue] || filterValue;
            $grid.isotope({
                filter: filterValue
            });
        });

        // // bind filter button click
        // $('.portfolio-filter').on('click', 'a', function () {
        //     var filterValue = $(this).attr('data-filter');
        //     // use filterFn if matches value
        //     filterValue = filterFns[filterValue] || filterValue;
        //     $grid.isotope({
        //         filter: filterValue
        //     });
        // });

        // // change is-checked class on buttons
        // $('.portfolio-filter').each(function (i, buttonGroup) {
        //     var $buttonGroup = $(buttonGroup);
        //     $buttonGroup.on('click', 'a', function () {
        //         $buttonGroup.find('.active').removeClass('active');
        //         $(this).addClass('active');
        //     });
        // });

        var portfolioPackery = $('.portfolio-grid-packery');
        portfolioPackery.imagesLoaded(function () {
            portfolioPackery.isotope({
                layoutMode: 'packery',
                itemSelector: '.grid-item',

            });
        });

        var portfolioMasonry = $('.portfolio-grid-masonry');
        portfolioMasonry.imagesLoaded(function () {
            portfolioMasonry.isotope({
                layoutMode: 'masonry',
                itemSelector: '.grid-item',

            });
        });

    },
    initNavbar: function () {

    },
    initGoogleMap: function () {

        $('.google-map').lazyLoadGoogleMaps({
            callback: function (container, map) {
                var $container = $(container),
                    center = new google.maps.LatLng($container.attr('data-lat'), $container.attr('data-lng'));

                map.setOptions({
                    zoom: 15,
                    center: center
                });
                new google.maps.Marker({
                    position: center,
                    map: map
                });
            }
        });

    },
    initProgressBar: function () {

        $('.skillbar').each(function (i) {
            $(this).appear(function () {
                $('.skillbar').skillBars({
                    from: 0,
                    speed: 2000,
                    interval: 100,
                });
            });
        });

    },
    initNavbarPopup: function () {

        $('a[data-toggle="navbar-popup"]').on("click", function (e) {

            var target = $(this).attr("data-target");
            var btnClose = $(target).find('.btn-close');
            var lblTitle = $(target).find('.popup-title');

            e.preventDefault();
            $(target).show();

            setTimeout(function () {
                $(target).addClass("visible");
            }, 100);
            setTimeout(function () {
                lblTitle.addClass("visible");
            }, 600);
            setTimeout(function () {
                btnClose.addClass("visible");
            }, 800);

            btnClose.bind("click", function () {
                $(target).removeClass("visible");
                setTimeout(function () {
                    $(target).hide();
                    btnClose.removeClass("visible");
                    lblTitle.removeClass("visible");
                }, 300);
            });

        });

    },
    initLightGallery: function () {

        $('.light-gallery').lightGallery({
            thumbnail: true,
            selector: '.lgitem',
            animateThumb: true,
            showThumbByDefault: false,
            download: false,
            autoplayControls: false,
            thumbWidth: 100,
            thumbContHeight: 80,
            videoMaxWidth: '1000px'
        });

        $('.video-gallery').lightGallery();

    },
    initCounter: function () {

        $(".counter").appear(function () {
            $(this).children('.text-counter').countTo();
        });

    },
    initCheckboxCollapse: function () {

        $('.checkbox-collapse .custom-checkbox').on('click', function (e) {

            if ($(this).find('input[type=checkbox]').prop('checked')) {
                $(this).parent().find('.collapse').collapse('show');
            } else {
                $(this).parent().find('.collapse').collapse('hide');
            }

            e.stopPropagation();
        })

    },
    initCardLinkShare: function () {

        $(".card-link-share").click(function () {
            var cardSocial = $(this).closest("div").find(".card-social");
            cardSocial.toggleClass("active");
            return false;
        });

    },
    initWOW: function () {
        new WOW().init();
    },
    initVideo: function () {

        $(document).on('click', '.video-icon', function (ev) {
            ev.preventDefault();
            var video = $(this).closest('.video');
            var iframe = video.find('iframe');
            var src = iframe.data('src');
            iframe.removeClass("d-none");
            video.addClass('video-reveal');
            iframe.attr('src', src);
            
        });
    },
    setTopSpace: function () {

        var topSpaceHeight = 0;

        if ($('.navbar').hasClass('navbar-top') || $('nav').hasClass('navbar-fixed-top')) {

            if ($('.top-space').length > 0) {

                if (!$('.navbar').hasClass('bg-transparent')) {
                    topSpaceHeight = $('.navbar').outerHeight();
                }

                if ($('.header-top').length > 0) {
                    topSpaceHeight = topSpaceHeight + $('.header-top').outerHeight();
                }

                topSpaceHeight -= 2;
                $('.top-space').css('margin-top', topSpaceHeight + "px");

            }

        }

    }
};