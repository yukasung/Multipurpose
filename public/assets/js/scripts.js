
function setNavbarPosition(){

    var navbarHeight = $('.navbar').height();
    // $( 'body' ).css('padding-top', navbarHeight + 'px');
    $('.navbar .nav-item > a').css('line-height', navbarHeight + 'px');
    $( '.navbar-action' ).css('top', (navbarHeight / 2) - 22 + 'px');
    $( '#search_form' ).css('top', navbarHeight + 'px');

}

$(window).resize(function() {
    setNavbarPosition();
}); 

/* ----------------------------------------------------------- */
/*  Fixed header
/* ----------------------------------------------------------- */

$(window).on('scroll', function(){
    if ( $(window).scrollTop() > 70 ) {
        $( '.navbar' ).addClass('fixed-top');
    } else {
        $( '.navbar' ).removeClass('fixed-top');
    }
});


$(document).ready(function() {
    'use strict';

    setNavbarPosition();

    /*-----------------------------------------------------------------------------------*/
    /*  NAVBAR
    /*-----------------------------------------------------------------------------------*/

    $( '.navbar-nav .dropdown' ).each(function() {
        var navbarToggle = '.navbar-toggler';
        var dropdown = $(this),
          dropdownToggle = $('[data-toggle="dropdown"]', dropdown),
          dropdownHoverAll = dropdownToggle.data('dropdown-hover-all') || false;
        
        // Mouseover
        dropdown.hover(function(){
            var isMobileMenu = $(navbarToggle).size() > 0 && $(navbarToggle).css('display') !== 'none';
            if ((dropdownHoverAll == true || (dropdownHoverAll == false && !isMobileMenu))) { 
                dropdownToggle.trigger('click');
            }
        })

    });

    $('.navbar-search').click(function() {
        $(this).toggleClass('navbar-search-active');
        $('#search_form').toggleClass('show');
        
        if($('.navbar-action').find('.navbar-toggler-active').length > 0){
            $('.navbar-action').find('*').removeClass('navbar-toggler-active');
            $('.navbar-collapse').collapse('hide');
        }
        return false;
    });

    $('.navbar-toggler').click(function() {
        $(this).toggleClass('navbar-toggler-active');
         if($('.navbar-action').find('.navbar-search-active').length > 0){
            $('.navbar-search').toggleClass('navbar-search-active');
            $('#search_form').toggleClass('show');
        }
    });

    /*-----------------------------------------------------------------------------------*/
    /*  NAV VERTICAL
    /*-----------------------------------------------------------------------------------*/

    $( '.nav-vertical .nav-item' ).click(function() {
        $(this).toggleClass('show');
    });

    $(".nav-vertical a").click(function(event){
        if($(this).next('ul').length){
            event.preventDefault();
            $(this).next().toggle('fast');
            $(this).children('i:last-child').toggleClass('fa-caret-down fa-caret-left');
        }
    });

    /*-----------------------------------------------------------------------------------*/
    /*  OWL CAROUSEL
    /*-----------------------------------------------------------------------------------*/

    $( '.slider-owl' ).owlCarousel({
        items: 1,
        dots: true,
        loop: true,
        margin: 0
    });

    $( '.owl-col-1' ).owlCarousel({
        items: 1,
        nav: true,
        navText: ['', ''],
        dots: true,
        loop: true,
        margin: 0
    });

    $( '.owl-col-2' ).owlCarousel({
        autoplay: false,
        autoplayTimeout: 8000,
        loop: false,
        margin: 30,
        nav: false,
        dots: true,
        responsive: {
            0: {
                items: 1
            },
            992: {
                items: 2
            }
        }
    });

    $( '.owl-col-4' ).owlCarousel({
        autoplay: false,
        autoplayTimeout: 8000,
        loop: false,
        margin: 30,
        nav: false,
        dots: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
    
            },
            992: {
                items: 4
            }
        }
    });

    $( '.basic-carousel' ).owlCarousel({
        items: 1,
        nav: true,
        navText: ['', ''],
        dots: true,
        autoHeight: false,
        loop: true,
        margin: 0
    });

    $( '.product-carousel' ).owlCarousel({
        autoplay: false,
        autoplayTimeout: 8000,
        loop: false,
        margin: 30,
        nav: false,
        dots: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
    
            },
            992: {
                items: 4
            }
        }
    });

    /*-----------------------------------------------------------------------------------*/
    /*  LAZY LOAD GOOGLE MAPS
    /*-----------------------------------------------------------------------------------*/
    (function($, window, document, undefined) {
        var $window = $(window),
            mapInstances = [],
            $pluginInstance = $('.google-map').lazyLoadGoogleMaps({
                callback: function(container, map) {
                    var $container = $(container),
                        center = new google.maps.LatLng($container.attr('data-lat'), $container.attr('data-lng'));
    
                    map.setOptions({
                        center: center,
                        zoom: 15,
                        zoomControl: true,
                        zoomControlOptions: {
                            style: google.maps.ZoomControlStyle.DEFAULT,
                        },
                        disableDoubleClickZoom: false,
                        mapTypeControl: true,
                        mapTypeControlOptions: {
                            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                        },
                        scaleControl: true,
                        scrollwheel: false,
                        streetViewControl: true,
                        draggable: true,
                        overviewMapControl: false,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        styles: [{
                            stylers: [{
                                saturation: -100
                            }, {
                                gamma: 1
                            }]
                        }, {
                            elementType: "labels.text.stroke",
                            stylers: [{
                                visibility: "off"
                            }]
                        }, {
                            featureType: "poi.business",
                            elementType: "labels.text",
                            stylers: [{
                                visibility: "off"
                            }]
                        }, {
                            featureType: "poi.business",
                            elementType: "labels.icon",
                            stylers: [{
                                visibility: "off"
                            }]
                        }, {
                            featureType: "poi.place_of_worship",
                            elementType: "labels.text",
                            stylers: [{
                                visibility: "off"
                            }]
                        }, {
                            featureType: "poi.place_of_worship",
                            elementType: "labels.icon",
                            stylers: [{
                                visibility: "off"
                            }]
                        }, {
                            featureType: "road",
                            elementType: "geometry",
                            stylers: [{
                                visibility: "simplified"
                            }]
                        }, {
                            featureType: "water",
                            stylers: [{
                                visibility: "on"
                            }, {
                                saturation: 50
                            }, {
                                gamma: 0
                            }, {
                                hue: "#50a5d1"
                            }]
                        }, {
                            featureType: "administrative.neighborhood",
                            elementType: "labels.text.fill",
                            stylers: [{
                                color: "#333333"
                            }]
                        }, {
                            featureType: "road.local",
                            elementType: "labels.text",
                            stylers: [{
                                weight: 0.5
                            }, {
                                color: "#333333"
                            }]
                        }, {
                            featureType: "transit.station",
                            elementType: "labels.icon",
                            stylers: [{
                                gamma: 1
                            }, {
                                saturation: 50
                            }]
                        }]
                    });
                    new google.maps.Marker({
                        position: center,
                        map: map
                    });
    
                    $.data(map, 'center', center);
                    mapInstances.push(map);
    
                    var updateCenter = function() {
                        $.data(map, 'center', map.getCenter());
                    };
                    google.maps.event.addListener(map, 'dragend', updateCenter);
                    google.maps.event.addListener(map, 'zoom_changed', updateCenter);
                    google.maps.event.addListenerOnce(map, 'idle', function() {
                        $container.addClass('is-loaded');
                    });
                }
            });
    
        $window.on('resize', $pluginInstance.debounce(1000, function() {
            $.each(mapInstances, function() {
                this.setCenter($.data(this, 'center'));
            });
        }));
    
    })(jQuery, window, document);

    /*-----------------------------------------------------------------------------------*/
    /*  ISOTOPE PORTFOLIO GRID
    /*-----------------------------------------------------------------------------------*/
    var $grid = $('.portfolio .grid').isotope();

    // filter functions
    var filterFns = {
        // show if number is greater than 50
        numberGreaterThan50: function() {
            var number = $(this).find('.number').text();
            return parseInt( number, 10 ) > 50;
        },
        // show if name ends with -ium
        ium: function() {
            var name = $(this).find('.name').text();
            return name.match( /ium$/ );
        }
    };

    // bind filter button click
    $('.portfolio .filters-button-group').on( 'click', 'a', function() {
        var filterValue = $( this ).attr('data-filter');
        // use filterFn if matches value
        filterValue = filterFns[ filterValue ] || filterValue;
        $grid.isotope({ filter: filterValue });
    });

    // change is-checked class on buttons
    $('.portfolio .button-group').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', 'a', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $( this ).addClass('is-checked');
        });
    });

    /*-----------------------------------------------------------------------------------*/
    /*  PROGRESS BAR
    /*-----------------------------------------------------------------------------------*/
    
    $(".progress-bar").each(function(i){

        var progressDelay = 500;

        $(this).appear(function () {
            $(this).delay( progressDelay * i ).animate( { width: $(this).attr('aria-valuenow') + '%' }, progressDelay );
        });

        $(this).prop('Counter',0).animate({
            Counter: $(this).text()
        }, {
            duration: progressDelay,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now)+'%');
            }
        });

    });

    /*-----------------------------------------------------------------------------------*/
    /*  WOW ANIMATION
    /*-----------------------------------------------------------------------------------*/
    new WOW().init();

    /*-----------------------------------------------------------------------------------*/
    /*  LIGHTGALLERY
    /*-----------------------------------------------------------------------------------*/
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

    /*-----------------------------------------------------------------------------------*/
    /*  COUNTER
    /*-----------------------------------------------------------------------------------*/
    
    $( ".counter" ).appear(function () {
        $(this).children('span').countTo();
    });

    /*-----------------------------------------------------------------------------------*/
    /*  CHECKBOX COLLAPSE
    /*-----------------------------------------------------------------------------------*/

    $( '.checkbox-collapse .custom-checkbox' ).on('click', function(e){
   
        if($(this).find( 'input[type=checkbox]' ).prop('checked')){
           $(this).parent().find( '.collapse' ).collapse('show');
        }else{     
           $(this).parent().find( '.collapse' ).collapse('hide');
        }
        
        e.stopPropagation();
    })


});


