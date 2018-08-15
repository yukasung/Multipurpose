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
        theme.initGoogleMap();
        theme.initProgressBar();
        theme.initNavbarPopup();
        theme.initCounter();
        theme.initCheckboxCollapse();
        theme.initCardLinkShare();
        theme.initOwlCarousel();
        theme.initParallax();
        theme.initVideo();
        theme.initChart();
    },
    resizeEvent: function () {
        theme.setTopSpace();
    },
    initParallax: function () {

        if ($('.parallax').length > 0) {
            var parallax = new Rellax('.parallax', {
                center: true
            });
        }

    },
    initChart: function () {

        $('#chartBar').each(function (i) {

            $(this).appear(function () {
                Chart.defaults.global.defaultFontColor = '#333333';
                var chartBar = $("#chartBar")[0].getContext('2d');

                var myChart = new Chart(chartBar, {
                    type: 'bar',
                    data: {
                        labels: ["2012", "2013", "2014", "2015", "2016", "2017", "2018"],
                        datasets: [{
                            label: 'Revenue by Year',
                            data: [22, 24, 25, 26, 29, 31, 34],
                            backgroundColor: 'rgba(52, 152, 219, 1)',
                            borderWidth: 0
                        }]
                    },
                    options: {
                        responsive: true,
                        title: {
                            display: true,
                            text: 'Revenue by Year'
                        },
                        legend: {
                            display: false,
                        },
                        scales: {
                            yAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Revenue in billion U.S. dollars'
                                },
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                        animation: {
                            duration: 3000
                        }
                    }
                });
            });

        });

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
                    navText: ["<img src='../assets/images/other/nav_prev.png'>","<img src='../assets/images/other/nav_next.png'>"]
                }

                $(this).owlCarousel( $.extend( defaults, options) );

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
                $(this).skillBars({
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

            if ($('.space-top').length > 0) {

                if (!$('.navbar').hasClass('bg-transparent')) {
                    topSpaceHeight = $('.navbar').outerHeight();
                }

                if ($('.header-top').length > 0) {
                    topSpaceHeight = topSpaceHeight + $('.header-top').outerHeight();
                }

                topSpaceHeight -= 2;
                $('.space-top').css('margin-top', topSpaceHeight + "px");

            }

        }

    }
};