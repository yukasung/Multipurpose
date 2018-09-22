"use strict";

var theme = {
    ButtonGoTopOffset: 100,
    ButtonGoTopDuration: 500,
    init: function () {

        theme.initGoogleMap();
        theme.initProgressBar();
        theme.initCounter();
        theme.initCheckboxCollapse();
        theme.initOwlCarousel();
        theme.initParallax();
        theme.initVideo();
        theme.initChart();
        theme.initGoToTopBotton();

    },
    loadEvent: function () {

        $('#preloader .loading').fadeOut();
        $("#preloader").fadeOut(function () {
            $(this).remove();
        });
        $('body').css({
            'overflow': 'visible'
        });

    },
    resizeEvent: function () {
        theme.setTopSpace();
    },
    scrollEvent: function (obj) {

        if ($(obj).scrollTop() > this.ButtonGoTopOffset) {
            $('#btnGoTop').fadeIn(this.ButtonGoTopDuration);
        } else {
            $('#btnGoTop').fadeOut(this.ButtonGoTopDuration);
        }

    },
    initParallax: function () {

        if ($('.parallax').length > 0) {
            new Rellax('.parallax', {
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
    initOwlCarousel: function () {

        var owl = $('.owl-carousel');
        owl.imagesLoaded(function () {
            owl.each(function () {

                var options = $(this).data("owl-carousel-options");
                var defaults = {
                    navText: ["<img src='../../assets/images/other/nav_prev.png'>", "<img src='../../assets/images/other/nav_next.png'>"]
                }

                $(this).owlCarousel($.extend(defaults, options));

            });
        });
    },
    initGoogleMap: function () {

        $('.google-map').lazyLoadGoogleMaps({

            callback: function (container, map) {

                var $container = $(container);
                var $center = new google.maps.LatLng($container.attr('data-lat'), $container.attr('data-lng'));
                var $zoom = 15;

                if ($container.attr('data-zoom')) {
                    $zoom = parseInt($container.attr('data-zoom'));
                }
                map.setOptions({
                    zoom: $zoom,
                    center: $center
                });
                new google.maps.Marker({
                    position: $center,
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
    initVideo: function () {

        $('.video-icon').click(function (e) {

            e.preventDefault();

            var video = $(this).closest('.video');
            var iframe = video.find('iframe');
            var src = iframe.data('src');

            iframe.removeClass("d-none");
            video.addClass('video-reveal');
            iframe.attr('src', src);

        });
    },
    initGoToTopBotton() {

        $('#btnGoTop').click(function (event) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, this.ButtonGoTopDuration);
            return false;
        });

    }
};


$(document).ready(function () {
    theme.init();
});

$(window).resize(function () {
    theme.resizeEvent();
});

$(window).scroll(function () {
    theme.scrollEvent(this);
});

$(window).load(function () {
    theme.loadEvent();
});